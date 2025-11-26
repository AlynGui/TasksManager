import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
     process.env.FRONTEND_PRODUCTION_URL, 
     process.env.FRONTEND_DEVELOPMENT_URL 
    ],
  credentials: true
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

