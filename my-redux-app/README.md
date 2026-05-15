# Redux News Aggregator

> A full-stack news aggregation platform with real-time comments, category filtering, and authenticated discussions.

**Live Demo:** [Redux News Aggregator Live Site](https://redux-news-rosy.vercel.app)

**API Health Check:** [Backend API Health Endpoint](https://redux-news.onrender.com/api/health)

---

# Overview

Redux News Aggregator is a modern full-stack web application that allows users to browse current news articles, search content in real time, filter by category, and participate in article discussions through a persistent comment system.

The frontend is built with React and Redux Toolkit for scalable state management, while the backend uses Express and Supabase to handle authentication, comments, and API communication. News content is powered by the [NewsData.io API](https://newsdata.io/?utm_source=chatgpt.com).

The project supports both:

* **Local development** using a locally hosted Express server
* **Production deployment** with the frontend hosted on [Vercel](https://vercel.com?utm_source=chatgpt.com) and the backend hosted on [Render](https://render.com?utm_source=chatgpt.com)

---

# Features

## 📰 News Aggregation

* Fetches real-time news articles from NewsData.io
* Responsive article grid layout
* Article previews with source and metadata

##  Search Functionality

* Real-time article searching
* Debounced API requests for improved performance
* Search across multiple article categories

## Category Filtering

* Filter news by categories such as:

  * Business
  * Technology
  * Sports
  * Entertainment
  * Health
* Dynamic filtering powered by Redux state

##  Comment System

* Persistent comment storage using Supabase PostgreSQL
* Authenticated users can post comments
* Real-time UI updates after submissions

## Authentication

* User registration and login
* Redux-managed authentication state
* Express backend authentication workflow

##  Modern UI

* Responsive design for desktop and mobile
* Styled with Tailwind CSS
* Icons powered by Lucide React
* Fast development experience with Vite

---

# Tech Stack

## Frontend

* React 18
* Redux Toolkit
* React Router
* Tailwind CSS
* Lucide React
* Vite

## Backend

* Node.js
* Express.js
* Supabase (PostgreSQL)
* CORS
* dotenv

## External APIs

* NewsData.io

## Deployment

* Frontend: [Vercel](https://vercel.com?utm_source=chatgpt.com)
* Backend: [Render](https://render.com?utm_source=chatgpt.com)
* Database: [Supabase](https://supabase.com?utm_source=chatgpt.com)

---

# Getting Started

## Prerequisites

* Node.js 18+
* npm or yarn
* Supabase account
* NewsData.io API key

---

# Installation

## 1. Clone the Repository

```bash id="f9a2lx"
git clone https://github.com/yourusername/redux-news.git
cd redux-news
```

## 2. Install Dependencies

```bash id="p4v8qd"
npm install
```

---

# Environment Variables

## Backend `.env`

Create a `.env` file in the server root:

```env id="n2k6tm"
PORT=3001
CLIENT_URL=http://localhost:5173

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

NEWSDATA_API_KEY=your_newsdata_api_key
```

## Frontend `.env`

Create a `.env` file in the client root:

```env id="s7w3fy"
VITE_API_URL=http://localhost:3001
```

---

# Running the Application

## Run Frontend

```bash id="q6u4jp"
npm run dev
```

Frontend runs at:

```bash id="e5c8hn"
http://localhost:5173
```

---

## Run Backend

```bash id="v1t9mr"
npm run server
```

Backend runs at:

```bash id="o8k2zw"
http://localhost:3001
```

---

## Run Frontend + Backend Together

```bash id="a3m7yv"
npm run dev:all
```

Uses `concurrently` to run both development servers together.

---

# Database Setup

Run the following SQL inside the Supabase SQL Editor:

```sql id="y9r2kt"
CREATE TABLE comments (
  id          SERIAL PRIMARY KEY,
  article_id  TEXT NOT NULL,
  author      TEXT NOT NULL,
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_article_id 
ON comments(article_id);
```

---

# Production Deployment

## Local Development

The project works entirely locally without deployment services:

* React frontend runs locally with Vite
* Express backend runs locally
* News fetched from NewsData.io
* Supabase handles persistent database storage

## Production Architecture

| Service     | Platform |
| ----------- | -------- |
| Frontend    | Vercel   |
| Backend API | Render   |
| Database    | Supabase |

### Production Frontend Environment Variable

```env id="j8c5ul"
VITE_API_URL=https://redux-news.onrender.com
```

---

# API Endpoints

| Method | Endpoint                   | Description                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/news`                | Fetch latest news articles |
| GET    | `/api/news/search?q=`      | Search articles            |
| GET    | `/api/comments/:articleId` | Retrieve comments          |
| POST   | `/api/comments`            | Create comment             |
| POST   | `/api/register`            | Register user              |
| POST   | `/api/login`               | Authenticate user          |
| GET    | `/api/health`              | Health check endpoint      |

---

# Key Engineering Features

* Redux Toolkit for scalable global state management
* Debounced search optimization
* RESTful Express API architecture
* Environment-based frontend/backend configuration
* Persistent PostgreSQL comment storage
* Cross-origin API communication using CORS
* React component structure that emphasizes modularity
* Full production deployment workflow

---

# Future Improvements

* JWT persistent authentication
* OAuth login support
* Infinite scrolling / pagination
* Article bookmarking
* User profile pages
* Comment moderation tools
* Loading skeletons
* Optimistic UI updates
* Automated testing with Vitest + React Testing Library
* Docker containerization

---

# Challenges & Lessons Learned
* Learned how to structure a full-stack application with separated frontend and backend deployments
* Improved understanding of production environment variables across Vercel and Render
* Gained experience handling CORS and API communication between services
* Practiced scalable state management patterns using Redux Toolkit
* Implemented debounced search functionality to optimize API requests
* Worked with Supabase as a hosted PostgreSQL solution for persistent data storage
* Learned how to manage different development and production API configurations
* Discovered that long-running Express APIs were better suited for deployment on Render while keeping the React frontend on Vercel
* Gained hands-on experience debugging deployment issues between frontend, backend, and database services

# License

MIT License
