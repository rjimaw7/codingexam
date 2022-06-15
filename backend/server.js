const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

const { errorHandler } = require("./middleware/errorMiddleware");

// Connect to Database
connectDB();

const app = express();

// To get request.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User Routes
app.use("/api/users", require("./routes/userRoutes"));
// Employees Routes
app.use("/api/employees", require("./routes/employeesRoutes"));

// Error middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
