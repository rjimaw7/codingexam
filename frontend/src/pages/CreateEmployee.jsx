import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createEmployee, reset } from "../features/employees/employeeSlice";
import Spinner from "../components/Spinner";

function CreateEmployee() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");

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
    // if (isSuccess || user) {
    //   navigate("/");
    // }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createEmployee({
        name,
        gender,
        age,
      })
    );

    toast.success("Employee Added Successfully");
    navigate("/employees");
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
                New Employee
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
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-black mb-2 cursor-pointer"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 text-gray-600 font-semibold"
                >
                  Age
                </label>
                <input
                  type="number"
                  className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                  name="password"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white font-semibold py-2 rounded-md  tracking-wide mb-1"
            >
              Submit
            </button>
            <Link
              to="/employees"
              className="mt-4 w-full bg-black block text-center text-white font-semibold py-2 rounded-md  tracking-wide "
            >
              Cancel
            </Link>
            <br />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateEmployee;
