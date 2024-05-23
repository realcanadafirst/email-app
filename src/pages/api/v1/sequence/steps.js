const mysql = require('mysql2/promise');

export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST') {
        handlePostRequest(req, res);
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
            const query = `SELECT * FROM sequence_steps WHERE sequence_id = ${c_id}`;
            const [results] = await connection.execute(query);
            res.status(200).json({ data: results });
            return;
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data BB' });
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
            const step = req.query?.step ? req.query?.step : null;
            if (step) {
                if (req.query?.test) {
                    sendTestEmail(req, res);
                } else {
                    try {
                        const { subject, template } = req.body;
                        const query = `UPDATE sequence_steps SET subject = ?, template = ? WHERE id = ?`;
                        const [results] = await connection.execute(query, [subject, template, step]);
                        res.status(200).json({ data: results });
                    } catch (error) {
                        res.status(500).json({ error: 'Failed to get data BB' });
                    }
                }
            } else {
                const c_id = req.query?.s_id ? req.query?.s_id : null;
                const { stepType, intervalTime, taskPriority, taskNote, subject, template, status, execution_date } = req.body;
                try {
                    const query = 'INSERT INTO sequence_steps (sequence_id, step_type, interval_time, execution_date, priority, note, subject, template, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    const values = [c_id, stepType, intervalTime, execution_date, taskPriority, taskNote, subject, template, status];
                    const [results] = await connection.execute(query, values);
                    res.status(200).json({ data: results });
                } catch (error) {
                    res.status(500).json({ error: 'Failed to get data BB' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data BB' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function sendTestEmail(req, res) {

}
