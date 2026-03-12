// server/routes/comments.routes.js
import express from 'express';
import * as commentsController from '../controllers/comments.controller.js';

const router = express.Router();

router.get('/:articleId', commentsController.getByArticleId);
router.post('/', commentsController.create);
router.delete('/:commentId', commentsController.remove);

export default router;