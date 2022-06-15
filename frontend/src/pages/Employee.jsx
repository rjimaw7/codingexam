import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getEmployee,
  deleteEmployee,
} from "../features/employees/employeeSlice";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Employee = () => {
  const { employee, isLoading } = useSelector((state) => state.employees);

  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const { employeeId } = useParams();

  useEffect(() => {
    dispatch(getEmployee(params.id));
  }, [dispatch, params.id]);

  const onEmployeeDelete = () => {
    if (window.confirm("Are you sure you want to delete this employee")) {
      dispatch(deleteEmployee(params.id));
      toast.success("Employee Data Deleted successfully");
      navigate("/employees");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="mt-5">
          <BackButton url={"/employees"} />
          <h1 className="text-4xl font-bold sm:text-4xl flex justify-center">
            Employee {employee.id}
          </h1>
        </div>
        <br />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">ID</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Name</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Age</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Gender</div>
                </th>
                <th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">Actions</div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {employee._id}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {employee.name}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {employee.age}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  {employee.gender === "female" ? (
                    <>
                      <strong className="bg-green-500 text-white px-3 py-1.5 rounded text-xs font-medium">
                        {employee.gender}
                      </strong>
                    </>
                  ) : (
                    <>
                      <strong className="bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-medium">
                        {employee.gender}
                      </strong>
                    </>
                  )}
                </td>
                <td className="p-4 text-gray-700 whitespace-nowrap">
                  <strong className="bg-yellow-500 text-white px-3 py-1.5 rounded text-xs font-medium mr-2">
                    <Link
                      to={`/employees/${employee._id}/edit`}
                      className="m-2"
                    >
                      Edit Employee
                    </Link>
                  </strong>
                  <button
                    onClick={onEmployeeDelete}
                    className="bg-red-100 text-amber-700 px-3 py-1.5 rounded text-xs font-medium"
                  >
                    Delete Employee
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employee;
