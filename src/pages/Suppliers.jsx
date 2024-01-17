import React from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/supplier`,
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
    return error?.response?.data?.msg;
  }
};

const Suppliers = () => {
  const { suppliers } = useLoaderData();

  return (
    <div className="suppliers">
      <div className="wrapper">
        <h1>Suppliers</h1>
        <Link to="..">
          <h4>Go back to Products</h4>
        </Link>
        <div className="suppliers-container">
          {suppliers.map((supplier) => {
            const { _id, contact, name } = supplier;
            return (
              <Link to={`/suppliers/${_id}`} key={_id}>
                <div className="supplier">
                  <h3>{name}</h3>
                  <h4>{contact}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
