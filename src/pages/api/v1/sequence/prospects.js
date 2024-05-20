const mysql = require('mysql2/promise');

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

const createConnection = async () => {
    return mysql.createConnection({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
};

async function handleGetRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const c_id = req.query?.s_id ? req.query?.s_id : null;
            const [prospects] = await connection.execute('SELECT * FROM `contacts`');
            const [assigned_prospects] = await connection.execute(`SELECT * FROM sequence_prospects WHERE sequence_id = ${c_id}`);
            const data = {
                'prospects': [],
                'assigned_prospects': []
            }
            if (prospects) {
                data.prospects = prospects;
            }
            if (assigned_prospects) {
                data.assigned_prospects = assigned_prospects;
            }
            res.status(200).json({ data: data });
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
            const c_id = req.query?.s_id ? req.query?.s_id : null;
            const { prospects } = req.body;
            const query = 'INSERT INTO sequence_prospects (sequence_id, prospects, sequence_status) VALUES ?';
            const data = [];
            for (let i = 0; i < prospects.length; i++) {
                const datat = [];
                datat.push(c_id);
                datat.push(JSON.stringify(prospects[i]));
                datat.push('0');
                data.push(datat);
            }
            try {
                const [results] = await connection.query(query, [data]);
                res.status(200).json({ data: results });
            } catch (error) {
                res.status(500).json({ error: 'Failed to insert data.' });
            } finally {
                await connection.end();
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to insert data.' });
            return;
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handlePutRequest(req, res) {
    try {
        const c_id = req.query?.c_id;
        const status = req.query?.status;
        if (c_id, status) {
            const connection = await createConnection();
            connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
            try {
                if (status == 3) {
                    const query = `DELETE FROM sequence_prospects WHERE id = ${c_id}`;
                    const [results] = await connection.execute(query);
                    res.status(200).json({ data: results });
                } else {
                    const query = `UPDATE sequence_prospects SET sequence_status = ? WHERE id = ?`;
                    const [results] = await connection.execute(query);
                    res.status(200).json({ data: results });
                }
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

async function handleDeleteRequest(req, res) {
    try {
        const c_id = req.query?.c_id;
        if (c_id) {
            const connection = await createConnection();
            connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
            const query = `DELETE FROM contacts WHERE id = ${c_id}`;
            try {
                const [results] = await connection.execute(query);
                res.status(200).json({ data: results });
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
