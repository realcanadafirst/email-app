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
            const [prospects] = await connection.execute('SELECT * FROM `subscriptions_plan` order by id DESC LIMIT 100');
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
            res.status(500).json({ error: 'Subscriptions plan not found!' });
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
            const { firstName, lastName, email, phoneNumber, organization_name } = req.body;
            const query = 'INSERT INTO contacts (firstName, lastName, email, phoneNumber, organization_name, status) VALUES (?, ?, ?, ?, ?, ?)';
            const [results] = await connection.execute(query, [firstName, lastName, email, phoneNumber, organization_name, '1']);
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
