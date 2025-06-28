import { Router } from 'express';
import userRoutes from './userRoutes.js';
// import documentRoutes from './documentRoutes.js' (optional later)

const router = Router();

router.use('/', userRoutes);
// router.use('/documents', documentRoutes); (add more as needed)

export default router;
