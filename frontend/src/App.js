import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import Employee from "./pages/Employee";
import EditEmployee from "./pages/EditEmployee";
import CreateEmployee from "./pages/CreateEmployee";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<PrivateRoute />}>
            <Route path="/employees" element={<Employees />} />
          </Route>
          <Route path="/employees/:id" element={<PrivateRoute />}>
            <Route path="/employees/:id" element={<Employee />} />
          </Route>
          <Route path="/employees/:id/edit" element={<PrivateRoute />}>
            <Route path="/employees/:id/edit" element={<EditEmployee />} />
          </Route>
          <Route path="/create" element={<PrivateRoute />}>
            <Route path="/create" element={<CreateEmployee />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
