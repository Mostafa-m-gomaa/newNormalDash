import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "./values";

function EditUser() {
  const { setOnload, route, token } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [err, setErr] = useState("");
  const [about, setAbout] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const nav = useNavigate();
  const id = useParams().id;
  const [userData, setUserData] = useState({});
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImg(file);
    } else {
      setProfileImg(null);
    }
  };
  useEffect(() => {
    fetch(`${route}/users/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    setOnload(true);

    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    }
    if (phone) {
      formData.append("phone", phone);
    }
    if (email) {
      formData.append("email", email);
    }
    if (role) {
      formData.append("role", role);
    }
    if (about) {
      formData.append("about", about);
    }
    if (profileImg) {
      formData.append("profileImg", profileImg, profileImg.name);
    }
    if (country) {
      formData.append("country", country);
    }
    fetch(`${route}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-users");
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
          <label>Name :</label>
          <input
            placeholder={userData?.name}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Email :</label>
          <input
            placeholder={userData?.email}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Phone :</label>
          <input
            placeholder={userData?.phone}
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Country : </label>
          <select required onChange={(e) => setCountry(e.target.value)}>
            <option value="" disabled selected>
              Country
            </option>
            {data?.map((item) => (
              <option value={item.value}>{item.value}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Role :</label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="" selected disabled>
              role
            </option>

            <option value="admin">admin</option>
            <option value="instructor">instructor</option>
            <option value="user">user</option>
          </select>
        </div>
        <div className="input-group">
          <label>Profile Img :</label>
          <input type="file" onChange={handleImageChange} name="" id="" />
        </div>
        <div className="input-group">
          <label>About :</label>
          <input
            placeholder={userData?.about}
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditUser;
