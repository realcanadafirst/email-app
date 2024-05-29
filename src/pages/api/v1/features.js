import { createConnection } from '@ft/lib/dbconnection';

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

async function handleGetRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            let query = `SELECT * FROM subscriptions_plan`;
            const s_id = req.query?.s_id;
            if (s_id) {
                query = query + ` WHERE id = ${s_id}`;
            }
            query = query + ` order by id DESC LIMIT 50`;
            const [prospects] = await connection.execute(query);
            res.status(200).json({ data: prospects });
            return;
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

async function handleDeleteRequest(req, res) {
    try {
        const c_id = req.query?.c_id;
        if (c_id) {
            const connection = await createConnection();
            connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
            try {
                const [results] = await connection.execute(`DELETE FROM subscriptions_plan WHERE id = ${c_id}`);
                res.status(200).json({ data: results });
                return;
            } catch (error) {
                res.status(500).json({ error: 'Failed to get data from database.' });
                return;
            } finally {
                await connection.end();
            }
        } else {
            res.status(500).json({ error: 'Contact not found!' });
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
            const { name, b1_value, b2_value, b3_value, status } = req.body;
            let query = 'INSERT INTO subscriptions_plan (name, b1_value, b2_value, b3_value, status) VALUES (?, ?, ?, ?, ?)';
            let values = [name, b1_value, b2_value, b3_value, status];
            const s_id = req.query?.s_id;
            if (s_id) {
                query = 'UPDATE subscriptions_plan SET name = ?, b1_value = ?, b2_value = ?, b3_value = ?, status = ? WHERE id = ?';
                values.push(s_id);
            }
            const [results] = await connection.execute(query, values);
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