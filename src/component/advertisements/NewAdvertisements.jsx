import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function NewAdvertisements() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");
  const [err, setErr] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const nav = useNavigate();

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

    formData.append("title", title);
    formData.append("image", profileImg, profileImg.name);
    formData.append("description", desc);
    formData.append("link", link);

    setOnload(true);
    fetch(`${route}/advertisements`, {
      method: "POST",
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
          <label>Title :*</label>
          <input
            placeholder="Name"
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :*</label>
          <input
            placeholder="Description"
            type="text"
            required
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Link :*</label>
          <input
            placeholder="Link"
            type="text"
            required
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label> Image :</label>
          <input
            type="file"
            onChange={handleImageChange}
            required
            name=""
            id=""
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

export default NewAdvertisements;
