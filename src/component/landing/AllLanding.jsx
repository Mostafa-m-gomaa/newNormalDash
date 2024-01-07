import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function AllLanding() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [vids, setVids] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);

  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/landingPage/${delId}`, {
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

    fetch(`${route}/landingPage?page=${currentPage}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVids(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
        setOnload(false);
      });
  }, [refresh]);
  const setDef = function (id) {
    setOnload(true);
    fetch(`${route}/landingPage/changeVideo/${id}`, {
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setRefresh((prev) => prev + 1);
        setOnload(false);
      });
  };

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this video</h2>
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

      <h2>All LandingVideo</h2>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Video url</td>
            <td>Is Default</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {vids?.map((vid) => (
            <tr key={vid._id}>
              <td>{vid.title}</td>
              <td>
                <a
                  href={vid.videoUrl}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  className="line-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  {vid.videoUrl}
                </a>
              </td>
              <td>{vid.isDefault ? "yes" : "no"}</td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(vid._id);
                  }}
                >
                  Delete
                </div>
                <a href={`/edit-landing/${vid._id}`} className="edit">
                  Edit
                </a>
                <div
                  onClick={() => setDef(vid._id)}
                  className="edit"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Set Default
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

export default AllLanding;
