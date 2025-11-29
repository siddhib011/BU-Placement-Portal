require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./config/logger');

// --- Service URL Checks ---
if (!process.env.AUTH_SERVICE_URL || !process.env.PROFILE_SERVICE_URL || !process.env.APPLICATION_SERVICE_URL) {
  logger.error('Missing required service URL environment variables!');
  process.exit(1);
}

// --- Connect to Database ---
connectDB();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/health', (req, res) => {
  res.status(200).send('Quiz Service OK');
});

app.use('/', require('./routes/quizRoutes'));

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack });
  res.status(500).send('Something broke!');
});

// --- Start Server ---
const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  logger.info(`Quiz Service running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});