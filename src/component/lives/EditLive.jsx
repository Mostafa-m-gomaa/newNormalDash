import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditLive() {
  const { setOnload, route, token } = useContext(AppContext);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [dateString, setDateString] = useState("");

  const [hour, setHour] = useState("");
  const [dur, setDur] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [err, setErr] = useState("");
  const [cousrses, setCourses] = useState([]);
  const nav = useNavigate();
  const id = useParams();
  const [data, setdata] = useState([]);
  const [ourLive, setOurLive] = useState({});
  const [instractors, setInstractors] = useState([]);
  const [creator, setCreator] = useState("");
  useEffect(() => {
    fetch(`${route}/users/instractors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInstractors(data.data);
      });
    fetch(`${route}/education/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.data));
    fetch(`${route}/education/lives`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data.data);
      });
  }, []);
  useEffect(() => {
    setOurLive(data?.filter((e) => e._id === id.id)[0]);
  }, [data]);
  const handelSubmit = function (e) {
    const date = new Date(dateString);
    e.preventDefault();
    const data = { link: link };
    if (title) {
      data.title = title;
    }
    if (selectedCourse) {
      data.course = selectedCourse;
    }
    if (date) {
      data.date = String(date);
    }
    if (hour) {
      data.hour = hour;
    }
    if (dur) {
      data.duration = dur;
    }
    if (creator) {
      data.creator = creator;
    }
    setOnload(true);
    fetch(`${route}/education/lives/${id.id}`, {
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
          nav("/all-lives");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Edit Live </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Live Link :*</label>
          <input
            placeholder={ourLive?.link}
            type="text"
            required
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Title :*</label>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Day :*</label>
          <input
            placeholder="Day"
            type="date"
            max="31"
            onChange={(e) => {
              setDateString(e.target.value);
            }}
          />
        </div>

        <div className="input-group">
          <label>Hour :*</label>
          <input
            placeholder="Hour"
            type="time"
            pattern="^(1[0-2]|[1-9])(am|pm)$"
            onChange={(e) => setHour(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Duration :*</label>
          <input
            placeholder="Duration"
            type="number"
            onChange={(e) => setDur(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Course :*</label>
          <select onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="" disabled selected></option>

            {cousrses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Creator :*</label>
          <select onChange={(e) => setCreator(e.target.value)}>
            <option value="" disabled selected></option>
            {instractors?.map((user) => (
              <option key={user._id} value={user._id}>
                {user?.name}
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

export default EditLive;
