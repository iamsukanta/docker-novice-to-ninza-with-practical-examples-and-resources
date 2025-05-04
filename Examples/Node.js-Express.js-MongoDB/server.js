const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Model
const User = require('./models/User');


dotenv.config();
const app = express();

//Middleware
app.use(express.json())

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


//App Routes
//Store users 
app.post('/users', async (req, res) => {
    const {email, name } = req.body;
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'User saved', user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET all users
app.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});

// GET all users
app.get('/users-list', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});

// GET all users
app.get('/all-users', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
});
  

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));