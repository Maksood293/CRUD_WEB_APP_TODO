import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSigninAction } from "../actions/userActions";

function Signin(props) {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error, success } = userSignin;
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo, props.history]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userDetail;
    console.log("userDetails", error);
    dispatch(userSigninAction(email, password));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="conatiner m-5">
      <h2 className="mt-5">Sign In Form</h2>
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="card p-5 mt-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
        <div className="pt-2">
          New User? <Link to={`/register`}>Create your account</Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
