import { createConnection } from 'mysql2';
import formidable from 'formidable-serverless'
import xlsx from 'xlsx';

export default function handler(req, res) {
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else if (req.method === 'POST')  {
        const { actionType } = req.body;
        if (actionType === 'upload') {
            handleUploadRequest(req, res);
        } else {
            handlePostRequest(req, res);
        }
    } else if (req.method === 'DELETE') {
        handleDeleteRequest(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function handleGetRequest(req, res) {
    try {
        const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
        connection.connect((err) => {
            if (err) {
                res.status(500).json({ error: 'Failed to connect to database' });
                return;
            }
        });
        const query = 'SELECT * FROM `contacts`';
        connection.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Failed to get data from database' });
                return;
            }
            res.status(200).json({ data: results });
        });
        connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleDeleteRequest(req, res) {
    try {
        const c_id = req.query?.c_id;
        if (c_id) {
            const connection = createConnection({ host: process.env.RDS_HOSTNAME, user: process.env.RDS_USERNAME, password: process.env.RDS_PASSWORD, database: process.env.RDS_DATABASE });
            connection.connect((err) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to connect to database' });
                    return;
                }
            });
            const query = `DELETE FROM contacts WHERE id = ${c_id}`;
            connection.query(query, (err, results) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to get data from database' });
                    return;
                }
                res.status(200).json({ data: results });
            });
            connection.end();
        } else {
            res.status(500).json({ error: 'Contact not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
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

async function handleUploadRequest(req, res) {
    try {
        const form = new formidable();
        form.parse(req, (err, fields, files) => {
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
                const connection = createConnection({
                    host: process.env.RDS_HOSTNAME,
                    user: process.env.RDS_USERNAME,
                    password: process.env.RDS_PASSWORD,
                    database: process.env.RDS_DATABASE,
                });
                connection.connect((err) => {
                    if (err) {
                        res.status(500).json({ error: 'Failed to connect to database' });
                        return;
                    }
                });
                let failed = 0;
                let totalrecords = 0;
                data.forEach((element, index) => {
                    console.log(element)
                    if (index > 0 && (element[0] !== undefined || element[1] !== undefined || element[2] !== undefined || element[3] !== undefined)) {
                        totalrecords++;
                        try {
                            const query = 'INSERT INTO Contacts (firstName, lastName, email, phoneNumber, organization_name) VALUES (?, ?, ?, ?, ?)';
                            connection.query(query, [element[0], element[1], element[2], element[3], element[4]], (err, results) => {
                                if (err) {
                                    failed++;
                                }
                            });
                        } catch (error) {
                            failed++;
                        }
                    }
                });
                connection.end();
                res.status(200).json({ data: totalrecords, message: `Out of ${totalrecords} Records ${totalrecords - failed} Records uploaded successfully` });
                return;
            } else {
                res.status(400).json({ error: 'Invalid File found in request' });
                return;
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
