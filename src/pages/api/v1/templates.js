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
            let query = 'SELECT * FROM `templates` order by id DESC LIMIT 50';
            const t_id = req.query?.t_id;
            if (t_id) {
                query = query + `WHERE id = ${t_id}`;
            }
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
            let query = 'INSERT INTO templates (subject, template) VALUES (?, ?)';
            const values = [subject, template];
            if (id) {
                query = `UPDATE templates SET subject = ?, template = ? WHERE id = ?`;
                values.push(id);
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

