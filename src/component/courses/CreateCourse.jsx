import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

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

  //   Get all  Categoires

  useEffect(() => {
    fetch(`${route}/education/categories`, {
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
    const chaneslValue = [];
    const chaleslArray = document.querySelectorAll(
      'input[type="checkbox"][name="chanal"]:checked'
    );
    Array.from(chaleslArray).map(function (checkbox) {
      return chaneslValue.push(checkbox.value);
    });
    fetch(`${route}/education/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: desc,
        price: price,
        priceAfterDiscount: priceAfter,
        renewPrice: renewPrice,
        expirationTime: expirationTime,
        category: selectedCate,
        telegramChannelNames:
          chaneslValue.length === telegramChannels.length
            ? ["*"]
            : chaneslValue,
      }),
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
          <label>Description :*</label>
          <input
            placeholder="Description"
            type="text"
            required
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price :*</label>
          <input
            placeholder="Price"
            type="number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price After Discount :*</label>
          <input
            placeholder="Price After Discount"
            type="number"
            required
            max={price}
            onChange={(e) => setPriceAfter(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>ExpirationTime :</label>
          <input
            type="number"
            required
            placeholder="number of day"
            onChange={(e) => setExpirationTime(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Renew price :</label>
          <input
            type="number"
            required
            placeholder="renew price"
            onChange={(e) => setRenewPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
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
        </div>
        <div className="input-group">
          <label>Category :</label>
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
