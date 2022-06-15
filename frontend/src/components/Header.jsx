import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const [state, setState] = useState(false);
  const navRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <header className="bg-gray-200">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-black" to="/">
                <span className="sr-only">Home</span>
                Spa
              </Link>
              <Link className="block text-black" to="/">
                Home
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <li className="mt-8  lg:mt-0 hidden lg:block ">
                    <h1 className="text-black">Welcome {user.name}</h1>
                  </li>
                  <div className="sm:gap-4 sm:flex">
                    <span
                      onClick={onLogout}
                      className="cursor-pointer px-5 py-2 text-sm font-medium text-center text-white bg-black  rounded-md shadow block lg:inline"
                    >
                      Logout
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="sm:gap-4 sm:flex">
                    <Link
                      className="px-5 py-2.5 text-sm font-medium text-white bg-black rounded-md shadow"
                      to="/login"
                    >
                      Login
                    </Link>

                    <div className="hidden sm:flex">
                      <Link
                        className="px-5 py-2.5 text-sm font-medium text-black bg-gray-100 rounded-md"
                        to="/register"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </>
              )}

              <div className="block md:hidden">
                <button className="p-2 text-gray-600 transition bg-gray-100 rounded hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
