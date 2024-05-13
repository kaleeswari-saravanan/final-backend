// routes/studetails.js

const express = require('express');
const router = express.Router();

const Student = require('../models/Student');

// Registration
router.post('/register', async (req, res) => {
  try {
    const { student_id,name,age,stu_email,blood_group } = req.body;

    // Check if user already exists
    let student = await Student.findOne({ student_id });
    if (student) {
      return res.status(400).json({ msg: 'Student already Registered' });
    }
    student = new Student({ student_id,name,age,stu_email,blood_group });


    await student.save();

    res.status(201).json({ msg: 'Student registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


router.get('/nextStudentId', async (req, res) => {
  try {
    // Find the latest student record in the database
    const latestStudent = await Student.findOne().sort({ student_id: -1 });

    let nextStudentId = 1; // Default value if no student exists yet

    if (latestStudent) {
      // If a student exists, increment the student_id for the next student
      nextStudentId =Number( latestStudent.student_id )+ 1;
    }

    // Respond with the next student ID
    res.json({ studentId: nextStudentId });
  } catch (err) {
    // Handle errors
    res.status(500).json({ message: err.message });
  }
});

// Route for retrieving all students
router.get('/studentData', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/studentData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for updating a student
router.put('/studentData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, name,age, stu_email,blood_group } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { student_id, name, age, stu_email, blood_group  },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for deleting a student
router.delete('/studentData/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

