import { createConnection } from 'mysql2';
const { promisify } = require('util');

export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else if (req.method === 'PUT') {
        handlePutRequest(req, res);
    } else if (req.method === 'DELETE') {
        handleDeleteRequest(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handleGetRequest(req, res) {
    try {
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        const query = promisify(connection.query).bind(connection);
        try {
            const c_id = req.query?.s_id ? req.query?.s_id : null;
            const steps = await query(`SELECT * FROM sequence_steps WHERE sequence_id = ${c_id}`);
            res.status(200).json({ data: steps });
            return;
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to get data from database.' });
            return;
        }
        connection.end(); // Close the connection
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handlePostRequest(req, res) {
    try {
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => {
            if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; }
        });
        const step = req.query?.step ? req.query?.step : null;
        if (step) {
            const { template_name, template } = req.body;
            const query = `UPDATE sequence_steps SET template_name = ?, template = ? WHERE id = ?`;
            connection.query(query, [template_name, template, step], (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'Failed to insert data' });
                    return;
                }
                res.status(200).json({ data: results });
            });
        } else {
            const c_id = req.query?.s_id ? req.query?.s_id : null;
            const { stepType, intervalTime, taskPriority, taskNote, template_name, template, status } = req.body;
            let query = 'INSERT INTO sequence_steps (sequence_id, step_type, interval_time, priority, note, template_name, template, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(query, [c_id, stepType, intervalTime, taskPriority, taskNote, template_name, template, status], (err, results) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'Failed to insert data' });
                    return;
                }
                res.status(200).json({ data: results });
            });
        }
        connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handlePutRequest(req, res) {
    try {
        const c_id = req.query?.c_id;
        const status = req.query?.status;
        if (c_id, status) {
            const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
            connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
            if (status == 3) {
                const query = `DELETE FROM sequence_prospects WHERE id = ${c_id}`;
                console.log(query)
                connection.query(query, (err, results) => {
                    if (err) { res.status(500).json({ error: 'Failed to delete data from database' }); return; }
                    res.status(200).json({ data: results });
                });
                connection.end();
            } else {
                const query = `UPDATE sequence_prospects SET sequence_status = ? WHERE id = ?`;
                connection.query(query, [status, c_id], (err, results) => {
                    if (err) {
                        res.status(500).json({ error: 'Failed to get data from database' });
                        return;
                    }
                    res.status(200).json({ data: results });
                });
                connection.end();
            }
        } else {
            res.status(500).json({ error: 'Contact not found!' });
        }
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
