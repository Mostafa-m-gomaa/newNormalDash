import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function CreateLive() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [dat, setDat] = useState("");
  const [hour, setHour] = useState("");
  const [dur, setDur] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [err, setErr] = useState("");
  const [cousrses, setCourses] = useState([]);
  const [instractors, setInstractors] = useState([]);
  const [creator, setCreator] = useState("");

  const [dateString, setDateString] = useState("");

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
  }, []);

  const handelSubmit = function (e) {
    e.preventDefault();
    const date = new Date(dateString);

    setOnload(true);
    fetch(`${route}/education/lives`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        course: selectedCourse,
        date: String(date),
        hour: hour,
        duration: dur,
        creator: creator,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
      <h2>Create Live </h2>
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
          <label>Day :*</label>
          <input
            placeholder="Day"
            type="date"
            max="31"
            required
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
            required
            onChange={(e) => setHour(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Duration :*</label>
          <input
            placeholder="Duration"
            type="number"
            required
            onChange={(e) => setDur(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Course :*</label>
          <select required onChange={(e) => setSelectedCourse(e.target.value)}>
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
          <select required onChange={(e) => setCreator(e.target.value)}>
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
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateLive;
