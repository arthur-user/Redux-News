import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchNews } from "../features/news/newsThunks";
import {
  setSearchQuery,
  setCategory,
  selectFilteredArticles,
  selectLoading,
  selectError,
  selectSelectedCategory,
} from "../features/news/newsSlice";

import { selectCategories } from "../features/filters/filtersSlice";
import { selectIsAuthenticated, logout } from "../features/auth/authSlice";

import NewsCard from "./NewsCard";

import {
  Newspaper,
  RefreshCw,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";

export default function NewsAggregator() {
  const dispatch = useDispatch();

  const filteredArticles = useSelector(selectFilteredArticles);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedCategory = useSelector(selectSelectedCategory);
  const categories = useSelector(selectCategories);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    dispatch(fetchNews({ category: "", query: "" }));
  }, [dispatch]);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(fetchNews({ category: selectedCategory, query: localSearch }));
    }, 400);

    return () => clearTimeout(id);
  }, [localSearch, selectedCategory, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchNews({ category: selectedCategory, query: "" }));
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
    dispatch(fetchNews({ category, query: "" }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">

          <div className="flex items-center justify-between">

            {/* LEFT SIDE: TITLE */}
            <div className="flex items-center gap-3">
              <Newspaper size={32} />
              <h1 className="text-3xl font-bold">Redux News</h1>
            </div>

            {/* RIGHT SIDE: ACTIONS */}
            <div className="flex items-center gap-4">

              {/* REFRESH BUTTON */}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>

              {/* AUTH BUTTONS */}
              {isAuthenticated ? (
                <button
                  onClick={() => dispatch(logout())}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
                >
                  Logout
                </button>
              ) : (
                <div className="flex gap-2">

                  <Link
                    to="/login"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-900"
                  >
                    Register
                  </Link>

                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* SEARCH */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={localSearch}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* CATEGORY FILTERS */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={18} className="text-gray-600" />

            <button
              onClick={() => handleCategoryChange("")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">Error loading news</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="text-center py-12">
            <RefreshCw
              className="animate-spin mx-auto text-blue-600 mb-4"
              size={40}
            />
            <p className="text-gray-600">Loading news...</p>
          </div>
        )}

        {/* ARTICLES */}
        {!loading && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <NewsCard key={article.article_id || index} article={article} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredArticles.length === 0 && !error && (
          <div className="text-center py-12">
            <Newspaper className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">No articles found</p>
          </div>
        )}

      </div>
    </div>
  );
}