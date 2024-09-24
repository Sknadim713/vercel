// models/staff_model.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentname: {
    type: String,
    required: true
  },
  studentsurname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
 
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',  // Reference to Employee model
  }
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
