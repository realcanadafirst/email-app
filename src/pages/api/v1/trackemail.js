const mysql = require('mysql2/promise');
export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'OPTIONS') {
        res.status(200).send('ok');
    } else {
        res.setHeader('Allow', ['GET', 'OPTIONS']);
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
            const trackquery = `UPDATE email_prospects SET opened = ? WHERE id = ?`;
            const state = req.query?.state;
            const [results] = await connection.execute(trackquery, ['1', state]);
            res.status(200).send('no-image');
        } catch (error) {
            res.status(200).send('no-image');
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(200).send('no-image');
    }
}