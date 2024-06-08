import { createConnection } from '@ft/lib/dbconnection';

export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handleGetRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const user_hash = req.headers['userhash'];
            const c_id = req.query?.c_id;
            if (c_id) {
                let query = `SELECT * FROM campaigns WHERE user_hash = '${user_hash}' AND id = ${c_id}`;
                const [campaign] = await connection.execute(query);
                const [prospects] = await connection.execute(`SELECT * FROM contacts WHERE user_hash = '${user_hash}' order by id DESC`);
                res.status(200).json({ data: { prospects, campaign } });
                return;
            } else {
                let query = `SELECT * FROM campaigns WHERE user_hash = '${user_hash}' order by id DESC`;
                const [campaigns] = await connection.execute(query);
                res.status(200).json({ data: campaigns });
                return;
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data from database.' });
            return;
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
            const { campaigns_name, prospects, c_id } = req.body;
            const user_hash = req.headers['userhash'];
            let query = 'INSERT INTO campaigns (user_hash, campaign_name, receiver_data, created_at) VALUES (?, ?, ?, ?)';
            const values = [];
            if (c_id) {
                query = `UPDATE campaigns SET campaign_name = ?, receiver_data = ? WHERE id = ?`;
                values.push(campaigns_name);
                values.push(prospects);
                values.push(c_id);
            } else {
                values.push(user_hash);
                values.push(campaigns_name);
                values.push(prospects);
                values.push(new Date());
            }
            const [results] = await connection.query(query, values);
            res.status(200).json({ data: results });
        } catch (error) {
            res.status(500).json({ error: 'Failed to insert data in database.' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}