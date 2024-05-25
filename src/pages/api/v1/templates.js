import { createConnection } from '@ft/lib/dbconnection';
export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else if (req.method === 'DELETE') {
        handleDeleteRequest(req, res);
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
            const user_hash = req.headers['user_hash'];
            let query = `SELECT * FROM templates WHERE user_hash = '${user_hash}'`;
            const t_id = req.query?.t_id;
            if (t_id) {
                query = query + ` AND id = ${t_id}`;
            }
            query = query + ` order by id DESC LIMIT 50`;
            const [results] = await connection.execute(query);
            res.status(200).json({ data: results });
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

async function handlePostRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const { id, subject, template } = req.body;
            const user_hash = req.headers['user_hash'];
            let query = 'INSERT INTO templates (user_hash, subject, template) VALUES (?, ?, ?)';
            let values = [user_hash, subject, template];
            if (id) {
                query = `UPDATE templates SET subject = ?, template = ? WHERE id = ?`;
                values = [subject, template, id];
            }
            const [results] = await connection.execute(query, values);
            res.status(200).json({ data: results });
            return;
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data from database.' });
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
                const query = `DELETE FROM templates WHERE id = ${c_id}`;
                const [results] = await connection.execute(query);
                res.status(200).json({ data: results });
                return;
            } catch (error) {
                res.status(500).json({ error: 'Failed to get data from database.' });
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

