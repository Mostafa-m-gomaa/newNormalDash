import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function AllStoreOrders() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    setOnload(true);
    fetch(
      `${route}/store/orders?page=${currentPage}${
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
        setPagesNumber(data.paginationResult.numberOfPages);
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
          setPagesNumber(1);
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
      <h2>All Store Orders</h2>
      <table>
        <thead>
          <tr>
            <td style={{ whiteSpace: "nowrap" }}>is Paid</td>
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
      <h2>we have {pagesNumber} pages</h2>
      <div className="pagination">
        <div
          className={`paginationBtn ${currentPage >= 2 ? "" : "off"}`}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          previous
        </div>

        <div>{currentPage}</div>

        <div
          className={`paginationBtn ${pagesNumber > currentPage ? "" : "off"}`}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          next
        </div>
      </div>
    </div>
  );
}

export default AllStoreOrders;
