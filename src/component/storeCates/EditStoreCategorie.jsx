import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditStoreCategorie() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const [image, setImage] = useState(null);
  const nav = useNavigate();
  const id = useParams().id;
  const [data, setData] = useState({});
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  useEffect(() => {
    fetch(`${route}/store/categories/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    setOnload(true);
    const formData = new FormData();
    if (title) {
      formData.append("title", title);
    }
    if (image) {
      formData.append("image", image, image.name);
    }

    fetch(`${route}/store/categories/${id}`, {
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
          nav("/all-store-categories");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Edit Category </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :*</label>
          <input
            placeholder={data?.title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Image :</label>
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

export default EditStoreCategorie;
