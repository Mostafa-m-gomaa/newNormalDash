import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import UserRow from "./UserRow";

function CourseDetails() {
  const { route } = useContext(AppContext);
  const token = window.localStorage.getItem("token");
  const id = useParams().id;
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(0);

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
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-sec">
      <h1>Title: {data?.title} </h1>
      <p style={{ fontSize: "18px" }}>Description: {data?.description}</p>
      <div style={{ fontSize: "18px" }}>
        {data?.priceAfterDiscount ? (
          <div>
            <div>Price : {data?.price}$</div>

            <div style={{ marginRight: "10px" }}>
              Price After Discount :{data?.priceAfterDiscount}$
            </div>
          </div>
        ) : (
          <div>Price : {data?.price}</div>
        )}
        <div>
          <h1 style={{ margin: "40px auto ", width: "fit-content" }}>
            Student
          </h1>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((user) => (
                <UserRow
                  id={user._id}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              ))}
            </tbody>
          </table>
          <form>
            <h2>Add Student To This Course </h2>
            <div
              className="input-group"
              style={{ width: "fit-content", margin: " 0 auto" }}
            >
              <label>User Id:*</label>
              <input type="text" />
            </div>
            <button
              type="submit"
              className="submit"
              style={{ width: "25%", margin: "20px auto" }}
            >
              Add
            </button>
          </form>
        </div>
        <div>
          <h1 style={{ margin: "40px auto ", width: "fit-content" }}>
            Course Posts
          </h1>
          {data?.posts?.map((post) => (
            <PostCard id={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
