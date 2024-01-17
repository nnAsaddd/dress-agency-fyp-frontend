import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { useProductsContext } from "../context/ProductsProvider";

export const action = async ({ request, params }) => {
  const { id: supplierId } = params;

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const newData = { ...data, supplierId };
  const accessToken = localStorage.getItem("accessToken");
  try {
    await axios.post(
      "http://localhost:5000/api/v1/payment",
      newData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Payment completed Successfully");
    return redirect("/");
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const Paynow = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { product } = useProductsContext();
  const { sku } = product;

  return (
    <div className="paynow">
      <div className="wrapper">
        <h1>Paynow</h1>
        <Link to="/suppliers">
          <h4>Go back to Suppliers</h4>
        </Link>
        <div className="wrapper paynow-wrapper">
          <Form method="post" className="paynow-form">
            <h3>Paynow</h3>
            <div className="amount-container">
              <label htmlFor="amount">Amount</label>
              <input type="number" name="amount" id="amount" required />
            </div>
            <div className="date-container">
              <label htmlFor="date">Date</label>
              <input type="date" name="date" id="date" required />
            </div>
            <div className="sku-container">
              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                name="sku"
                id="sku"
                value={sku}
                readOnly
                required
              />
            </div>
            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Confirm Payment"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Paynow;
