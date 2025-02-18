import cors from 'cors';
import express from 'express';
import { globalError } from '../src/middlewares/globalError.js';
import router from '../src/routes/index.js';
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Enable CORS for all routes in the application
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    name: 'essen-welt-server',
  });
});

// API for accessing

app.use('/api/v1', router);

// Global error handling middleware
app.use(globalError);

// Not Found
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;
