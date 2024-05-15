import { createConnection } from 'mysql2';

export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        const { actionType } = req.body;
        console.log(actionType)
        if (actionType === 'test') {
            handleTestRequest(req, res);
        } else {
            handleTestRequest(req, res);
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
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => {
            if (err) {
                res.status(500).json({ error: 'Failed to connect to database' });
                return;
            }
        });
        const query = 'SELECT * FROM `contacts`';
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

async function handleDeleteRequest(req, res) {
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
            const query = `DELETE FROM contacts WHERE id = ${c_id}`;
            connection.query(query, (err, results) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to get data from database' });
                    return;
                }
                res.status(200).json({ data: results });
            });
            connection.end();
        } else {
            res.status(500).json({ error: 'Contact not found!' });
        }
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
        const { firstName, lastName, email, phoneNumber, organization_name } = req.body;
        const query = 'INSERT INTO Contacts (firstName, lastName, email, phoneNumber, organization_name) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [firstName, lastName, email, phoneNumber, organization_name], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY' && err?.sqlMessage) {
                    res.status(500).json({ error: err.sqlMessage });
                } else {
                    res.status(500).json({ error: 'Failed to insert data' });
                }
                return;
            }
            res.status(200).json({ data: results });
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleTestRequest(req, res) {
    try {
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => {
            if (err) {res.status(500).json({ error: 'Failed to connect to database' });return;}
        });
        let query = 'INSERT INTO Contacts (firstName, lastName, email, phoneNumber, organization_name) VALUES ?';
        const data = [];
        for(let i = 100; i < 300; i++){
            const datat = [];
            datat.push('email-app');
            datat.push('test-'+i);
            datat.push('email-app-test-'+i+'@yopmail.com');
            datat.push('891066002'+i);
            datat.push('email-app-org-'+i);
            data.push(datat);
        }
        connection.query(query, [data], (err, results) => {
            if (err) {
                console.log(err)
                if (err.code === 'ER_DUP_ENTRY' && err?.sqlMessage) {
                    res.status(500).json({ error: err.sqlMessage });
                } else {
                    res.status(500).json({ error: 'Failed to insert datahh' });
                }
                return;
            }
            res.status(200).json({ data: results });
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
