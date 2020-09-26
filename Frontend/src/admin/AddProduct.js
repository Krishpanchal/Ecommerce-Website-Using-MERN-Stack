import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import AdminDashboardLeftSide from "../user/AdminDashboardLeftSide";
import { getCategories, createProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

function AddProduct() {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
          getaRedirect: true,
        });
      }
    });
  };

  function successMessage() {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: createdProduct ? "" : "none" }}
          >
            {createdProduct} created Successfully!
          </div>
        </div>
      </div>
    );
  }

  function loadingMessage() {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: loading ? "" : "none" }}
          >
            Loading....
          </div>
        </div>
      </div>
    );
  }

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-warning"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (getaRedirect) {
      return <Redirect to="/" />;
    }
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, createdProduct: "", error: "" });
  };

  const adminRightSide = () => (
    <div>
      {loadingMessage()}
      {successMessage()}
      {errorMessage()}
      {performRedirect()}
      <div className="card">
        <h4 className="card-header bg-dark text-white">Create Catergory</h4>
        <ul className="list-group">
          <form>
            <li
              className="list-group-item bg-light"
              style={{ fontSize: "1.2rem" }}
            >
              <div className="form-group">
                <span>Post photo</span>
                <div className="form-group">
                  <label className="btn btn-block btn-success">
                    <input
                      onChange={handleChange("photo")}
                      type="file"
                      name="photo"
                      accept="image"
                      placeholder="choose a file"
                    />
                  </label>
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                  />
                </div>
                <div className="form-group">
                  <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                  >
                    <option>Select</option>
                    {categories &&
                      categories.map((cate, index) => (
                        <option key={index} value={cate._id}>
                          {cate.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Stock"
                    value={stock}
                  />
                </div>

                <button
                  type="submit"
                  onClick={onSubmit}
                  className="btn btn-outline-success mb-3"
                >
                  Create Product
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

export default AddProduct;
