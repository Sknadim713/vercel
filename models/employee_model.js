// models/employee_model.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true ,"name is required"]
  },
  position: {
    type: String,
    required: [true ,"position is required"]
  },
  department: {
    type: String,
    required: [true ,"department is required"]
  },
  hireDate: {
    type: Date,
    default: Date.now
  }
},{timestamps:true});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
