import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getCategories } from "./helper/adminapicall";

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [categoryDeleted, setDelete] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
        setDelete(true);
      }
    });
  };

  const deleteCategorySuccess = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: categoryDeleted ? "" : "none" }}
          >
            Category Deleted Successfully!
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Welcome admin" description="Manage Categories here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All Cagtegores:</h2>
      {deleteCategorySuccess()}
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total Categories :- {categories.length}
          </h2>

          {categories.map((category, index) => {
            return (
              <div>
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-white text-left">{category.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/category/update/${category._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisCategory(category._id);
                        setDelete(false);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <hr style={{ backgroundColor: "grey" }} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default ManageCategory;
