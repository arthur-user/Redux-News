import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    categories: [
      "business",
      "technology",
      "sports",
      "entertainment",
      "health",
      "science",
    ],
    activeFilters: [],
  },

  reducers: {
    toggleFilter: (state, action) => {
      const index = state.activeFilters.indexOf(action.payload);
      if (index > -1) {
        state.activeFilters.splice(index, 1);
      } else {
        state.activeFilters.push(action.payload);
      }
    },

    clearFilters: (state) => {
      state.activeFilters = [];
    },
  },
});

export const { toggleFilter, clearFilters } = filtersSlice.actions;


//Selector export

export const selectCategories = (state) => state.filters.categories;
export const selectActiveFilters = (state) => state.filters.activeFilters;

export default filtersSlice.reducer;