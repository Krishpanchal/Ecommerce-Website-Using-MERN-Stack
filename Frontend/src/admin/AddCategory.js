import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";
import AdminDashboardLeftSide from "../user/AdminDashboardLeftSide";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setSuccess(false);
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request call

    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError(false);
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Category created successfully!
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-warning"
            style={{ display: error ? "" : "none" }}
          >
            Category has not created! Please try again
          </div>
        </div>
      </div>
    );
  };

  function adminRightSide() {
    return (
      <div>
        {successMessage()}
        {errorMessage()}

        <div className="card">
          <h4 className="card-header bg-dark text-white">Create Catergory</h4>
          <ul className="list-group">
            <form>
              <li
                className="list-group-item bg-light"
                style={{ fontSize: "1.2rem" }}
              >
                <div className="form-group">
                  <label for="createCategory">Enter the Category</label>
                  <input
                    type="text"
                    id="createCategory"
                    onChange={handleChange}
                    className="form-control my-2"
                    value={name}
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                  />
                  <button className="btn btn-success" onClick={onSubmit}>
                    Create Category
                  </button>
                </div>
              </li>
            </form>

            <li
              className="list-group-item bg-light"
              style={{ fontSize: "1.2rem" }}
            >
              <span
                className="badge badge-danger mr-2 p-2"
                style={{ fontSize: "1.2rem" }}
              >
                Admin Area
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Base
        title="Welcome to Admin Area"
        description="Manage all the products here"
        className="container bg-success p-4"
      >
        <div className="row">
          <div className="col-3">
            <AdminDashboardLeftSide />
          </div>
          <div className="col-9">{adminRightSide()}</div>
        </div>
      </Base>
    </div>
  );
}

export default AddCategory;
