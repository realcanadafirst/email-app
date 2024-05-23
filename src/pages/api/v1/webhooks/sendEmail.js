const mysql = require('mysql2/promise');

export default function handler(req, res) {
    if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const createConnection = async () => {
    return mysql.createConnection({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
};

async function handlePostRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const [emailData] = await connection.execute(`SELECT * FROM emails WHERE created_at < NOW() AND email_sent != '1' LIMIT 1`);
            if (emailData && emailData.length) {
                const [appData] = await connection.execute(`SELECT * FROM settings WHERE attribute IN ('host', 'port', 'email', 'stmp_pass', 'senderName')`);
                if (appData) {
                    const smtpData = { secure: false, auth: {} };
                    let senderName = '';
                    appData.map((val) => {
                        if (val.attribute === 'host') {
                            smtpData.host = val.value
                        } else if (val.attribute === 'port') {
                            smtpData.port = val.value
                        } else if (val.attribute === 'email') {
                            smtpData.auth.user = val.value
                        } else if (val.attribute === 'stmp_pass') {
                            smtpData.auth.pass = val.value
                        } else if (val.attribute === 'senderName') {
                            senderName = val.value
                        }
                    });
                    const [prospects] = await connection.execute(`SELECT * FROM email_prospects WHERE email_id = ${emailData[0]['id']} AND email_sent = '2'`);
                    if (prospects) {
                        for (let i = 0; i < prospects.length; i++) {
                            try {
                                await sendEMail(smtpData, emailData[0], prospects[i], senderName);
                                let upquery = `UPDATE email_prospects SET message = ?, email_sent = ? WHERE id = ?`;
                                await connection.execute(upquery, ['Email sent successfully', '1', prospects[i]['id']]);
                            } catch (error) {
                                await connection.execute(upquery, ['Failed to send email', '0', prospects[i]['id']]);
                            }
                        }
                        if(prospects.length < 10){
                            let upquery = `UPDATE emails SET email_sent = ? WHERE id = ?`;
                            await connection.execute(upquery, ['1', emailData[0]['id']]);
                        }
                    }
                    res.status(200).json({ message: 'email sent.' });
                }
                res.status(200).json({ error: 'Failed to get settings data' });
            } else {
                res.status(200).json({ error: 'Failed to get data' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
