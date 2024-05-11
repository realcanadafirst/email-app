import { createConnection } from 'mysql2';
export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

function handleGetRequest(req, res) {
    res.status(200).json({ message: 'GET request received' });
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
                console.log(err)
                res.status(500).json({ error: 'Failed to insert data' });
                return;
            }
            res.status(200).json({ data: results });
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
