import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/authRoutes.js';
import learningRoutes from './src/routes/learningRoutes.js';
import infoRoutes from './src/routes/infoRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();


// Configure CORS
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(compression()); // Compress responses

// Body parser configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add request logging for debugging
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Content-Type:', req.headers['content-type']);
  next();
});

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/learn', learningRoutes);
app.use('/api/info', infoRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is running' });
});

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: 'error',
//     message: err.message || 'Something went wrong!'
//   });
// });

// 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     status: 'error',
//     message: 'Route not found'
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/api/health to check server status`);
});


