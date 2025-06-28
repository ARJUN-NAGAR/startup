import { Router } from 'express';
import { Document } from '../models/index.js';
import { softDeleteById } from './helper.js';
import authMiddleware from './auth/authMiddleware.js';
const router = Router();

// Add new Document
/*
router.post('/create', async (req, res) => {
    try {
        const { userId, issueId, documentType, fileUrl } = req.body;

        const newDoc = await Document.create({
            userId,
            issueId,
            documentType,
            fileUrl,
            uploadedAt: new Date()
        });

        res.status(201).json(newDoc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all Documents
router.get('/list', async (req, res) => {
    try {
        const docs = await Document.find().populate('userId', 'fullName');
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete a Document
router.get('/documents', async (req, res) => {
  try {
    const docs = await Document.find({ isDeleted: false });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/


router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { issueId, documentType, fileUrl } = req.body;
    const newDoc = await Document.create({
      userId: req.user.userId,
      issueId,
      documentType,
      fileUrl,
      uploadedAt: new Date(),
      isDeleted: false
    });
    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/list', authMiddleware, async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.user.userId, isDeleted: false });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const doc = await softDeleteById(Document, req.params.id);
    res.json({ message: 'Document soft-deleted successfully', doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;