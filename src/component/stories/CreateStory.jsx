import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function CreateStory() {
  const { setOnload, route, token } = useContext(AppContext);
  const [videoLink, setVideoLink] = useState("");
  const [err, setErr] = useState("");
  const [image, setImage] = useState(null);
  const nav = useNavigate();

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

    formData.append("video", videoLink);
    formData.append("image", image, image.name);

    setOnload(true);
    fetch(`${route}/stories`, {
      method: "POST",
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
      <h2>Create Story </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>VideoLink :*</label>
          <input
            placeholder="Name"
            type="text"
            required
            onChange={(e) => setVideoLink(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Image:</label>
          <input
            type="file"
            required
            onChange={handleImageChange}
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

export default CreateStory;

// onChange={(e) => {
//   // const file = e.target.files[0];
//   // if (file && file.type.startsWith("image/")) {
//   //   setProfileImg(file);
//   // } else {
//   //   setProfileImg(null);
//   // }
//   setProfileImg(e.target.value)
// }}
