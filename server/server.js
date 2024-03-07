import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mit MongoDB Datenbank verbunden'))
  .catch(err => console.error('Fehler bei der Verbindung zur MongoDB:', err));

app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
