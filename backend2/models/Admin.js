
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Admin email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },

    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
