import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function AllUsers() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [keyword, setKeyWord] = useState("");
  const [search, setSearch] = useState("");
  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/users/${delId}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setRefresh((prev) => prev + 1);
        setDelId("");
        setIsPop(false);
        setOnload(false);
      });
  };
  useEffect(() => {
    setOnload(true);

    fetch(
      `${route}/users?page=${currentPage}${
        keyword !== "" ? `&keyword=${keyword}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
      })
      .finally(() => setOnload(false));
  }, [refresh, currentPage, search]);
  const active = function (id) {
    setOnload(true);
    fetch(`${route}/users/activeuser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRefresh((prev) => prev + 1);
        setOnload(false);
      });
  };
  const unActive = function (id) {
    setOnload(true);
    fetch(`${route}/users/deactiveuser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRefresh((prev) => prev + 1);
        setOnload(false);
      });
  };
  return (
    <div className="main-sec">
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
                  setDelId("");
                }}
              >
                No
              </span>
            </div>
          </div>
        </div>
      )}

      <h2>All Users</h2>
      <form
        style={{ display: "flex" }}
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentPage(1);
          setSearch(keyword);
        }}
      >
        <input
          type="text"
          style={{ width: "70%", padding: "10px", margin: "30px 0" }}
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="keyword"
        />
        <input
          type="submit"
          style={{
            width: "30%",
            padding: "10px",
            margin: "30px 0",
            backgroundColor: "green",
            border: "none",
            color: "white",
          }}
          value="search"
          className="btn btn-primary"
        />
      </form>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>country</td>
            <td>EmailVerified</td>
            <td>Active</td>
            <td>role</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>{user.emailVerified ? "yes" : "no"}</td>
              <td>{user.active ? "yes" : "no"}</td>
              <td>{user.role}</td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(user._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/edit-user/${user._id}`} className="edit">
                  Edit
                </Link>
                {user.startMarketing && (
                  <Link
                    to={`/market-log/${user._id}`}
                    style={{ whiteSpace: "nowrap" }}
                    className="edit"
                  >
                    Market Log
                  </Link>
                )}

                <div
                  className="edit"
                  onClick={() => {
                    active(user._id);
                  }}
                >
                  active
                </div>
                <div
                  className="del"
                  onClick={() => {
                    unActive(user._id);
                  }}
                >
                  unactive
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>we have {pagesNumber} pages</h2>
      <div className="pagination">
        <div
          className={`paginationBtn ${currentPage >= 2 ? "" : "off"}`}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          previous
        </div>

        <div>{currentPage}</div>

        <div
          className={`paginationBtn ${pagesNumber > currentPage ? "" : "off"}`}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          next
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
