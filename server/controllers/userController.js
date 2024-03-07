import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { name, email, password, street, city } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }
    
    const user = await User.create({ name, email, password, street, city });

    res.status(201).json({ message: 'Benutzer erfolgreich erstellt', user: { name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Fehler bei der Registrierung', error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Ungültiges Passwort' });
    }

    res.status(200).json({ message: 'Erfolgreich angemeldet', role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Fehler bei der Anmeldung', error: error.message });
  }
};
