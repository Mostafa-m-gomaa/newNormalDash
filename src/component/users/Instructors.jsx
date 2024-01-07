import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function Instructors() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);

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

    fetch(`${route}/users?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setOnload(false);
        setPagesNumber(data.paginationResult.numberOfPages);
      });
  }, [refresh, currentPage]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this instructor</h2>
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

      <h2>All Instructors</h2>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>EmailVerified</td>
            <td>Active</td>
            <td>role</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {users
            ?.filter((user) => user.role == "instructor")
            ?.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
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

export default Instructors;
