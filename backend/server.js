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

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to my Coding Exam" });
  });
}

// Error middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
