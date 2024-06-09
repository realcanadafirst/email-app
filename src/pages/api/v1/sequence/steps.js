import { createConnection } from '@ft/lib/dbconnection';
import { sendEMail } from '@ft/lib/send';
import { format } from 'date-fns';

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
                        res.status(500).json({ error: 'Failed to get data.' });
                    }
                }
            } else {
                const c_id = req.query?.s_id ? req.query?.s_id : null;
                const { step_number, stepType, intervalTime, taskPriority, taskNote, subject, template, status, execution_date } = req.body;
                try {
                    const updatedTime = format(execution_date, 'yyyy-MM-dd HH:mm:ss');
                    const query = 'INSERT INTO sequence_steps (sequence_id, step_number, step_type, interval_time, execution_date, priority, note, subject, template, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    const values = [c_id, step_number, stepType, intervalTime, updatedTime, taskPriority, taskNote, subject, template, status];
                    const [results] = await connection.execute(query, values);
                    res.status(200).json({ data: results });
                } catch (error) {
                    res.status(500).json({ error: error?.sqlMessage ? error.sqlMessage : 'Failed to set data.' });
                }
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to get data.' });
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
            const user_hash = req.headers['userhash'];
            const [appData] = await connection.execute(`SELECT * FROM settings WHERE user_hash = '${user_hash}'`);
            if (appData) {
                const appDataResult = appData[0];
                                
                const step = req.query?.step ? req.query?.step : null;
                const s_id = req.query?.s_id;
                const [sequences] = await connection.execute(`SELECT * FROM sequences WHERE id = ${s_id}`);
                const [steps] = await connection.execute(`SELECT * FROM sequence_steps WHERE id = ${step}`);
                if (steps && sequences) {
                    try {
                        const emailDataResult = {
                            mail_from: sequences[0]['from_email'],
                            subject:steps[0]['subject'],
                            template:steps[0]['template'],
                        };
                        const receiver_data = {
                            firstName: 'Test',
                            lastName: 'User',
                            phoneNumber: '123456789',
                            orgName: 'Org name',
                            email: sequences[0]['from_email']                            
                        }
                        await sendEMail({ appDataResult, emailDataResult, receiver_data});
                        res.status(200).json({ message: 'email sent.' });
                    } catch (error) {
                        res.status(500).json({ error: 'Failed to send email' });
                    }
                }
                res.status(200).json({ message: 'email sent.' });
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
