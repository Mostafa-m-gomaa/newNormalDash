import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditAnalytic() {
  const { route, token, setOnload } = useContext(AppContext);
  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);

  const [type, setType] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const id = useParams().id;
  //   Get all  Courses
  useEffect(() => {
    fetch(`${route}/analytic/posts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())

      .then((data) => {
        setContent(data.data.content);
        setType(data.data.sharedTo);
      })
      .catch((err) => console.log(err));
  }, [route, token, id]);
  const handelSubmit = function (e) {
    setOnload(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    formData.append("sharedTo", type);

    fetch(`${route}/analytic/posts/${id}`, {
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
        } else {
          nav("/all-analytic");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  return (
    <div className="main-sec">
      <h2>Create Analytic </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Contect :*</label>
          <input
            placeholder="Name"
            type="text"
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Image:</label>
          <input type="file" onChange={(e) => handleImageChange(e)} />
        </div>
        <div className="input-group">
          <label>Shared to :</label>
          <select
            value={type}
            required
            onChange={(e) => setType(e.target.value)}
          >
            <option value="home">home</option>
            <option value="analytic">analytic </option>
            <option value="weeklyWithdraw">weeklyWithdraw</option>
          </select>
        </div>
        {err && <p className="error">{err}</p>}
        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default EditAnalytic;
