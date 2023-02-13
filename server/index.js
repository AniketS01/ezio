import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './db/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use('/api/post', postRoutes);
app.use('/api/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.send('hello from ezio');
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log('server started'));
  } catch (error) {
    console.error(error.message);
  }
};

startServer();
