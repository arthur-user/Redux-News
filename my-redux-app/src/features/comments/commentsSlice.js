// client/src/features/comments/commentsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchCommentsByArticleId,
  createComment,
  deleteComment,
} from './commentsAPI';

// ========== THUNKS ==========
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (articleId, { rejectWithValue }) => {
    try {
      return await fetchCommentsByArticleId(articleId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const postCommentForArticleId = createAsyncThunk(
  'comments/postCommentForArticleId',
  async ({ articleId, comment }, { rejectWithValue }) => {
    try {
      console.log('🚀 Starting comment post...', { articleId, comment });
      const result = await createComment(articleId, 'Anonymous', comment);
      console.log('✅ Comment posted successfully:', result);
      return result;
    } catch (err) {
      console.error('❌ Error posting comment:', err);
      return rejectWithValue(err.message);
    }
  }
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async ({ commentId, articleId }, { rejectWithValue }) => {
    try {
      await deleteComment(commentId);
      return { commentId, articleId };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ========== SLICE ==========
export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byArticleId: {},
    isLoadingComments: false,
    failedToLoadComments: false,
    createCommentIsPending: false,
    failedToCreateComment: false,
  },
  extraReducers: (builder) => {
    builder
      // Load comments
      .addCase(loadCommentsForArticleId.pending, (state) => {
        state.isLoadingComments = true;
        state.failedToLoadComments = false;
      })
      .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        const articleId = action.meta.arg;
        // Normalize: { id, content } → { id, text }
        state.byArticleId[articleId] = action.payload.comments.map((c) => ({
          id: c.id,
          text: c.content,
        }));
      })
      .addCase(loadCommentsForArticleId.rejected, (state) => {
        state.isLoadingComments = false;
        state.failedToLoadComments = true;
      })

      // Post comment
      .addCase(postCommentForArticleId.pending, (state) => {
        state.createCommentIsPending = true;
        state.failedToCreateComment = false;
      })
      .addCase(postCommentForArticleId.fulfilled, (state, action) => {
        console.log("✅ Redux received:", action.payload);

        state.createCommentIsPending = false;
        const { comment } = action.payload;

        // ✅ Use article_id (snake_case from database)
        const articleId = comment.article_id;
        const normalized = { id: comment.id, text: comment.content };

        console.log("📝 Adding to article:", articleId, "Comment:", normalized);

        if (state.byArticleId[articleId]) {
          state.byArticleId[articleId].unshift(normalized); // Add to top
        } else {
          state.byArticleId[articleId] = [normalized];
        }

        console.log("📝 State now:", state.byArticleId[articleId]);
      })
      .addCase(postCommentForArticleId.rejected, (state) => {
        state.createCommentIsPending = false;
        state.failedToCreateComment = true;
      })

      // Delete comment
      .addCase(removeComment.fulfilled, (state, action) => {
        const { commentId, articleId } = action.payload;
        state.byArticleId[articleId] = state.byArticleId[articleId].filter(
          (c) => c.id !== commentId,
        );
      });
  },
});

// ========== SELECTORS ==========
export const selectComments = (state) => state.comments.byArticleId;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const createCommentIsPending = (state) => state.comments.createCommentIsPending;

export default commentsSlice.reducer;