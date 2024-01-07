import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function AllBrokers() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [brokers, setBrokers] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}broker/${delId}`, {
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

    fetch(`${route}broker?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBrokers(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
      })
      .finally(() => setOnload(false));
  }, [refresh, currentPage]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this broker</h2>
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

      <h2>All Brokers</h2>

      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Link</td>
            <td>Marketer</td>
            <td>Country</td>
            <td>Videos</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {brokers?.map((broker) => (
            <tr>
              <td>{broker.title}</td>
              <td>{broker.link}</td>
              <td>
                {broker?.marketer?.email} -{" "}
                {broker?.marketer?.telegram?.telegramUserName}
              </td>
              <td>{broker.country}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                {broker.videoLinks.join(" - ")}
              </td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(broker._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/edit-broker/${broker._id}`} className="edit">
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

export default AllBrokers;
