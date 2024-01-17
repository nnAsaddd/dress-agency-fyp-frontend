import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, redirect, Link, useNavigation } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const accessToken = localStorage.getItem("accessToken");
  try {
    await axios.post(
      "http://localhost:5000/api/v1/products",
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Product Created Successfully");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CreateProduct = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="create-product">
      <div className="wrapper">
        <h1>Create Product</h1>
        <Link to="..">
          <h4>Go back to Products</h4>
        </Link>
        <div className="wrapper create-product-wrapper">
          <Form method="post" className="create-product-form">
            <h3>Create Product</h3>
            <div className="sku-container">
              <label htmlFor="sku">SKU</label>
              <input type="number" name="sku" id="sku" required />
            </div>
            <div className="name-container">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div className="type-container">
              <label htmlFor="type">Type</label>
              <input type="text" name="type" id="type" required />
            </div>
            <div className="color-container">
              <label htmlFor="color">Color</label>
              <input type="text" name="color" id="color" required />
            </div>
            <div className="size-container">
              <label htmlFor="size">Size</label>
              <input type="text" name="size" id="size" required />
            </div>
            <div className="price-container">
              <label htmlFor="price">Price</label>
              <input type="number" name="price" id="price" min={0} required />
            </div>
            <div className="supplier-name-container">
              <label htmlFor="supplierName">Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                id="supplierName"
                required
              />
            </div>
            <div className="supplier-contact-container">
              <label htmlFor="contact">Contact (Phone No)</label>
              <input type="text" name="contact" id="contact" required />
            </div>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
