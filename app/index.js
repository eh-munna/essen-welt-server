import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import config from '../src/config/index.js';
import { globalError } from '../src/middlewares/globalError.js';
import router from '../src/routes/index.js';
const app = express();

// Enable CORS for all routes in the application

const corsOptions = {
  origin: [config.corsOrigin, 'http://localhost:5174'],
  credentials: true,
  allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

// Middleware for parsing JSON request bodies and handling cookies
app.use(express.json());
app.use(cookieParser());

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
