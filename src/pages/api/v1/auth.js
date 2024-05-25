import { createConnection } from '@ft/lib/dbconnection';

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
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const { email, password } = req.body;
            if(email && password){
                let query = `SELECT * FROM users WHERE email = ${email} AND password = ${password}`
                const [results] = await connection.execute(query);
                res.status(200).json({ data: results });
            } else {
                res.status(401).json({ error: 'Please provide valid credentials' });
            }
        } catch (error) {
            console.log('error')
            console.log(error)
            res.status(500).json({ error: 'Failed to get data from database.' });
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
            const { email, password } = req.body;
            if(email && password){
                let query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
                const [results] = await connection.execute(query);
                if(results && results.length){
                    res.status(200).json({ data: results[0] });
                } else {
                    res.status(401).json({ error: 'Please provide valid credentials' });
                }
            } else {
                res.status(401).json({ error: 'Please provide valid credentials' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data from database.' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}