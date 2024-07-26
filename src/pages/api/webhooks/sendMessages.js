import { createConnection } from '@ft/lib/dbconnection';
import { format } from 'date-fns';
import {sendMessage} from '@ft/lib/sendmessage';
export default function handler(req, res) {
    if (req.method === 'POST') {
        handleMessageRequest(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}


async function handlePostRequest(req, res) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        const currentTime = new Date();
        const updatedTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
        const [sequenceSteps] = await connection.execute(`SELECT * FROM sequence_steps WHERE execution_date < '${updatedTime}' AND status != '1' LIMIT 1`);
        if (sequenceSteps && sequenceSteps.length) {
            const emailDataResult = sequenceSteps[0];
            const [sequenceData] = await connection.execute(`SELECT * FROM sequences WHERE id = '${emailDataResult['sequence_id']}'`);
            if(sequenceData){
                const sequenceDataResult = sequenceData[0];
                // `SELECT * FROM settings WHERE user_hash = '${sequenceDataResult['user_hash']}'`
                const [appData] = await connection.execute(`SELECT * FROM settings`);
                if (appData) {
                    const appDataResult = appData[0];
                    const [prospects] = await connection.execute(`SELECT * FROM sequence_prospects WHERE sequence_id = ${sequenceDataResult['id']}`);
                    console.log(prospects)
                    if (prospects) {
                        for (let i = 0; i < prospects.length; i++) {
                            try {
                                const receiver_data = JSON.parse(prospects[i]['receiver_data']);
                               // await sendEMail({ appDataResult, emailDataResult, receiver_data });
                                let upquery = `UPDATE email_prospects SET message = ?, email_sent = ? WHERE id = ?`;
                                // await connection.execute(upquery, ['Email sent successfully', '1', prospects[i]['id']]);
                            } catch (error) {
                                console.log(error)
                                let upquery = `UPDATE email_prospects SET message = ?, email_sent = ? WHERE id = ?`;
                                //await connection.execute(upquery, ['Failed to send email', '0', prospects[i]['id']]);
                            }
                        }
                        if (prospects.length < 10) {
                            let upquery = `UPDATE emails SET email_sent = ? WHERE id = ?`;
                            //await connection.execute(upquery, ['1', emailData[0]['id']]);
                        }
                    }
                    res.status(200).json({ message: 'email sent.' });
                }
                res.status(200).json({ error: 'Failed to get settings data' });
            } else {
                res.status(200).json({ error: 'Failed to get data.' });
            }
        } else {
            res.status(200).json({ error: 'Failed to get data..' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleMessageRequest(req, res) {
    const reshh = sendMessage({appDataResult:''});
    res.status(200).json({ error: 'Failed to get data..' });
}
