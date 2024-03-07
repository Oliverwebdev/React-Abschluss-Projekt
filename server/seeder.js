import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js'; // Pfad zu Ihrem User-Modell anpassen

// Konfigurieren Sie die Verbindung zu Ihrer MongoDB-Datenbank
const MONGODB_URL = 'mongodb+srv://WebDevOli:OliveR@data.bd9tmlz.mongodb.net/OLBERTAGames';

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Verbindung erfolgreich.'))
.catch(err => console.error('MongoDB Verbindung fehlgeschlagen:', err));

// Benutzerdaten, die eingefügt werden sollen
const users = [
  {
    name: 'Max Mustermann',
    email: 'max@example.com',
    password: 'password123',
    street: 'Musterstraße 1',
    city: 'Musterstadt',
    role: 'user',
  },
  {
    name: 'Admin Benutzer',
    email: 'admin@example.com',
    password: 'adminpassword',
    street: 'Adminstraße 1',
    city: 'Adminstadt',
    role: 'admin',
  }
];

const seedUsers = async () => {
  // Löschen der vorhandenen Benutzer
  await User.deleteMany();

  // Einfügen der neuen Benutzer
  await User.insertMany(users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10), // Passwörter hashen
  })));

  console.log('Daten erfolgreich gesät.');
  mongoose.connection.close();
};

seedUsers().catch(err => {
  console.error('Fehler beim Säen der Daten:', err);
  mongoose.connection.close();
});
