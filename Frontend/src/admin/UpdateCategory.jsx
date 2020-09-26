import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { getCategory, updateCategory } from "./helper/adminapicall";

function UpdateCategory({ match }) {
  const [values, setValues] = useState({
    name: "",
    error: false,
    updatedCategory: "",
  });

  const { name, error, updatedCategory } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (categoryname) => (event) => {
    setValues({
      ...values,
      [categoryname]: event.target.value,
    });
  };

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    updateCategory(match.params.categoryId, user._id, token, name).then(
      (data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            name: "",
            updatedCategory: true,
            updateCategory: data?.name,
          });
        }
      }
    );
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: updatedCategory ? "" : "none" }}
    >
      <h4>{updatedCategory} updated successfully</h4>
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error}</h4>
    </div>
  );

  const UpdateCategoryForm = () => (
    <form>
      <div className="form-group">
        <label style={{ marginTop: "10px" }}>
          Enter the Updated Category Name
        </label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          placeholder="Updated Category Name"
          value={name}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success"
        style={{ marginBottom: "10px" }}
      >
        Update Category
      </button>
    </form>
  );

  return (
    <Base
      title="Update your Category here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {UpdateCategoryForm()}
        </div>
      </div>
    </Base>
  );
}

export default UpdateCategory;
