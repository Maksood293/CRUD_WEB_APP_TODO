import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";

function Registration(props) {
  const userRegister = useSelector((state) => state.userRegister);
  const dispatch = useDispatch();
  const { userInfo, loading, error, success } = userRegister;
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [aerror, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = userDetail;
    password !== cpassword
      ? setError("Password and confirm password are not match")
      : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) === false
      ? setError("Email is not a valid")
      : dispatch(register(name, email, password));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (userInfo && success) {
      props.history.push("/");
    }
  }, [userInfo, props.history, success]);
  return (
    <div className="conatiner m-5">
      {!!(aerror.length || error) && (
        <div class="alert alert-danger" role="alert">
          {error}
          {aerror}
        </div>
      )}

      <h2 className="mt-5">Registration Form</h2>
      <div className="card p-5 mt-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleChange}
            />
          </div>
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
          <div className="mb-3">
            <label for="password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
        <div className="pt-2">
          Already have an account? <Link to={`/signin`}>Sign-In</Link>
        </div>
      </div>
    </div>
  );
}

export default Registration;
