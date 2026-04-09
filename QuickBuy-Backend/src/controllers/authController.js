const db = require('../config/db');

const buildUserPayload = (role, row) => {
    if (!row) {
        return null;
    }

    const isAdmin = role === 'admin';

    return {
        id: isAdmin ? row.AdminID : row.CustomerID,
        role,
        name: isAdmin
            ? `${row.FirstName} ${row.LastName}`
            : `${row.FirstName} ${row.LastName}`,
        email: row.Email,
    };
};

const loginWithRole = async (role, email, password) => {
    if (role === 'admin') {
        const [rows] = await db.query(
            `SELECT AdminID, FirstName, LastName, Email, EncryptedPassword
             FROM Admin
             WHERE LOWER(Email) = LOWER(?)
             LIMIT 1`,
            [email]
        );

        if (rows.length === 0 || rows[0].EncryptedPassword !== password) {
            return null;
        }

        return buildUserPayload('admin', rows[0]);
    }

    const [rows] = await db.query(
        `SELECT CustomerID, FirstName, LastName, Email, EncryptedPassword
         FROM Customer
         WHERE LOWER(Email) = LOWER(?)
         LIMIT 1`,
        [email]
    );

    if (rows.length === 0 || rows[0].EncryptedPassword !== password) {
        return null;
    }

    return buildUserPayload('customer', rows[0]);
};

exports.login = async (req, res) => {
    try {
        const email = String(req.body.email || '').trim();
        const password = String(req.body.password || '');
        const requestedRole = String(req.body.role || 'auto').toLowerCase();

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        let user = null;

        if (requestedRole === 'admin' || requestedRole === 'customer') {
            user = await loginWithRole(requestedRole, email, password);
        } else {
            user = await loginWithRole('admin', email, password);
            if (!user) {
                user = await loginWithRole('customer', email, password);
            }
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        return res.json({
            success: true,
            message: 'Login successful.',
            user,
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
