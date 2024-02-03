import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { data } from "./values";
import toast from "react-hot-toast";

function Numbers() {
  const { setOnload, route, token } = useContext(AppContext);
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [videoLinks, setVideoLinks] = useState([]);
  const [currentVideoLink, setCurrentVideoLink] = useState("");
  const [country, setCountry] = useState("");
  const [analyticals, setAnalyticals] = useState("");
    const [interests, setInterests] = useState("");
        const [trainees, setTrainees] = useState("");
  const nav = useNavigate();
  
  const [marketer, setMarketer] = useState("");
  const [systemNumber, setSystemNumber] = useState({});
  useEffect(() => {
    fetch(`${route}/systemNumber`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.data) {
setSystemNumber(data.data[0]);
setAnalyticals(data.data[0].analyticals);
setInterests(data.data[0].interests);
setTrainees(data.data[0].trainees);
        }
      });
  }, []);
  const handelSubmit = function (e) {
      setOnload(true);
    e.preventDefault();
    
    fetch(`${route}/systemNumber`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        analyticals,
        interests,
        trainees
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.status === "success") {
        //   nav("/all-brokers");
        toast.success("تم تعديل الارقام بنجاح");
        }
      })
      .catch((err) => console.log(err));
    setOnload(false);
  };
  return (
    <div className="main-sec">
      <h2>numbers</h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>analyticals :*</label>
          <input
            type="text"
            required
            onChange={(e) => setAnalyticals(e.target.value)}
            value={analyticals}
          />
        </div>
        <div className="input-group">
          <label>interests :*</label>
          <input
        value={interests}
            type="text"
            required
            onChange={(e) => setInterests(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>trainees :*</label>

          <input
        
            type="text"
            value={trainees}
            onChange={(e) => setTrainees(e.target.value)}
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

export default Numbers;
