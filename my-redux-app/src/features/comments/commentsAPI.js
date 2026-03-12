// client/src/features/comments/commentsAPI.js
import { get, post, remove } from '../../services/api';

export const fetchCommentsByArticleId = (articleId) =>
  get(`/api/comments/${articleId}`);

export const createComment = (articleId, author, content) => {
  console.log('📤 Posting comment:', { articleId, author, content }); // ✅ Add this
  return post('/api/comments', { articleId, author, content });
};

export const deleteComment = (commentId) =>
  remove(`/api/comments/${commentId}`);