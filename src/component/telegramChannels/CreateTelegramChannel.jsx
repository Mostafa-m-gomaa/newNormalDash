import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function CreateTelegramChannel() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const handelSubmit = function (e) {
    e.preventDefault();
    setOnload(true);

    fetch(`${route}telegramChannel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/telegramChannels");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOnload(false);
      });
  };
  return (
    <div className="main-sec">
      <h2>Create Telegram Channel</h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>title :*</label>
          <input
            placeholder="title"
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
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

export default CreateTelegramChannel;
