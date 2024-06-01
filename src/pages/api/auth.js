import { createConnection } from '@ft/lib/dbconnection';
const { createHash } = require('crypto');

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
async function handlePostRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const { email, password } = req.body;
            if (email && password) {
                const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
                const [results] = await connection.execute(query);
                if (results && results.length) {
                    const userdata = results[0];
                    var current_date = (new Date()).valueOf().toString();
                    const token = createHash('sha256').update(userdata['user_hash'] + current_date).digest('hex').substring(0, 20);
                    const query = 'INSERT INTO login_attempts (user_hash, access_token, refresh_token) VALUES (?, ?, ?)';
                    const values = [userdata['user_hash'], token, token];
                    const [emailData] = await connection.execute(query, values);
                    if (emailData) {
                        res.setHeader('userhash', userdata['user_hash'],);
                        res.setHeader('accesstoken', token);
                        res.status(200).json({ data: { user_hash: userdata['user_hash'], name: userdata['name'], email: userdata['email'], type: userdata['type'] } });
                    }
                    res.status(500).json({ error: 'Something went wrong, Please try again.' });
                } else {
                    res.status(403).json({ error: 'Please provide valid credentials.' });
                }
            } else {
                res.status(403).json({ error: 'Please provide valid credentials.' });
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

async function handleGetRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const { email, password } = req.body;
            if (email && password) {
                let query = `SELECT * FROM users WHERE email = ${email} AND password = ${password}`
                const [results] = await connection.execute(query);
                console.log(query)
                res.status(200).json({ data: results });
            } else {
                res.status(403).json({ error: 'Please provide valid credentials.' });
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

