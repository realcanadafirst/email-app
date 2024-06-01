import { createConnection } from '@ft/lib/dbconnection';

export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handleGetRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const access_token = req.headers['accesstoken'];
            const user_hash = req.headers['userhash'];
            if (access_token && user_hash) {
                const query = `SELECT * FROM login_attempts WHERE user_hash = '${user_hash}' AND access_token = '${access_token}'`;
                const [results] = await connection.execute(query);
                if (results && results.length) {
                    res.status(200).json({ data: results });
                } else {
                    res.status(401).json({ error: 'Please provide valid credentials' });
                }
            } else {
                res.status(401).json({ error: 'Please provide valid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data from database.' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}