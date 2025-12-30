import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const signUp = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const existingUser = await pool.query(
            `SELECT * FROM users
        WHERE email = $1`,
            [email]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (email, password_hash, role)
            VALUES ($1, $2, $3)
            RETURNING user_id, email, role`,
            [email, hashedPassword, role || 'user']
        )

        const token = jwt.sign(
            {
                userId: result.rows[0].user_id,
                role: result.rows[0].role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({ user: result.rows[0], token });

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await pool.query(
            `SELECT * FROM users
        WHERE email = $1`,
            [email]);

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'User not found.' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        const token = jwt.sign(
            {
                userId: user.rows[0].user_id,
                role: user.rows[0].role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            user: {
                user_id: user.rows[0].user_id,
                email: user.rows[0].email,
                role: user.rows[0].role
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};