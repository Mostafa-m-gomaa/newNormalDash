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
  const checkBoxOnChange = (e, key) => {
    if (e.target.checked) {
      setTelegramChannels((prev) => [...prev, e.target.value]);
    } else {
      setTelegramChannels((prev) =>
        prev?.filter((value) => value !== e.target.value)
      );
    }
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
      .then((data) => setMainChannels(data.data));
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
    if (chaneslValue.includes("*")) {
      data.telegramChannelNames = ["*"];
    } else if (chaneslValue.length != 0) {
      data.telegramChannelNames =
        chaneslValue.length === 6 ? ["*"] : chaneslValue;
    }
    const data = { description: desc };
    if (title) {
      data.title = title;
    }
    if (price) {
      data.price = price;
    }
    if (priceAfter) {
      data.priceAfterDiscount = priceAfter;
    }
    if (expirationTime) {
      data.expirationTime = expirationTime;
    }
    if (renewPrice) {
      data.renewPrice = renewPrice;
    }
    fetch(`${route}/education/courses/${id}`, {
      method: "PUt",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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
          <label>Price :</label>
          <input
            placeholder={data?.price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Price After Discount :</label>
          <input
            placeholder={data?.priceAfterDiscount}
            type="number"
            max={price}
            onChange={(e) => setPriceAfter(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>ExpirationTime :</label>
          <input
            type="number"
            placeholder={data?.expirationTime}
            onChange={(e) => setExpirationTime(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Renew price :</label>
          <input
            type="number"
            required
            placeholder={data?.renewPrice}
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
            {mainChannels?.map((item, ind) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.title}
                  onChange={(e) => {
                    checkBoxOnChange(e, "telegram");
                  }}
                  checked={telegramChannels?.includes(item.title)}
                  name="chanal"
                />
                <label htmlFor={item.id}>{item.title}</label>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                onChange={(e) => {
                  checkBoxOnChange(e, "telegram");
                }}
                checked={telegramChannels?.includes("*")}
                id="all"
                value="*"
                type="checkbox"
                name="chanal"
              />
              <label htmlFor="all">all</label>
            </div>
          </div>
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
