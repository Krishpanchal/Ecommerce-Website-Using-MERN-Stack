import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

function ManageCategory() {
  const [products, setProducts] = useState([]);
  const [productDeleted, setDelete] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
        setDelete(true);
      }
    });
  };

  const deleteProductSuccess = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: productDeleted ? "" : "none" }}
          >
            Product Deleted Successfully!
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All products:</h2>
      {deleteProductSuccess()}
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total Products :- {products.length}
          </h2>

          {products.map((product, index) => {
            return (
              <div>
                <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                    <h3 className="text-white text-left">{product.name}</h3>
                  </div>
                  <div className="col-4">
                    <Link
                      className="btn btn-success"
                      to={`/admin/product/update/${product._id}`}
                    >
                      <span className="">Update</span>
                    </Link>
                  </div>
                  <div className="col-4">
                    <button
                      onClick={() => {
                        deleteThisProduct(product._id);
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
