import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePackage() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const [err, setErr] = useState("");
  const [cousrses, setCourses] = useState([]);
  const nav = useNavigate();
  const id = useParams().id;
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [telegramChannels, setTelegramChannels] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [data, setdata] = useState({});
  const [mainChannels, setMainChannels] = useState([]);

  useEffect(() => {
    fetch(`${route}/telegramChannel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMainChannels(data.data));
    fetch(`${route}/education/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.data));
    fetch(`${route}/education/packages/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.description) {
          setdata(data.data);
          setSelectedCourses(data.data.courses?.map((e) => e._id));
          setTelegramChannels(data.data.telegramChannelNames);
          setDescription(data.data.description);
        }
      });
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    const data = new FormData();
    const checkBoxVale = [];
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"][name="course"]:checked'
    );
    Array.from(checkboxes).map(function (checkbox) {
      return checkBoxVale.push(checkbox.value);
    });

    setOnload(true);
    if (checkBoxVale.length != 0) {
      data.append("courses", checkBoxVale);
    }

    if (title) {
      data.append("title", title);
    }
    if (description) {
      data.append("description", description);
    }
    if (price) {
      data.append("price", price);
    }
    if (priceAfterDiscount) {
      data.append("priceAfterDiscount", priceAfterDiscount);
    }
    if (image) {
      data.append("image", image);
    }

    fetch(`${route}/education/packages/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-packages");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
    setOnload(false);
  };
  const checkBoxOnChange = (e, key) => {
    console.log(telegramChannels);
    if (key === "telegram") {
      if (e.target.checked) {
        setTelegramChannels((prev) => [...prev, e.target.value]);
      } else {
        setTelegramChannels((prev) =>
          prev?.filter((value) => value !== e.target.value)
        );
      }
    } else {
      if (e.target.checked) {
        setSelectedCourses((prev) => [...prev, e.target.value]);
      } else {
        setSelectedCourses((prev) =>
          prev.filter((value) => value !== e.target.value)
        );
      }
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
      <h2>Edit Package </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            type="text"
            placeholder={data?.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price :</label>
          <input
            type="number"
            placeholder={data?.price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price After Discount :*</label>
          <input
            placeholder={data.priceAfterDiscount}
            type="number"
            max={price}
            required={price}
            onChange={(e) => setPriceAfterDiscount(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Image :</label>
          <input type="file" onChange={handleImageChange} />
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
                  checked={selectedCourses?.includes(course._id)}
                  value={course._id}
                  onChange={(e) => {
                    checkBoxOnChange(e);
                  }}
                  name="course"
                />
                <label htmlFor={course._id}>{course.title}</label>
              </div>
            ))}
          </div>
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default UpdatePackage;
