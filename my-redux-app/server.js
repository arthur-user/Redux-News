// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import commentsRouter from './server/routes/comments.routes.js';
import authRouter from "./server/routes/auth.routes.js";

console.log('🔐 Environment check:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

// Routes (BEFORE error handler!)
app.use('/api/comments', commentsRouter);
app.use("/api", authRouter);
// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});
app.use("/api", authRouter);
// Global error handler (MUST BE LAST - AFTER ALL ROUTES!)
app.use((err, req, res, next) => {
  console.error('❌ ERROR:', err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
});