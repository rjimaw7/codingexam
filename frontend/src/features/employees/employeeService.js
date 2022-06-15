import axios from "axios";

const API_URL = "/api/employees";

// Create new Employee
const createEmployee = async (employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, employeeData, config);

  return response.data;
};

// Get user Employees
const getEmployees = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get single user Employee
const getEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/" + employeeId, config);

  return response.data;
};

// Edit user Employee
const editEmployee = async (employeeId, employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "/" + employeeId,
    employeeData,
    config
  );

  return response.data;
};

// Delete user Employee
const deleteEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(API_URL + "/" + employeeId, config);

  return { employeeId };
};

const employeeService = {
  createEmployee,
  getEmployees,
  deleteEmployee,
  getEmployee,
  editEmployee,
};

export default employeeService;
