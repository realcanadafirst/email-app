import { createConnection } from '@ft/lib/dbconnection';
export async function validateToken({ user_hash, access_token }) {
    try {
        const connection = await createConnection();
        connection.connect((err) => { if (err) { res.status(500).json({ error: 'Failed to connect to database' }); return; } });
        try {
            if (user_hash && access_token) {
                const query = `SELECT * FROM login_attempts WHERE user_hash = ${user_hash} AND access_token = ${access_token}`;
                console.log(query)
                const [results] = await connection.execute(query);
                if (results && results.length) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            return false;
        } finally {
            await connection.end();
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}