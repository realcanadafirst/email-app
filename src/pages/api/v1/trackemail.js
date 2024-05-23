import { createConnection } from '@ft/lib/dbconnection';
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