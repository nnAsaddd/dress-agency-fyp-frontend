import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = async () => {
    localStorage.clear();
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/auth/logout",
        {
          withCredentials: true,
        }
      );
      toast.success("User Logged out Successfully!!!");
      navigate("/login");
      return response.data;
    } catch (error) {
      navigate("/login");
      toast.error(error?.response?.data?.message);
      return error?.response?.data?.msg;
    }
  };

  return (
    <nav className="navbar">
      <div className="wrapper navbar-wrapper">
        <div className="navbar-logo">
          <h1>
            <span>Inventory</span>
            <span>Manager</span>
          </h1>
        </div>
        {accessToken && (
          <div className="links">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
