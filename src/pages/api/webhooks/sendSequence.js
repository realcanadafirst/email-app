const nodemailer = require("nodemailer");
import { createConnection } from 'mysql2';
const { promisify } = require('util');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "devops.mailbox1@gmail.com",
        pass: "imam spxl asji nahe",
    },
});

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
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => {
            if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; }
        });
        const { subject, template } = req.body;
        const query = `UPDATE sequence_steps SET subject = ?, template = ? WHERE id = ?`;
        connection.query(query, [subject, template, step], (err, results) => {
            if (err) { res.status(500).json({ error: 'Failed to insert data' }); return; }
            res.status(200).json({ data: results });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
