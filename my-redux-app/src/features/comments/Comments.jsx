// src/features/comments/Comments.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCommentsForArticleId,
  selectComments,
  isLoadingComments,
} from './commentsSlice';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

// Receives article as a PROP (not from Redux state)
const Comments = ({ article }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const commentsAreLoading = useSelector(isLoadingComments);

  const commentsForArticleId = article ? comments[article.id] : [];

  useEffect(() => {
    if (article && article.id) {
      dispatch(loadCommentsForArticleId(article.id));
    }
  }, [article, dispatch]);

  if (commentsAreLoading) return <div className='comments-loading'>Loading Comments...</div>;
  if (!article) return null;

  return (
    <div className='comments-container'>
      <h3 className='comments-title'>Comments</h3>
      <CommentList comments={commentsForArticleId} />
      <CommentForm articleId={article.id} />
    </div>
  );
};

export default Comments;