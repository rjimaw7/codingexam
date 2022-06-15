const asyncHandler = require("express-async-handler");

const Employees = require("../models/employeesModel");
const User = require("../models/userModel");

// @desc Get user employees
// @route GET /api/employees
// @access PRIVATE
const getEmployees = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const employees = await Employees.find({ user: req.user.id });

  res.status(200).json(employees);
});

// @desc Get user single employee
// @route GET /api/employees/:id
// @access PRIVATE
const getEmployee = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const employee = await Employees.findById(req.params.id);

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(employee);
});

// @desc Create new employee
// @route POST /api/employees
// @access PRIVATE
const createEmployee = asyncHandler(async (req, res) => {
  const { name, gender, age } = req.body;

  if (!name || !gender || !age) {
    throw new Error("Please complete all Employee fields");
  }

  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const employee = await Employees.create({
    name,
    gender,
    age,
    user: req.user.id,
  });

  res.status(201).json(employee);
});

// @desc Delete user employee
// @route DELETE /api/employees/:id
// @access PRIVATE
const deleteEmployee = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const employee = await Employees.findById(req.params.id);

  if (!employee) {
    res.status(400);
    throw new Error("Employee data not found");
  }

  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await employee.remove();

  res.status(200).json({ success: true });
});

// @desc Update trade
// @route PUT /api/employees/:id
// @access PRIVATE
const updateEmployee = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const employee = await Employees.findById(req.params.id);

  if (!employee) {
    res.status(400);
    throw new Error("Employee not found");
  }

  if (employee.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  let updatedData = {};

  updatedData.name = req.body.name;
  updatedData.age = req.body.age;
  updatedData.gender = req.body.gender;

  const updatedEmployee = await Employees.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      updatedData,
    }
  );

  res.status(200).json(updatedEmployee);
});

module.exports = {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
