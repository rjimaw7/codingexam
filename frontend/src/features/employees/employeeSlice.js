import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

const initialState = {
  employees: [],
  employee: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new employee
export const createEmployee = createAsyncThunk(
  "employee/create",
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await employeeService.createEmployee(employeeData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(thunkAPI.rejectWithValue(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user Employees
export const getEmployees = createAsyncThunk(
  "employees/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await employeeService.getEmployees(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(thunkAPI.rejectWithValue(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user single Employee
export const getEmployee = createAsyncThunk(
  "employees/get",
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await employeeService.getEmployee(employeeId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(thunkAPI.rejectWithValue(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit user Employee Details
export const editEmployee = createAsyncThunk(
  "employee/edit",
  async ({ employeeId, employeeData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await employeeService.editEmployee(
        employeeId,
        employeeData,
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(thunkAPI.rejectWithValue(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user trade
export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await employeeService.deleteEmployee(employeeId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(thunkAPI.rejectWithValue(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = state.employees.map((employee) =>
          employee._id !== action.payload.id
            ? {
                ...employee,
                name: action.payload.name,
                gender: action.payload.gender,
                age: action.payload.age,
              }
            : employee
        );
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees.filter(
          (employee) => employee._id !== action.payload._id
        );
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
