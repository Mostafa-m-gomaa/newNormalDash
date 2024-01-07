import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function AddMessage() {
  const { setOnload, route, token } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const id = useParams();

  const handelSubmit = function (e) {
    e.preventDefault();

    setOnload(true);
    fetch(`${route}/education/lives/sendEmailsToFollowers/${id.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-lives");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Send Message to live followers </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Message :</label>
          <input
            type="text"
            required
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default AddMessage;
