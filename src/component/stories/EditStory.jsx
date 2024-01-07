import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditStory() {
  const { setOnload, route, token } = useContext(AppContext);
  const [videoLink, setVideoLink] = useState("");
  const [err, setErr] = useState("");
  const [image, setImage] = useState(null);
  const nav = useNavigate();
  const id = useParams().id;
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const handelSubmit = function (e) {
    e.preventDefault();
    const formData = new FormData();

    if (videoLink) {
      formData.append("video", videoLink);
    }
    if (image) {
      formData.append("image", image, image.name);
    }

    setOnload(true);
    fetch(`${route}/stories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-stories");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Edit Story </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>VideoLink :*</label>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setVideoLink(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Image:</label>
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

export default EditStory;
