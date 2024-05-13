// models/Student.js

const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  stu_email: {
    type: String,
    required: true,
    unique: true
  },
  blood_group: {
    type: String,
    required: true
  }
});

const student = mongoose.model('studentInfo', StudentSchema);

module.exports = student;
