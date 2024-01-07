import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

function PostCard({ id, setRefresh, refresh }) {
  const { setOnload, route } = useContext(AppContext);
  const [data, setData] = useState({});
  const [isPop, setIsPop] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    fetch(`${route}/analytic/posts/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setData({});
        } else {
          setData(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/analytic/posts/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setRefresh((prev) => prev + 1);
        setIsPop(false);
        setOnload(false);
      });
  };
  if (data?._id) {
    return (
      <div
        style={{
          width: "80%",
          margin: "40px auto",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {isPop && (
          <div className="popUp">
            <div>
              <h2>Are You Sure you want to delete this user</h2>
              <div>
                <span className="del" onClick={() => handelDelete()}>
                  Yes
                </span>
                <span
                  className="edit"
                  onClick={() => {
                    setIsPop(false);
                  }}
                >
                  No
                </span>
              </div>
            </div>
          </div>
        )}
        <h2>Post by {data?.user?.name}</h2>
        <p>{data?.content}</p>
        <div
          style={{
            width: "20%",
            margin: "40px 0 40px auto",
            backgroundColor: "red",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center",
            fontSize: "18px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={(e) => {
            setIsPop(true);
          }}
        >
          Delete
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default PostCard;
