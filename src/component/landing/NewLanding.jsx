import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import UploadWidget from "./UploadComponent";

function NewLanding() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState({});
  const nav = useNavigate();
  useEffect(() => {
    fetch(`${route}/landingPage`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data.data));
  }, []);

  const handelSubmit = function (e) {
    e.preventDefault();

    setOnload(true);
    fetch(`${route}/landingPage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title, videoUrl: url }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-landing");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }

  return (
    <div className="main-sec">
      <h2>Create Landing Page </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            placeholder={data?.title}
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Video Link :</label>
          <UploadWidget onUpload={handleOnUpload}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button
                  style={{ width: "33%", padding: "20px", margin: "10px" }}
                  onClick={handleOnClick}
                >
                  Upload an Video
                </button>
              );
            }}
          </UploadWidget>
          <input placeholder={data?.title} type="text" required value={url} />
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewLanding;
