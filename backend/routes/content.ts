import express from 'express';
import { PostModel, PostModelType } from '../models/post.model.js';

const router = express.Router();


router.get('/add', (req: express.Request, res: express.Response) => {
  res.json({})
})
router.get('/delete', (req: express.Request, res: express.Response) => {
  res.json({})
})
router.get('/update', (req: express.Request, res: express.Response) => {
  res.json({})
})

export default router;
