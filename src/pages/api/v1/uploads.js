import { createConnection } from '@ft/lib/dbconnection';
import formidable from 'formidable-serverless'
import xlsx from 'xlsx';
export const config = {
    api: {
        bodyParser: false,
    },
};
export default function handler(req, res) {
    if (req.method === 'POST') {
        handlePostRequest(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handlePostRequest(req, res) {
    try {
        const form = new formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).json({ error: 'Error parsing form data' });
                return;
            }
            if (!files || !files.file || !files.file.path) {
                res.status(400).json({ error: 'File not found in request' });
                return;
            } else if (files.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || files.file.type === 'application/vnd.ms-excel') {
                const uploadedFile = files.file;
                const workbook = xlsx.readFile(uploadedFile.path);
                const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = xlsx.utils.sheet_to_json(first_worksheet, { header: 1 });
                const connection = await createConnection();
                connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
                let failed = 0;
                let totalrecords = 0;
                try {
                    const user_hash = req.headers['userhash'];
                    console.log(data.length)
                    for (let index = 1; index < data.length; index++) {
                        const element = data[index];
                        const values = [];
                        values.push(user_hash);
                        if (element[0] && element[0] !== undefined && element[0] !== null && element[2] && element[2] !== undefined && element[2] !== null) {
                            values.push(element[0]);
                            if (element[1] && element[1] !== undefined && element[1] !== null) {
                                values.push(element[1]);
                            } else {
                                values.push('');
                            }
                            values.push(element[2]);
                            if (element[3] && element[3] !== undefined && element[3] !== null) {
                                values.push(element[3]);
                            } else {
                                values.push('');
                            }
                            if (element[4] && element[4] !== undefined && element[4] !== null) {
                                values.push(element[4]);
                            } else {
                                values.push('');
                            }
                            console.log(values)
                            totalrecords++;
                            try {
                                const query = 'INSERT INTO contacts (user_hash, firstName, lastName, email, phoneNumber, organization_name) VALUES (?, ?, ?, ?, ?, ?)';
                                await connection.execute(query, values);
                            } catch (error) {
                                const query = 'INSERT INTO error_log (message) VALUES (?)';
                                await connection.execute(query, [error.sqlMessage]);
                                failed++;
                            }
                        } else if(data.length > (totalrecords + 5)){
                            break;
                        }
                    }
                    res.status(200).json({ data: totalrecords, message: `Out of ${totalrecords} Records ${totalrecords - failed} Records uploaded successfully` });
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ error: 'Failed to insert data in database.' });
                } finally {
                    await connection.end();
                }
            } else {
                res.status(400).json({ error: 'Invalid File found in request' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
