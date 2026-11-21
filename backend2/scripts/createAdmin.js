
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error('Please configure ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env');
    }

    const email = ADMIN_EMAIL.toLowerCase().trim();

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log('This admin account already exists.');
      return;
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await Admin.create({
      name: ADMIN_NAME,
      email,
      passwordHash,
    });

    console.log('First admin account created successfully!');
  } catch (error) {
    console.error('Admin creation failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
