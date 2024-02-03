import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePackage() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
const [type, setType] = useState("")
  const [err, setErr] = useState("");
  const [cousrses, setCourses] = useState([]);
  const nav = useNavigate();
  const id = useParams().id;
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [telegramChannels, setTelegramChannels] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [data, setdata] = useState({});
  const [mainChannels, setMainChannels] = useState([]);
  const [expirationTime, setExpirationTime] = useState("");
  const [renewPrice, setRenewPrice] = useState("");
  const [selectedTele, setSelectedTele] = useState([]);

  const handleCheckboxChange = courseId => {
    // Check if the course is already selected
    const isSelected = selectedCourses.includes(courseId);

    // Update the selected courses based on the checkbox change
    setSelectedCourses(prevSelected => {
      if (isSelected) {
        // Remove the course if already selected
        return prevSelected.filter(id => id !== courseId);
      } else {
        // Add the course if not selected
        return [...prevSelected, courseId];
      }
    });


  };
  const handleCheckboxChangeTele = teleId => {
    // Check if the course is already selected
    const isSelected = selectedTele.includes(teleId);

    // Update the selected courses based on the checkbox change
    setSelectedTele(prevSelected => {
      if (isSelected) {
        // Remove the course if already selected
        return prevSelected.filter(id => id !== teleId);
      } else {
        // Add the course if not selected
        return [...prevSelected, teleId];
      }
    });

  
  };


  useEffect(() => {
    fetch(`${route}/telegramChannel`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTelegramChannels(data.data));
    fetch(`${route}/education/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.data));
    fetch(`${route}/education/packages/findOne/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setdata(data.data);
          setSelectedCourses(data.data.courses.map(obj => obj._id));
          setSelectedTele(data.data.telegramChannelNames);
          setType(data.data.type)
     
        }
      });
  }, []);
  const handelSubmit = function (e) {
    e.preventDefault();
    const data = new FormData();
    

    setOnload(true);
   

    if (title) {
      data.append("title", title);
    }
    if (description) {
      data.append("description", description);
    }
    if (price) {
      data.append("price", price);
    }
    if (renewPrice) {
      data.append("price", renewPrice);
    }
    if (priceAfterDiscount) {
      data.append("priceAfterDiscount", priceAfterDiscount);
    }
    if (image) {
      data.append("image", image);
    }
    if (expirationTime) {
      data.append("expirationTime", expirationTime);
    }
    if(selectedTele.length !== 0){

       
      selectedTele.forEach(courseId => {
        data.append("telegramChannelNames", courseId);
      });
    }
    if(selectedCourses.length !== 0){
     
      selectedCourses.forEach(courseId => {
        data.append('courses', courseId);
      });
    }

    fetch(`${route}/education/packages/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-packages");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
    setOnload(false);
  };
 

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
      event.target.value = "";
    }
  };

  return (
    <div className="main-sec">
      <h2>Edit Package </h2>
    

<form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            type="text"
            placeholder="Title"
            
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <textarea
            type="text"
            placeholder="Description"
            
            onChange={(e) => {
              console.log(e.target.value);
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label>Price :</label>
          <input
            type="number"
            
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price After Discount :*</label>
          <input
            placeholder="Price After Discount"
            type="number"
            max={price}
            onChange={(e) => setPriceAfterDiscount(e.target.value)}
          />
        </div>
       {type === "package" ?  <div className="input-group">
          <label>ExpirationTime :</label>
          <input
            type="number"
            
            placeholder="number of day"
            onChange={(e) => setExpirationTime(e.target.value)}
          />
        </div>: null}
  {type === "package" ?  
  
  
  <div className="input-group">
          <label>Renew price :</label>
          <input
            type="number"
            
            placeholder="renew price"
            onChange={(e) => setRenewPrice(e.target.value)}
          />
        </div> : null}
        <div className="input-group">
          <label>Image :</label>

          <input type="file" onChange={handleImageChange}  />
        </div>

        <div className="input-group">
          <label>Course :</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >

{cousrses.map(course => (
        <div key={course._id}>
          <label      style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
            <input
              type="checkbox"
              value={course._id}
              checked={selectedCourses.includes(course._id)}
              onChange={() => handleCheckboxChange(course._id)}
            />
            {course.title}
          </label>
        </div>
      ))}
  
          </div>
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
 
{telegramChannels.map(tele => (
        <div key={tele._id}>
          <label      style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
            <input
              type="checkbox"
              value={tele.title}
              checked={selectedTele.includes(tele.title)}
              onChange={() => handleCheckboxChangeTele(tele.title)}
            />
            {tele.title}
          </label>
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

        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default UpdatePackage;
