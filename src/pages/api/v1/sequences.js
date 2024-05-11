import { createConnection } from 'mysql2';
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
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => {
            if (err) {
                res.status(500).json({ error: 'Failed to connect to database' });
                return;
            }
        });
        let query = 'SELECT * FROM `sequences`';
        const c_id = req.query?.c_id;
        if (c_id) {
            query = query + `WHERE id = ${c_id}`;
        }
        connection.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Failed to get data from database' });
                return;
            }
            res.status(200).json({ data: results });
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handlePostRequest(req, res) {
    try {
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => {
            if (err) {
                res.status(500).json({ error: 'Failed to connect to database' });
                return;
            }
        });
        const { id, name, options, mailbox } = req.body;
        let query = 'INSERT INTO sequences (name, sequence_type, from_email) VALUES (?, ?, ?)';
        const values = [name, options, mailbox];
        if (id) {
            query = `UPDATE sequences SET name = ?, sequence_type = ?, from_email = ? WHERE id = ?`;
            values.push(id);
        }
        connection.query(query, values, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'Failed to insert/update data' });
                return;
            }
            res.status(200).json({ data: results });
        });
        connection.end();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function handleDeleteRequest(req, res) {
    try {
        const c_id = req.query?.c_id;
        if (c_id) {
            const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
            connection.connect((err) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to connect to database' });
                    return;
                }
            });
            const query = `DELETE FROM sequences WHERE id = ${c_id}`;
            connection.query(query, (err, results) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to get data from database' });
                    return;
                }
                res.status(200).json({ data: results });
            });
            connection.end();
        } else {
            res.status(500).json({ error: 'Template not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

