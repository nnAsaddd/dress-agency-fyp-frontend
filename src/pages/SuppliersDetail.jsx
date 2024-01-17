import React from "react";
import axios from "axios";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useProductsContext } from "../context/ProductsProvider";

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
    return error?.response?.data?.msg;
  }
};

const SuppliersDetail = () => {
  const { handleProduct } = useProductsContext();
  const { products } = useLoaderData();
  const { id } = useParams();
  const filteredProducts = products.filter((product) => {
    return product.supplier._id === id && !product.paid;
  });

  return (
    <div className="suppliers-detail">
      <div className="wrapper">
        <h1>Suppliers Detail</h1>
        <Link to=".." relative="path">
          <h4>Go back to Suppliers</h4>
        </Link>
        {filteredProducts.length > 0 ? (
          <div className="suppliers-detail-container">
            {filteredProducts.map((product) => {
              const { _id, sku, name, color, price, type, supplier } = product;
              return (
                <div key={_id} className="supplier-details-product">
                  <p>
                    <strong>SKU:</strong> {sku}
                  </p>
                  <p>
                    <strong>Name:</strong> {name}
                  </p>
                  <p>
                    <strong>Price:</strong> {price}
                  </p>
                  <p>
                    <strong>Color:</strong> {color}
                  </p>
                  <p>
                    <strong>Type:</strong> {type}
                  </p>
                  <p>
                    <strong>Supplier:</strong> {supplier.name}
                  </p>
                  <Link
                    to={`/suppliers/${supplier._id}/paynow`}
                    onClick={() => handleProduct({ _id, sku })}
                  >
                    <button className="btn paynow-btn">Pay Now</button>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>Sorry, there are no products with pending payments</h1>
        )}
      </div>
    </div>
  );
};

export default SuppliersDetail;

{
  /* <tr key={_id} className={`product ${paid && "row-grey"}`}>
    <td datatype="sku">{sku}</td>
    <td datatype="name">{name}</td>
    <td datatype="price">{price}</td>
    <td datatype="type">{type}</td>
    <td datatype="size">{size}</td>
    <td datatype="color">{color}</td>
    <td datatype="supplier">{supplierName}</td>
  </tr>
  <Link to={`/suppliers/${_id}/paynow`}>
    <button className="btn">Pay Now</button>
  </Link> */
}
