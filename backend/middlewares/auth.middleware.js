import pool from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query(
            `SELECT user_id, email, role FROM users WHERE user_id = $1`,
            [decoded.userId]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        req.user = user.rows[0];
        next();

    } catch (error) {
        console.error('Authorization error:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

export default requireAuth;