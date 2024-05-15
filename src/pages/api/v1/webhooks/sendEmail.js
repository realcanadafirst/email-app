const mysql = require('mysql2/promise');
const nodemailer = require("nodemailer");

export default function handler(req, res) {
    if (req.method === 'POST') {
        if (req.query?.test) {
            sendTestEmail(req, res);
        } else {
            handlePostRequest(req, res);
        }
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

async function sendTestEmail(req, res) {
    try {
        const { subject, template } = req.body;
        let html = template;
        html = html.replace('{message}', req.body.message)
        const mailOptions = {
            from: 'manish.mailbox94@gmail.com',
            to: 'devops.mailbox1@gmail.com',
            subject: subject,
            html: html
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(200).json({ message: "Failed to send email" });
            } else {
                res.status(200).json({ name: "Email sent successfully!" });
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handlePostRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const [appData] = await connection.execute(`SELECT * FROM settings WHERE attribute IN ('host', 'port', 'email', 'stmp_pass')`);
            const [emailData] = await connection.execute('SELECT * FROM emails WHERE');
            const smtpData = {secure: false, auth:{}};
            appData.map((val)=>{
                if(val.attribute === 'host'){
                    smtpData.host = val.value
                } else if(val.attribute === 'port'){
                    smtpData.port = val.value
                } else if(val.attribute === 'email'){
                    smtpData.auth.user = val.value
                } if(val.attribute === 'stmp_pass'){
                    smtpData.auth.pass = val.value
                }
            })
            const transporter = nodemailer.createTransport(smtpData);
            res.status(500).json({ error: 'Failed to get data' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data BB' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
