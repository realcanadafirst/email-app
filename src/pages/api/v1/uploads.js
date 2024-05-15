import { createConnection } from 'mysql2';
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
                connection.connect((err) => {if (err) {res.status(500).json({ error: 'Failed to connect to database' });return;}});
                let failed = 0;
                let totalrecords = 0;
                data.forEach((element, index) => {
                    if (index > 0 && (element[0] !== undefined || element[1] !== undefined || element[2] !== undefined || element[3] !== undefined)) {
                        totalrecords++;
                        try {
                            const query = 'INSERT INTO Contacts (firstName, lastName, email, phoneNumber, organization_name) VALUES (?, ?, ?, ?, ?)';
                            connection.query(query, [element[0], element[1], element[2], element[3], element[4]], (err, results) => {
                                if (err) {
                                    failed++;
                                    if (err.code === 'ER_DUP_ENTRY' && err?.sqlMessage) {
                                        const query = 'INSERT INTO error_log (message) VALUES (?)';
                                        connection.query(query, [err.sqlMessage], (err, results) => {});
                                    }
                                }
                            });
                        } catch (error) {
                            failed++;
                        }
                    }
                });
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
