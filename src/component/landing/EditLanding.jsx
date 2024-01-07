import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import UploadWidget from "./UploadComponent";

function EditLanding() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState({});
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const nav = useNavigate();
  const id = useParams().id;
  useEffect(() => {
    fetch(`${route}/landingPage/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data.data));
  }, []);

  const handelSubmit = function (e) {
    e.preventDefault();
    const data = {};
    if (title) {
      data.title = title;
    }
    if (url) {
      data.videoUrl = url;
    }
    setOnload(true);
    fetch(`${route}/landingPage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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
  function handleOnUpload(error, result, widget) {
    console.log(error);
    console.log(result);
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
      <h2>Edit Landing Page </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            placeholder={data?.title}
            type="text"
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
          <input placeholder={data?.videoUrl} type="text" value={url} />
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditLanding;
