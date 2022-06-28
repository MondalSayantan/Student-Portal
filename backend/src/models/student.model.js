const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  mobileNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  age: {
    type: Number,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  fatherMobile: {
    type: Number,
  },
  motherMobile: {
    type: Number,
  },

  fatherEmail: {
    type: String,
  },
  motherEmail: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports.Student = Student;
module.exports = {
  Student,
};
