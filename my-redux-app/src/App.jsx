import React from "react";
import { Routes, Route } from "react-router-dom";

import ArticlePreviews from "./features/articlePreviews/ArticlePreviews";
import CurrentArticle from "./features/currentArticle/CurrentArticle";
import Comments from "./features/comments/Comments";
import NewsAggregator from "./components/NewsAggregator";

import LoginForm from "./features/auth/LoginForm.jsx";
import RegisterForm from "./features/auth/RegisterForm.jsx";

function HomePage() {
  return (
    <>
      <div className="current-article">
        <CurrentArticle />
        <Comments />
        <NewsAggregator />
      </div>
      <ArticlePreviews />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header" />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;