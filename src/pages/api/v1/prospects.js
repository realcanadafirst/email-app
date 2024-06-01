import { createConnection } from '@ft/lib/dbconnection';

export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        const { actionType } = req.body;
        if (actionType === 'test') {
            handleTestRequest(req, res);
        } else {
            handlePostRequest(req, res);
        }
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
            const user_hash = req.headers['userhash'];
            const query = `SELECT * FROM contacts WHERE user_hash = '${user_hash}' order by id DESC LIMIT 25`;
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
                const [results] = await connection.execute(`DELETE FROM contacts WHERE id = ${c_id}`);
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
            const { firstName, lastName, email, phoneNumber, organization_name } = req.body;
            const user_hash = req.headers['userhash'];
            const query = 'INSERT INTO contacts (user_hash, firstName, lastName, email, phoneNumber, organization_name) VALUES (?, ?, ?, ?, ?, ?)';
            const [results] = await connection.execute(query, [user_hash, firstName, lastName, email, phoneNumber, organization_name]);
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

async function handleTestRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        const user_hash = req.headers['userhash'];
        let query = `INSERT INTO Contacts (user_hash, firstName, lastName, email, phoneNumber, organization_name) VALUES (?, ?, ?, ?, ?, ?)`;
        try {
            for (let i = 1; i < 300; i++) {
                const datat = [];
                datat.push(`${user_hash}`);
                datat.push('email-app');
                datat.push('test-' + i);
                datat.push('email-app-test-' + i + '@yopmail.com');
                datat.push('891066002' + i);
                datat.push('email-app-org-' + i);
                try {
                    await connection.query(query, datat);
                } catch (error) {
                }
                res.status(200).json({ data: 'data inserted' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to insert data in database.' });
            return;
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}