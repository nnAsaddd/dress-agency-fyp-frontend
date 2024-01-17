import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, redirect, Link, useNavigation } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const newData = { ...data, role: data.role ? "admin" : "employee" };

  const accessToken = localStorage.getItem("accessToken");
  try {
    await axios.post(
      "http://localhost:5000/api/v1/auth/register",
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
    toast.success("User Created Successfully");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CreateUser = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="create-user">
      <div className="wrapper">
        <h1>Create User</h1>
        <Link to="..">
          <h4>Go back to Products</h4>
        </Link>

        <div className="wrapper create-product-wrapper">
          <Form method="post" className="create-product-form">
            <h3>Create User</h3>
            <div className="name-container">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div className="email-container">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" required />
            </div>
            <div className="role-container">
              <label htmlFor="role">Admin</label>
              <input type="checkbox" name="role" id="role" />
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

export default CreateUser;
