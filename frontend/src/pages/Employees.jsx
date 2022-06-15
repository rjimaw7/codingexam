import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, reset } from "../features/employees/employeeSlice";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import EmployeeData from "../components/EmployeeData";

const Employees = () => {
  const { employees, isLoading, isSuccess } = useSelector(
    (state) => state.employees
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="mt-5">
          <BackButton url={"/"} />
          <h1 className="text-4xl font-bold sm:text-4xl flex justify-center">
            My Employees
          </h1>
          <Link
            to={`/create`}
            className="border text-white bg-green-500 px-3.5 py-2 rounded text-xs font-medium ml-5"
          >
            Create New Employee
          </Link>
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
              {[...employees].map((employee) => (
                <EmployeeData key={employee._id} employee={employee} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employees;
