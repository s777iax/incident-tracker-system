import { Router } from 'express';
import requireAuth from '../middlewares/auth.middleware.js';
import requireAdmin from '../middlewares/admin.middleware.js';
import pool from '../db.js';
import summariseIncident from '../services/ai.service.js';

const incidentRouter = Router();

incidentRouter.get('/admin', requireAuth, requireAdmin, async (req, res) => {
    try {
        const result = await pool.query(`
        SELECT * FROM incidents
        ORDER BY created_at DESC`);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

incidentRouter.get('/admin/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`SELECT * FROM incidents WHERE incident_id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

incidentRouter.patch('/:id/status', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const allowedStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const result = await pool.query(
            `UPDATE incidents
            SET status = $1
            WHERE incident_id = $2
            RETURNING *`,
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

incidentRouter.patch('/:id/severity', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { severity } = req.body;

        if (!severity) {
            return res.status(400).json({ error: 'Severity is required' });
        }

        const allowedSeverities = ['LOW', 'MEDIUM', 'HIGH'];
        if (!allowedSeverities.includes(severity)) {
            return res.status(400).json({ error: 'Invalid severity value' });
        }

        const result = await pool.query(
            `UPDATE incidents
            SET severity = $1
            WHERE incident_id = $2
            RETURNING *`,
            [severity, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


incidentRouter.post('/:id/ai-summary', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const incidentResult = await pool.query(
            `SELECT description, ai_summary
                FROM incidents
                WHERE incident_id = $1`,
            [id]
        );

        if (incidentResult.rows.length === 0) {
            return res.status(404).json({ error: 'Incident not found' });
        }

        const { description, ai_summary } = incidentResult.rows[0];

        if (ai_summary) {
            return res.json({
                incident_id: id,
                ai_summary,
                cached: true
            });
        }

        const summary = await summariseIncident(description);

        const updateResult = await pool.query(
            `UPDATE incidents
                SET ai_summary = $1
                WHERE incident_id = $2
                RETURNING ai_summary`,
            [summary, id]
        );

        res.json({
            ...updateResult.rows[0],
            cached: false
        });

    } catch (error) {
        console.error('AI Summary error:', error);
        res.status(500).json({ error: error.message });
    }
});

incidentRouter.get('/mine', requireAuth, async (req, res) => {
    try {
        const userId = req.user.user_id;

        const result = await pool.query(
            `SELECT * FROM incidents
        WHERE created_by = $1
        ORDER BY created_at DESC`,
            [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

incidentRouter.get('/mine/:id', requireAuth, async (req, res) => {

    try {
        const { id } = req.params;
        const userId = req.user.user_id;

        const result = await pool.query(
            `SELECT * FROM incidents
        WHERE incident_id = $1 AND created_by = $2`,
            [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Incident not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

incidentRouter.post('/', requireAuth, async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description required' });
        }

        const createdBy = req.user.user_id;

        const result = await pool.query(
            `INSERT INTO incidents (title, description, created_by)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [title, description, createdBy]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});






export default incidentRouter;