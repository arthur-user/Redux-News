import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from './newsThunks';
const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    filteredArticles: [],
    loading: false,
    error: null,
    lastFetched: null,
    searchQuery: '',
    selectedCategory: '',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;

      state.filteredArticles = state.articles.filter(article =>
        article.title?.toLowerCase().includes(action.payload.toLowerCase()) ||
        article.description?.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload || [];
        state.filteredArticles = action.payload || [];
        state.lastFetched = new Date().toISOString();
        state.searchQuery = '';
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  }
});

export const { setSearchQuery, setCategory, clearError } = newsSlice.actions;

export const selectAllArticles = (state) => state.news.articles;
export const selectFilteredArticles = (state) => state.news.filteredArticles;
export const selectLoading = (state) => state.news.loading;
export const selectError = (state) => state.news.error;
export const selectSelectedCategory = (state) => state.news.selectedCategory;

export default newsSlice.reducer;