import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "./values";

function EditBroker() {
  const { setOnload, route, token } = useContext(AppContext);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [videoLinks, setVideoLinks] = useState([]);
  const [currentVideoLink, setCurrentVideoLink] = useState("");
  const [country, setCountry] = useState("");
  const nav = useNavigate();
  const id = useParams().id;
  const [marketers, setMarketers] = useState([]);
  const [marketer, setMarketer] = useState("");
  useEffect(() => {
    fetch(`${route}/users/getMarketers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setMarketers(data.data);
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${route}/broker/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCountry(data.data.country);
        setTitle(data.data.title);
        setLink(data.data.link);
        setVideoLinks(data.data.videoLinks);
        setMarketer(data.data.marketer._id);
      })
      .catch((err) => console.log(err));
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    setOnload(true);

    fetch(`${route}/broker/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country, title, link, videoLinks, marketer }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-brokers");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Edit User</h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :*</label>
          <input
            placeholder="Title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Links :*</label>
          <input
            placeholder="www.youtube.com"
            type="text"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Vidoes link :*</label>
          <ul style={{ listStyle: "none", width: "fit-content" }}>
            {videoLinks?.map((item, ind) => (
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "space-between",
                  margin: "10px 0",
                }}
              >
                <span>
                  {ind + 1} - {item}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setVideoLinks((prev) =>
                      prev.filter((link) => link !== item)
                    );
                  }}
                  style={{
                    margin: "0 10px",
                    padding: "10px 20px",
                    border: "none",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
          <p style={{ margin: "0 10px" }}>add one then click next</p>
          <input
            placeholder="www.youtube.com"
            type="text"
            value={currentVideoLink}
            onChange={(e) => setCurrentVideoLink(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              setVideoLinks((prev) => [...prev, currentVideoLink]);
              setCurrentVideoLink("");
            }}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              border: "none",
              backgroundColor: "green",
              color: "white",
            }}
          >
            next
          </button>
        </div>

        <div className="input-group">
          <label>Country : </label>
          <select
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" disabled selected>
              Country
            </option>
            {data?.map((item) => (
              <option value={item.value}>{item.value}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Marketer : </label>
          <select
            value={marketer}
            onChange={(e) => setMarketer(e.target.value)}
          >
            <option value="" disabled selected>
              Marketer
            </option>
            {marketers?.map((item) => (
              <option value={item._id}>
                {item.email} - {item?.telegram?.telegramUserName}
              </option>
            ))}
          </select>
        </div>
        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditBroker;
