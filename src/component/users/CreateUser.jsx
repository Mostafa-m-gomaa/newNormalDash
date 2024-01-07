import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { data } from "./values";

function CreateUser() {
  const { setOnload, route, token } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passCon, setPassCon] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [err, setErr] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const nav = useNavigate();
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
    setOnload(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", pass);
    formData.append("passwordConfirm", passCon);
    formData.append("phone", phone);
    formData.append("country", country);
    formData.append("role", role);
    formData.append("about", about);
    formData.append("profileImg", profileImg, profileImg.name);

    fetch(`${route}/users`, {
      method: "POST",
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
      })
      .catch((err) => console.log(err));
    setOnload(false);
  };
  return (
    <div className="main-sec">
      <h2>CreateUser</h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Name :*</label>
          <input
            placeholder="Name"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Email :*</label>
          <input
            placeholder="example@gmail.com"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password :*</label>
          <input
            placeholder="password"
            type="password"
            required
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password Confirm :*</label>
          <input
            placeholder="password"
            type="password"
            pattern={pass}
            required
            onChange={(e) => setPassCon(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Phone :*</label>
          <input
            required
            placeholder="01201201201"
            type="text"
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
          <label>Role :*</label>
          <select onChange={(e) => setRole(e.target.value)} required>
            <option value="" selected disabled>
              role
            </option>
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="instructor">instructor</option>
          </select>
        </div>
        <div className="input-group">
          <label>Profile Img :</label>
          <input type="file" onChange={handleImageChange} name="" id="" />
        </div>
        <div className="input-group">
          <label>About :</label>
          <input
            required
            placeholder="About"
            type="text"
            onChange={(e) => setAbout(e.target.value)}
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

export default CreateUser;
