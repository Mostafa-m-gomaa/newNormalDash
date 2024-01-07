import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditStoreSubCate() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const [mainCates, setMainCates] = useState([]);
  const [selected, setSelected] = useState("");
  const nav = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    setOnload(true);

    fetch(`${route}/store/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMainCates(data.data);
        console.log(data.data);
        setOnload(false);
      });
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    const data = {};
    if (title) {
      data.title = title;
    }
    if (selected) {
      data.category = selected;
    }
    setOnload(true);

    fetch(`${route}/store/subCategories/${id}`, {
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
          nav("/all-store-subcategories");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Edit SubCategory </h2>
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
          <label>Main Category :*</label>
          <select
            style={{ padding: "10px", border: "solid 1px #ccc " }}
            onChange={(e) => setSelected(e.target.value)}
            required
          >
            <option value="" selected disabled style={{ padding: "20px" }}>
              category
            </option>
            {mainCates.map((course) => (
              <option value={course._id} style={{ padding: "5px" }}>
                {course.title}
              </option>
            ))}
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

export default EditStoreSubCate;
