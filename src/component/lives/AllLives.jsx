import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function AllLives() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [lives, setLives] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);

  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/education/lives/${delId}`, {
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

    fetch(`${route}/education/lives?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLives(data.data);
        setOnload(false);
        setPagesNumber(data.paginationResult.numberOfPages);
      });
  }, [refresh, currentPage]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this live</h2>
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

      <h2>All Lives</h2>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Course</td>
            <td>Time</td>
            <td>Followers</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {lives?.map((live) => (
            <tr key={live._id}>
              <td>{live.title}</td>
              <td>{live.course ? live.course.title : "public"}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                {live.day}/{live.month} at {live.hour}
              </td>
              <td>{live.followers.length}</td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(live._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/edit-live/${live._id}`} className="edit">
                  Edit
                </Link>
                <Link
                  to={`/add-message/${live._id}`}
                  className="edit"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Send Message
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

export default AllLives;
