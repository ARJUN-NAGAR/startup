import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import LegalIssue from '../models/LegalIssue.js';
import Document from '../models/Document.js';

const router = Router();

/**
 * 🔒 All routes protected - Only accessible by logged-in 'citizen'
 */
router.use(authMiddleware);

// ✅ Get all Legal Issues for logged-in Citizen
router.get('/issues', async (req, res) => {
    if (req.user.role !== 'citizen') {
        return res.status(403).json({ message: 'Access Denied. Citizens only.' });
    }

    try {
        const issues = await LegalIssue.find({
            userId: req.user.userId,
            isDeleted: false
        }).populate('kiosk assignedParalegal');
        
        res.json({ issues });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get all Documents for logged-in Citizen
router.get('/documents', async (req, res) => {
    if (req.user.role !== 'citizen') {
        return res.status(403).json({ message: 'Access Denied. Citizens only.' });
    }

    try {
        const documents = await Document.find({
            userId: req.user.userId,
            isDeleted: false
        }).populate('issueId');
        
        res.json({ documents });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Citizen can Report a New Legal Issue
router.post('/issues', async (req, res) => {
    if (req.user.role !== 'citizen') {
        return res.status(403).json({ message: 'Access Denied. Citizens only.' });
    }

    const { issueType, description, kiosk } = req.body;

    try {
        const issue = new LegalIssue({
            userId: req.user.userId,
            issueType,
            description,
            status: 'Pending',
            kiosk,
            isDeleted: false
        });

        await issue.save();
        res.json({ message: '✅ Legal Issue reported successfully!', issue });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
