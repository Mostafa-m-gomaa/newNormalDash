import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function CreateCoupon({ type }) {
  const { setOnload, route, token } = useContext(AppContext);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [discount, setDiscount] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handelSubmit = function (e) {
    e.preventDefault();

    setOnload(true);
    fetch(`${route}/${type}/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        expire: date,
        discount: discount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          if (type === "store") {
            nav("/all-store-coupons");
          } else {
            nav("/all-education-coupons");
          }
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Create {type} Coupon </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Name :*</label>
          <input
            placeholder="Name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Exprire date:*</label>
          <input
            placeholder="Name"
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Discount :*</label>
          <input
            placeholder="10%"
            type="number"
            required
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateCoupon;
