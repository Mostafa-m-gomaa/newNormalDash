import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function CreateLesson() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [vid, setVid] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [type, setType] = useState("recorded");
  const [err, setErr] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [cousrses, setCourses] = useState([]);
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
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImg(file);
    } else {
      setProfileImg(null);
    }
  };
  const handelSubmit = function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", profileImg, profileImg.name);
    formData.append("course", selectedCourse);
    formData.append("type", type);
    formData.append("videoUrl", vid);

    setOnload(true);
    fetch(`${route}/education/lessons`, {
      method: "POST",
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
        if (data.success) {
          nav("/all-lessons");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main-sec">
      <h2>Create Lesson </h2>
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
          <label>Video Link :*</label>
          <input
            placeholder="Video Link "
            type="text"
            required
            onChange={(e) => setVid(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Course :*</label>
          <select required onChange={(e) => setSelectedCourse(e.target.value)}>
            <option selected disabled value="">
              Course
            </option>
            {cousrses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Type :*</label>
          <select required onChange={(e) => setType(e.target.value)}>
            <option value="recorded" selected>
              recorded
            </option>
            <option value="live">live</option>
          </select>
        </div>

        <div className="input-group">
          <label>Image :</label>
          <input
            type="file"
            required
            onChange={handleImageChange}
            name=""
            id=""
          />
        </div>

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateLesson;
