// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/studentDetails',require('./routes/studetails'));

mongoose.set('strictQuery', false);

// MongoDB Connection
if(mongoose.connect('mongodb+srv://kavithakk26:kavithaK26@cluster0.wossllz.mongodb.net/AcademicDatabase?retryWrites=true&w=majority&appName=Cluster0'))
{
  console.log('MongoDB database connection established successfully');
}

// Start server
app.listen(3005, () => {
  console.log(`Server is running on port 3005`);
});
