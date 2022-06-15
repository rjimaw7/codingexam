const express = require("express");
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeesController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getEmployees).post(protect, createEmployee);

router
  .route("/:id")
  .get(protect, getEmployee)
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);

module.exports = router;
