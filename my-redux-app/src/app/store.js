import { configureStore } from '@reduxjs/toolkit';
import articlePreviewsReducer from '../features/articlePreviews/articlePreviewsSlice';
import currentArticleReducer from '../features/currentArticle/currentArticleSlice.js';
import commentsReducer from '../features/comments/commentsSlice';
import filtersReducer from '../features/filters/filtersSlice.js'
import newsReducer from '../features/news/newsSlice.js'
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    news: newsReducer,
    filters: filtersReducer,
    articlePreviews: articlePreviewsReducer,
    currentArticle: currentArticleReducer,
    comments: commentsReducer,
    auth: authReducer,
  },
});



