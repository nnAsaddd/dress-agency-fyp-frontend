import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Report = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [payments, setPayments] = useState([]);

  const handleSubmit = async () => {
    if (!startDate || !endDate) return;

    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/payment",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Request Successful");
      setPayments(data.payments);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };
  const startD = new Date(startDate);
  const endD = new Date(endDate);

  const filteredPayments =
    payments.length > 0 &&
    payments.filter((payment) => {
      const date = new Date(payment.date);
      return date >= startD && date <= endD;
    });

  return (
    <div className="report">
      <div className="wrapper">
        <h1>Reports</h1>
        <Link to="..">
          <h4>Go back to Products</h4>
        </Link>

        <div className="wrapper report-wrapper">
          <form onSubmit={(e) => e.preventDefault()} className="report-form">
            <h3>Report</h3>
            <div className="start-date-container">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="end-date-container">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn">
              Get Reports
            </button>
          </form>
        </div>
        {/* Displaying Data */}
        {payments.length > 0 ? (
          <div className="payments-display-container">
            <table>
              <caption>{filteredPayments.length} payment records found</caption>
              <tbody>
                <tr>
                  <th>Product</th>
                  <th>Supplier</th>
                  <th>Contact</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
                {filteredPayments.map((payment) => {
                  const { _id, amount, date, product, supplier } = payment;
                  return (
                    <tr key={_id} className={`product `}>
                      <td datatype="product">{product.name}</td>
                      <td datatype="supplier">{supplier.name}</td>
                      <td datatype="contact">{supplier.contact}</td>
                      <td datatype="amount">{amount}</td>
                      <td datatype="price">{product.price}</td>
                      <td datatype="date">{date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="msg-h1">Sorry, there are currently no payments</h1>
        )}
      </div>
    </div>
  );
};

export default Report;
