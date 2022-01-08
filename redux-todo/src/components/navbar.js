import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { singOut } from "../actions/userActions";

function Navbar() {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userSignin);
  const { userInfo, error } = userRegister;
  const handleLogOut = () => {
    dispatch(singOut());
  };
  console.log("userInfo", error, userInfo);
  return (
    <div>
      <nav className="navbar navbar-light bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-decoration-none text-light">
            TODO APP
          </Link>
          <div className="d-flex">
            {userInfo && userInfo?.name ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary btn-sm dropdown-toggle bg-dark text-light"
                  type="button"
                  id="navbarDarkDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userInfo.name}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <p className="dropdown-item" onClick={() => handleLogOut()}>
                      Log Out
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="text-decoration-none text-light" to="/signin">
                Log In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
