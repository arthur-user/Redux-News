import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ category = '', query = '' }, { rejectWithValue }) => {
    try {
      let url = 'https://newsdata.io/api/1/latest?apikey=pub_aeda040c5d4c4100b250ae160e0f01e3&language=en';

      if (category) url += `&category=${category}`;
      if (query) url += `&q=${query}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'success') {
        throw new Error(data.message || 'Error in fetching news');
      }

      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);