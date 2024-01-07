import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

function UserRow({ id, setRefresh, refresh }) {
  const { route } = useContext(AppContext);
  const token = window.localStorage.getItem("token");
  const [data, setData] = useState({});
  console.log(data);
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
        if (data.data) {
          setData(data.data);
        } else {
          setData({});
        }
      })
      .catch((err) => console.log(err));
  }, [refresh]);
  if (data.name) {
    return (
      <tr>
        <td>{data.name}</td>
        <td>{data.email}</td>
      </tr>
    );
  } else {
    return <tr></tr>;
  }
}

export default UserRow;
