import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditCourse() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const id = useParams().id;
  const [expirationTime, setExpirationTime] = useState("");
  const [renewPrice, setRenewPrice] = useState("");
  const [data, setData] = useState({});
  const [mainChannels, setMainChannels] = useState([]);
  const [telegramChannels, setTelegramChannels] = useState([]);
  const [image, setImage] = useState(null);
  const [cates, setCates] = useState([]);
  const [selectedCate, setSelectedCate] = useState("");
  const checkBoxOnChange = (e, key) => {
    if (e.target.checked) {
      setTelegramChannels((prev) => [...prev, e.target.value]);
    } else {
      setTelegramChannels((prev) =>
        prev?.filter((value) => value !== e.target.value)
      );
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
  
    fetch(`${route}/education/courses/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setTelegramChannels(data.data.telegramChannelNames);

        setDesc(data?.data?.description);
      })
      .catch((err) => console.log(err));
  }, []);


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

  }, []);

  const handelSubmit = function (e) {
    console.log(selectedCate)
    e.preventDefault();
    setOnload(true);
    const formData = new FormData();
    if (title) {
      formData.append("title", title);
    }
    if (desc) {
      formData.append("description", desc);
    }
  
    if (image) {
      formData.append("image", image, image.name);
    }
    if (selectedCate) {
      formData.append("package", selectedCate);
    }

   
    fetch(`${route}/education/courses/${id}`, {
      method: "PUt",
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
        if (data.data) {
          nav("/all-courses");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main-sec">
      <h2>Edit Course </h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            placeholder={data?.title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <textarea
            value={desc}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} name="" id="" />
        </div>
     
        <div className="input-group">
          <label>package :</label>
          <select  onChange={(e) => setSelectedCate(e.target.value)}>
            <option value="" disabled selected></option>

            {cates.map((cate) => (
              <option value={cate._id}>{cate.title}</option>
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

export default EditCourse;
