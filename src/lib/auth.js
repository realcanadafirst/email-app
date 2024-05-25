import { createConnection } from '@ft/lib/dbconnection';

export async function handleGetRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const { email, password } = req.body;
            if (email && password) {
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