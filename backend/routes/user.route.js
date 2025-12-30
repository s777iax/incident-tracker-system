import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import pool from '../db.js';

const userRouter = Router();

userRouter.get('/admin', requireAuth, async (req, res) => {
    const role = req.user.role;
    if (role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    const result = await pool.query(
        `SELECT user_id, email, role 
        FROM users`
    );
    res.status(200).json(result.rows);
});

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(`DELETE FROM users WHERE user_id = $1`, [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default userRouter;