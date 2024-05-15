import { createConnection } from 'mysql2';
export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else {
        res.setHeader('Allow', ['GET, POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
async function handleGetRequest(req, res) {
    try {
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => {
            if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; }
        });
        let query = 'SELECT * FROM `settings`';
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
            if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; }
        });

        const body = req.body;
        let query = 'UPDATE settings SET value = CASE attribute ';
        body.forEach(update => {
            query += `WHEN '${update.attribute}' THEN '${update.value}' `;
        });
        query += 'END WHERE attribute IN (';
        query += body.map(update => `'${update.attribute}'`).join(', ');
        query += ')';

        connection.query(query, (err, results) => {
            console.log(err)
            if (err) { res.status(500).json({ error: 'Failed to insert data' }); return; }
            res.status(200).json({ data: results });
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}