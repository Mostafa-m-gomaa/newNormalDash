import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function RemoveUserToPackage() {
  const { setOnload, route, token } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    setOnload(true);

    fetch(`${route}/education/packages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackages(data.data);
        setOnload(false);
      });
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();

    setOnload(true);

    fetch(`${route}/education/packages/removeUserFromPlan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userEmail: email,
        planId: selected,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.msg) {
          setErr(data?.msg);
        }
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-users");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>remove user from package</h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>User email :*</label>
          <input
            placeholder="example@gmail.com"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Package :*</label>
          <select
            style={{ padding: "10px", border: "solid 1px #ccc " }}
            onChange={(e) => setSelected(e.target.value)}
            required
          >
            <option value="" selected disabled style={{ padding: "20px" }}>
              Package
            </option>
            {packages.map((packagee) => (
              <option value={packagee._id} style={{ padding: "5px" }}>
                {packagee.title}
              </option>
            ))}
          </select>
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          add
        </button>
      </form>
    </div>
  );
}

export default RemoveUserToPackage;
