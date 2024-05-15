const mysql = require('mysql2/promise');
export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else if (req.method === 'DELETE') {
        handleDeleteRequest(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
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

async function handleGetRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            let query = `SELECT * FROM emails LEFT JOIN email_prospects ON emails.id = email_prospects.email_id`;
            const e_id = req.query?.e_id;
            if (e_id) {
                query = query + `WHERE id = ${e_id}`;
            }
            const [results] = await connection.execute(query);
            const emails = [];
            const prospects = {};
            results.forEach(row => {
                if (!prospects[row.email_id]) {
                    prospects[row.email_id] = {
                        id: row.email_id,
                        subject: row.subject,
                        mail_from: row.mail_from,
                        template: row.template,
                        updated_at: row.updated_at,
                        created_at: row.created_at,
                        prospects: []
                    };
                    emails.push(prospects[row.id]);
                }
                if (row.email_id) {
                    prospects[row.email_id].prospects.push({
                        id: row.email_id,
                        clicked: row.clicked,
                        opened: row.opened,
                        receiver_data: row.receiver_data,
                        contacted: row.contacted,
                        replied: row.replied,
                        updated_at: row.updated_at
                    });
                }
            });
            res.status(200).json({ data: emails, results: results });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data BB' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handlePostRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const { id, mail_from, receivers, subject, template } = req.body;
            let query = 'INSERT INTO emails (mail_from, subject, template) VALUES (?, ?, ?)';
            const values = [mail_from, subject, template];
            if (id) {
                query = `UPDATE emails SET mail_from = ?, subject = ?, template = ? WHERE id = ?`;
                values.push(id);
            }
            const [emailData] = await connection.execute(query, values);
            if (emailData && emailData?.insertId) {
                const receiversTmp = JSON.parse(receivers);
                for (let i = 0; i < receiversTmp.length; i++) {
                    let query1 = 'INSERT INTO email_prospects (email_id, receiver_data) VALUES (?, ?)';
                    const data = [];
                    data.push(emailData?.insertId);
                    data.push(JSON.stringify(receiversTmp[i]));
                    await connection.execute(query1, data);
                }
                res.status(200).json({ data: 'email saved' });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to get data' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleDeleteRequest(req, res) {
    try {
        const c_id = req.query?.c_id;
        if (c_id) {
            const connection = await createConnection();
            connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
            try {
                const query = `DELETE FROM templates WHERE id = ${c_id}`;
                const [results] = await connection.execute(query);
                res.status(200).json({ data: results });
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: 'Failed to get data BB' });
            } finally {
                await connection.end();
            }
        } else {
            res.status(500).json({ error: 'Template not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
