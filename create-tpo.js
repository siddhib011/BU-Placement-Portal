const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function createTPOAccount() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/authdb');
    console.log('Connected to authdb');

    // Create user schema
    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
      role: String,
      isVerified: Boolean,
      createdAt: Date,
      updatedAt: Date
    });

    const User = mongoose.model('User', userSchema);

    // Check if account already exists
    const existing = await User.findOne({ email: 'ownedbysiddhi@gmail.com' });
    if (existing) {
      console.log('TPO account already exists');
      await mongoose.connection.close();
      return;
    }

    // Create new account
    const hashedPassword = '$2a$10$v1MR3ov51w8rkWaIrimCsugcdex1hWZUsxetpGYqg.QZdyy5sZLTS'; // TPO@123456
    const tpoAccount = new User({
      email: 'ownedbysiddhi@gmail.com',
      password: hashedPassword,
      role: 'placementcell',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await tpoAccount.save();
    console.log('TPO account created successfully!');
    console.log('Email: ownedbysiddhi@gmail.com');
    console.log('Password: TPO@123456');
    console.log('Role: placementcell (COORDINATOR/TPO)');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createTPOAccount();
