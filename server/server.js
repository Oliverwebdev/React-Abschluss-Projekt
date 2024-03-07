// Importieren Sie express, mongoose, userRoutes, dotenv und cors wie bereits vorhanden
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors'; 

import morgan from 'morgan';

dotenv.config({ path: '../.env' });

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(morgan('dev'));

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mit MongoDB Datenbank verbunden'))
  .catch(err => console.error('Fehler bei der Verbindung zur MongoDB:', err));

app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
