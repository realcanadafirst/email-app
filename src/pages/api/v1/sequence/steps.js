import { createConnection } from '@ft/lib/dbconnection';
import { sendEMail } from '@ft/lib/send';

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
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            const [appData] = await connection.execute(`SELECT * FROM settings WHERE attribute IN ('host', 'port', 'email', 'stmp_pass', 'senderName')`);
            if (appData) {
                const smtpData = { secure: false, auth: {} };
                let senderName = '';
                appData.map((val) => {
                    if (val.attribute === 'host') {
                        smtpData.host = val.value
                    } else if (val.attribute === 'port') {
                        smtpData.port = val.value
                    } else if (val.attribute === 'email') {
                        smtpData.auth.user = val.value
                    } else if (val.attribute === 'stmp_pass') {
                        smtpData.auth.pass = val.value
                    } else if (val.attribute === 'senderName') {
                        senderName = val.value
                    }
                });
                const step = req.query?.step ? req.query?.step : null;
                const s_id = req.query?.s_id;
                const [sequences] = await connection.execute(`SELECT * FROM sequences WHERE id = ${s_id}`);
                const [steps] = await connection.execute(`SELECT * FROM sequence_steps WHERE id = ${step}`);
                if (steps && sequences) {
                    try {
                        await sendEMail({ smtpData, emailData: steps[0], senderName, mail_from: sequences[0]['from_email'], receiver_data: sequences[0]['from_email'] });
                        res.status(200).json({ message: 'email sent.' });
                    } catch (error) {
                        res.status(500).json({ error: 'Failed to send email' });
                    }
                }
            } else {
                res.status(500).json({ error: 'Failed to get settings data' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to send email' });
        } finally {
            await connection.end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
}
