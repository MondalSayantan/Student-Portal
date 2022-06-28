const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { tokenService, userService, studentService } = require("../services");

const registerUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateAuthToken(user);
  return res.status(httpStatus.CREATED).send({ token });
});

const login = catchAsync(async (req, res) => {
  const { id, password } = req.body;
  const user = await userService.loginUser(id, password);
  const token = await tokenService.generateAuthToken(user);
  return res.status(httpStatus.OK).send({ token });
});

const me = catchAsync(async (req, res) => {
  const details = await studentService.getStudentDetails(req.user);
  return res.status(httpStatus.OK).send(details);
});

const addStudent = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userService.createUser({ name, email, password });
  const student = await studentService.createStudent(req.body);
  const token = await tokenService.generateAuthToken(user);
  return res.status(httpStatus.CREATED).send({ token });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await studentService.updateStudent(id, req.body);
  return res.status(httpStatus.OK).send();
});

const updateByStudent = catchAsync(async (req, res) => {
  const updatedStudent = await studentService.updateByStudent(
    req.user,
    req.body
  );
  return res.status(httpStatus.OK).send(updatedStudent);
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await studentService.deleteStudent(id);
  return res.status(httpStatus.OK).send();
});

module.exports = {
  registerUser,
  login,
  addStudent,
  updateStudent,
  deleteStudent,
  me,
  updateByStudent,
};
