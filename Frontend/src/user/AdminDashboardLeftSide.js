import React from "react";
import { Link } from "react-router-dom";

function AdminDashboardLeftSide() {
  return (
    <div className="card">
      <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item bg-light">
          <Link
            to="/admin/create/category"
            className="nav-link text-success text-center"
            style={{ fontSize: "1.2rem" }}
          >
            Create Categories
          </Link>
        </li>

        <li className="list-group-item bg-light">
          <Link
            to="/admin/categories"
            className="nav-link text-success text-center"
            style={{ fontSize: "1.2rem" }}
          >
            Manage Categories
          </Link>
        </li>

        <li className="list-group-item bg-light">
          <Link
            to="/admin/create/product"
            className="nav-link text-success text-center"
            style={{ fontSize: "1.2rem" }}
          >
            Create Product
          </Link>
        </li>

        <li className="list-group-item bg-light">
          <Link
            to="/admin/products"
            className="nav-link text-success text-center"
            style={{ fontSize: "1.2rem" }}
          >
            Manage Product
          </Link>
        </li>

        <li className="list-group-item bg-light">
          <Link
            to="/admin/orders"
            className="nav-link text-success text-center"
            style={{ fontSize: "1.2rem" }}
          >
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboardLeftSide;
