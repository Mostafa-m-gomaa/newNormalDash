import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditAdd() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [err, setErr] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const nav = useNavigate();
  const id = useParams().id;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImg(file);
    } else {
      setProfileImg(null);
    }
  };
  const handelSubmit = function (e) {
    e.preventDefault();
    const formData = new FormData();
    if (title) {
      formData.append("title", title);
    }
    if (profileImg) {
      formData.append("image", profileImg, profileImg.name);
    }
    if (desc) {
      formData.append("description", desc);
    }
    if (link) {
      formData.append("link", link);
    }

    setOnload(true);
    fetch(`${route}/advertisements/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-advertisements");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Create Advertisements </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <input
            placeholder="Description"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Link :*</label>
          <input
            placeholder="Link"
            type="text"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label> Image :</label>
          <input type="file" onChange={handleImageChange} name="" id="" />
        </div>
        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditAdd;
