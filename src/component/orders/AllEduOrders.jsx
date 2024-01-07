import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function AllEduOrders() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const [coupon, setCoupon] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    setOnload(true);
    fetch(
      `${route}/education/orders?limit=10000${
        search ? `&coupon=${search}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
      })
      .finally(() => {
        setOnload(false);
      });
  }, [search]);

  return (
    <div className="main-sec">
      <form
        style={{ display: "flex" }}
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(coupon);
        }}
      >
        <input
          type="text"
          style={{ width: "70%", padding: "10px", margin: "30px 0" }}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="coupon"
        />
        <input
          type="submit"
          style={{
            width: "30%",
            padding: "10px",
            margin: "30px 0",
            backgroundColor: "green",
            border: "none",
            color: "white",
          }}
          value="search"
          className="btn btn-primary"
        />
      </form>
      <h2>All Education Orders</h2>
      <table>
        <thead>
          <tr>
            <td style={{ whiteSpace: "nowrap" }}>is Paid</td>
            <td style={{ whiteSpace: "nowrap" }}>Paid at</td>
            <td style={{ whiteSpace: "nowrap" }}>Payment Method Type</td>
            <td style={{ whiteSpace: "nowrap" }}>Total Order Price</td>
            <td style={{ whiteSpace: "nowrap" }}>Tax Price</td>
            <td style={{ whiteSpace: "nowrap" }}>User Email</td>
            <td style={{ whiteSpace: "nowrap" }}>User Name</td>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>
                {order.isPaid ? "yes" : "no"}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                {new Date(order.paidAt).toLocaleDateString()}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                {order.paymentMethodType}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>{order.totalOrderPrice}$</td>
              <td style={{ whiteSpace: "nowrap" }}>{order.taxPrice}$</td>
              <td style={{ whiteSpace: "nowrap" }}>{order.user?.email}</td>
              <td style={{ whiteSpace: "nowrap" }}>{order.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllEduOrders;
