import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AppContext } from "../../App";
import toast from "react-hot-toast";
import axios from "axios";

const PurchaeWithUser = () => {
  const [amount, setAmount] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { route, setOnload, setShowSuccess, setShowError } =
    useContext(AppContext);
  const token = localStorage.getItem("token");
  const onSubmit = function (e) {
    e.preventDefault();
    setOnload(true);
    axios
      .put(
        `${route}/marketing/calculateProfitsManual`,
        { amount: +amount, userEmail },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.msg) {
          toast.success(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      })
      .finally(() => setOnload(false));
  };
  return (
    <div className="main-sec">
      <h1 style={{ textAlign: "center" }}>Purchae With User</h1>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="input-group">
          <label>amount :*</label>
          <input
            placeholder="amount"
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Email :*</label>
          <input
            placeholder="Email"
            type="text"
            required
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default PurchaeWithUser;
