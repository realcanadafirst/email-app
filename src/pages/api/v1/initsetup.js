import { createConnection } from '@ft/lib/dbconnection';

export default function handler(req, res) {
    if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handlePostRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const user_hash = req.headers['userhash'];
            const query = `SELECT * FROM users WHERE user_hash = '${user_hash}'`;            
            const [results] = await connection.query(query);
            if(results){
                // const [results_t] = await connection.query(`SELECT * FROM templates WHERE type = 'default'`);

                res.status(200).json({ data: results });
            } else {
                res.status(403).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to insert data in database.' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}