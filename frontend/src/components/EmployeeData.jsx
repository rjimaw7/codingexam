import React from "react";
import { Link } from "react-router-dom";

const EmployeeData = ({ employee }) => {
  return (
    <>
      <tr>
        <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
          {employee._id}
        </td>
        <td className="p-4 text-gray-700 whitespace-nowrap">{employee.name}</td>
        <td className="p-4 text-gray-700 whitespace-nowrap">{employee.age}</td>
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
          <strong className="bg-black text-white px-3 py-1.5 rounded text-xs font-medium">
            <Link to={`/employees/${employee._id}`} className="m-2">
              View Single Employee
            </Link>
          </strong>
        </td>
      </tr>
    </>
  );
};

export default EmployeeData;
