import React from "react";
import { FaPlus } from "react-icons/fa";
import { DisplayAllProducts, Form, Filters } from "../components";
import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";

export const loader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/products`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error?.response?.data?.message;
  }
};

const AllProducts = () => {
  const userRole = localStorage.getItem("userRole");
  const { products } = useLoaderData();

  return (
    <div className="products">
      <div className="products-sub-container">
        <h1>All Products</h1>
        <div className="plus-icon-container">
          <button>
            {userRole === "admin" && (
              <Link to="/createProduct" className=" btn create-btn">
                <span>Add new Product</span>
                <FaPlus className="plus-icon" />
              </Link>
            )}
            {userRole === "admin" && (
              <Link to="/createUser" className="btn create-user-btn">
                <span>Create User</span>
                <FaPlus className="plus-icon" />
              </Link>
            )}
            {userRole === "admin" && (
              <Link to="/suppliers" className=" btn paySupplier-btn">
                <span>Pay Supplier</span>
              </Link>
            )}
            {userRole === "admin" && (
              <Link to="/report" className=" btn report-btn">
                <span>Report</span>
              </Link>
            )}
          </button>
        </div>
        <Form />
        <Filters />
        <DisplayAllProducts products={products} />
      </div>
    </div>
  );
};

export default AllProducts;
