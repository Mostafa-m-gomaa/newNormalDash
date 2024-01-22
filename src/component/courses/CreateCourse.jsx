import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";


// JSON.stringify({
//   title: title,
//   description: desc,
//   price: price,
//   priceAfterDiscount: priceAfter,
//   renewPrice: renewPrice,
//   expirationTime: expirationTime,
//   category: selectedCate,
//   telegramChannelNames:
//     chaneslValue.length === telegramChannels.length
//       ? ["*"]
//       : chaneslValue,
// })

function CreateCourse() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [selectedCate, setSelectedCate] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const [cates, setCates] = useState([]);
  const [expirationTime, setExpirationTime] = useState("");
  const [renewPrice, setRenewPrice] = useState("");
  const [telegramChannels, setTelegramChannels] = useState([]);
  const [image, setImage] = useState(null);
  //   Get all  Categoires

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    fetch(`${route}/education/packages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCates(data.data));
    fetch(`${route}/telegramChannel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTelegramChannels(data.data));
  }, []);

  const handelSubmit = function (e) {
    e.preventDefault();
    setOnload(true);

    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", desc);
    formData.append("package", selectedCate);
    formData.append("image", image);
    fetch(`${route}/education/courses`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData ,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-courses");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Create Course </h2>
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
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} name="" id="" />
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
        {/* <div className="input-group">
          <label>Price :*</label>
          <input
            placeholder="Price"
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      */}
  
        {/* <div className="input-group">
          <label>Telegram chanel names :</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {telegramChannels?.map((channel) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  id={channel.id}
                  value={channel.title}
                  name="chanal"
                />
                <label htmlFor={channel.id}>{channel.title}</label>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input type="checkbox" id="all" value="all" name="chanal" />
              <label htmlFor="all">all</label>
            </div>
          </div>
        </div> */}
        <div className="input-group">
          <label>package :</label>
          <select required onChange={(e) => setSelectedCate(e.target.value)}>
            <option value="" disabled selected></option>

            {cates.map((cate) => (
              <option value={cate._id}>{cate.title}</option>
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

export default CreateCourse;
