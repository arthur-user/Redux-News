import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCommentIsPending, postCommentForArticleId
} from '../features/comments/commentsSlice';
import { selectIsAuthenticated } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function CommentForm({ articleId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  // Declare isCreatePending here.

const isAuthenticated = useSelector(selectIsAuthenticated)
const isCreatePending = useSelector(createCommentIsPending)

if (!isAuthenticated) {
  return (
    <p>
      Please <Link to="/login">log in</Link> or{" "}
      <Link to="/register">register</Link> to add a comment.
    </p>
  );
}
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    // dispatch your asynchronous action here!
    dispatch(postCommentForArticleId({
      articleId, comment
    }))
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='comment' className='label'>
        Add Comment:
      </label>
      <div id='input-container'>
        <input
          id='comment'
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          type='text'
        />
        <button

          className='comment-button' disabled={isCreatePending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
