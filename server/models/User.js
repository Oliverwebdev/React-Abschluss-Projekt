import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ein Benutzername ist erforderlich'],
  },
  email: {
    type: String,
    required: [true, 'Eine E-Mail-Adresse ist erforderlich'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Ein Passwort ist erforderlich'],
    minlength: 6
  },
  street: String,
  city: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
