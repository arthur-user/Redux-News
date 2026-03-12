Redux News Aggregator

A modern news aggregation web application built with React, Redux Toolkit, and Express, featuring category filtering, search functionality, and user authentication.

The app allows users to browse news articles, filter them by category, search across articles, and participate in discussions through a comment system. User authentication is handled via an Express backend connected to Supabase.

Features

News Aggregation

Fetch and display news articles in a responsive grid

Organized article cards with previews

Search

Real-time search for articles

Debounced queries to reduce API requests

Category Filtering

Filter articles by selectable categories

Dynamic category buttons

Authentication

User registration

User login / logout

Auth state managed with Redux

Comments System

Users can post comments on articles

Comments stored via backend API

Modern UI

Styled with TailwindCSS

Responsive layout

Icons via Lucide React

Tech Stack
Frontend

React

Redux Toolkit

React Router

TailwindCSS

Lucide Icons

Vite

Backend

Express

Supabase (database)

CORS

dotenv

Development Tools

ESLint

Concurrently

Installation

Clone the repository:

git clone https://github.com/yourusername/redux-news-aggregator.git
cd redux-news-aggregator

Install dependencies:

npm install
Environment Variables

Create a .env file in the root directory:

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
CLIENT_URL=http://localhost:5173
PORT=3001
Running the Application
Run Frontend Only
npm run dev

Frontend will run on:

http://localhost:5173
Run Backend Only
npm run server

Backend will run on:

http://localhost:3001
Run Frontend + Backend Together
npm run dev:all

This uses concurrently to run both services.


Future Improvements

Supabase Auth integration

Persistent login with JWT

Article bookmarking

Pagination / infinite scroll

Article detail pages

Rate limiting and moderation for comments

License

MIT License