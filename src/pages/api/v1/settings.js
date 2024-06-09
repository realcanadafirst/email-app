import { createConnection } from '@ft/lib/dbconnection';

export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else {
        res.setHeader('Allow', ['GET, POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
async function handleGetRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const user_hash = req.headers['userhash'];
            const [results] = await connection.execute(`SELECT * FROM settings WHERE user_hash = '${user_hash}'`);
            res.status(200).json({ data: results });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data from database.' });
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
            const { email, smtp_host, smtp_port, smtp_password, sender_name, sender_company } = req.body;
            const user_hash = req.headers['userhash'];
            const query = 'UPDATE settings SET email = ?, smtp_host = ?, smtp_port = ?, smtp_password = ?, sender_name = ?, sender_company = ? WHERE user_hash = ?';
            const values = [email, smtp_host, smtp_port, smtp_password, sender_name, sender_company, user_hash]
            const [results] = await connection.execute(query, values);
            res.status(200).json({ data: results });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data from database.' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}