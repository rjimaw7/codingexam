import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {/* <!-- component --> */}
      <div className="h-screen bg-gray-200 flex justify-center items-center w-full">
        <form onSubmit={onSubmit}>
          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-semibold text-gray-600">
                Register
              </h1>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white font-semibold py-2 rounded-md  tracking-wide mb-1"
            >
              Register
            </button>
            <br />
            <p className="text-sm text-center text-gray-500 mt-2">
              Have an account?
              <Link className="underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
