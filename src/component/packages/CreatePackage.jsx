import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function CreatePackage() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [err, setErr] = useState("");
  const [cousrses, setCourses] = useState([]);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    fetch(`${route}/education/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.data));
  }, []);

  const handelSubmit = function (e) {
    e.preventDefault();
    const checkBoxVale = [];
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="course"]:checked'
    );
    Array.from(checkboxes).map(function (checkbox) {
      return checkBoxVale.push(checkbox.value);
    });

    setOnload(true);
    const data = new FormData();
    data.append("image", image);
    data.append("price", price);
    data.append("priceAfterDiscount", priceAfterDiscount);
    data.append("description", description);
    data.append("title", title);
    data.append("courses", checkBoxVale);

    if (checkBoxVale.length != 0) {
      fetch(`${route}/education/packages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.errors) {
            setErr(data.errors[0].msg);
          }
          if (data.data) {
            nav("/all-packages");
          }
          setOnload(false);
        })
        .catch((err) => console.log(err));
    } else {
      setOnload(false);
      setErr("You Must Chose Course");
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
      event.target.value = "";
    }
  };
  return (
    <div className="main-sec">
      <h2>Create Package </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            type="text"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <textarea
            type="text"
            placeholder="Description"
            required
            onChange={(e) => {
              console.log(e.target.value);
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label>Price :</label>
          <input
            type="number"
            required
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price After Discount :*</label>
          <input
            placeholder="Price After Discount"
            type="number"
            max={price}
            onChange={(e) => setPriceAfterDiscount(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Image :</label>

          <input type="file" onChange={handleImageChange} required />
        </div>

        <div className="input-group">
          <label>Course :</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {cousrses?.map((course) => (
              <div
                key={course._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  id={course._id}
                  value={course._id}
                  name="course"
                />
                <label htmlFor={course._id}>{course.title}</label>
              </div>
            ))}
          </div>
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreatePackage;
