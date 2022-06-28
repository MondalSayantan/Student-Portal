const { User } = require("../models");
const { Student } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const createStudent = async function (studentBody) {
  const student = await Student.create(studentBody);
  return student;
};

const getStudentDetails = async function (user) {
  const student = await Student.findOne({ email: user.email });
  return student;
};

const updateStudent = async function (id, studentBody) {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  const email = user.email;
  const student = await Student.findOne({ email });
  const updatedStudent = await student.updateOne(studentBody);
  return updatedStudent;
};

const updateByStudent = async function (user, studentBody) {
  const student = await Student.findOne({ email: user.email });
  const updatedStudent = await student.updateOne(studentBody);
  return updatedStudent;
};

const deleteStudent = async function (id) {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  const email = user.email;
  const student = await Student.findOne({ email });
  const deletedStudent = await student.remove();
  const deletedUSer = await user.remove();
  return deletedStudent;
};

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentDetails,
  updateByStudent,
};
