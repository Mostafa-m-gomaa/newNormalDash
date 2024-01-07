import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function AllMarketingRequests() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [requests, setRequests] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [actionId, setActionId] = useState("");
  const [action, setAction] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const handelAction = function () {
    if (action === "delete") {
      setOnload(true);
      fetch(`${route}/marketingReq/${actionId}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(() => {
          setRefresh((prev) => prev + 1);
          setActionId("");
          setIsPop(false);
        })
        .finally(() => {
          setOnload(false);
        });
    } else if (action === "reject") {
      setOnload(true);
      fetch(`${route}/marketingReq/reject/${actionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(() => {
          setRefresh((prev) => prev + 1);
          setActionId("");
          setIsPop(false);
        })
        .finally(() => {
          setOnload(false);
        });
    } else if (action === "accept") {
      setOnload(true);
      fetch(`${route}/marketingReq/accept/${actionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(() => {
          setRefresh((prev) => prev + 1);
          setActionId("");
          setIsPop(false);
        })
        .finally(() => {
          setOnload(false);
        });
    }
  };
  useEffect(() => {
    setOnload(true);

    fetch(
      `${route}/marketingReq?page=${currentPage}${
        statusFilter && `&status=${statusFilter}`
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
        console.log(data);
        setRequests(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
      })
      .finally(() => {
        setOnload(false);
      }, []);
  }, [refresh, currentPage, statusFilter]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            {action === "delete" && (
              <h2>Are you sure that you want to delete this request</h2>
            )}
            {action === "reject" && (
              <h2>Are you sure that you want to reject this request</h2>
            )}
            {action === "accept" && (
              <h2>Are you sure that you want to accept this request</h2>
            )}

            <div
              style={{ gap: "10px", display: "flex", justifyContent: "center" }}
            >
              <button
                style={{
                  width: "150px",
                  display: "block",
                }}
                className="edit"
                onClick={handelAction}
              >
                Yes
              </button>
              <button
                style={{
                  width: "150px",
                  display: "block",
                }}
                className="edit"
                onClick={() => {
                  setIsPop(false);
                  setActionId({});
                  setAction("");
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <select
        style={{ display: "block", margin: "10px auto", padding: "10px 20px " }}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">all</option>
        <option value="pending">pending</option>

        <option value="accepted">accepted</option>
        <option value="rejected">rejected</option>
      </select>
      <h2>All requests</h2>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Country</td>
            <td>City</td>
            <td>Current Work</td>
            <td>Payment Method</td>
            <td>Identity</td>
            <td>Status of request</td>
            <td>Birth Day</td>
            <td>Facebook</td>
            <td>Instagram</td>
            <td>Telegram</td>
            <td>TikTok</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request._id}>
              <td>{request.fullName}</td>
              <td>-</td>
              <td>{request.country}</td>
              <td>{request.city}</td>
              <td>{request.currentWork}</td>
              <td>{request.paymentMethod}</td>
              <td>
                <a
                  href={request.identity}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "blue" }}
                >
                  {request.identity}
                </a>
              </td>
              <td>{request.status}</td>
              <td>{new Date(request.birthDate).toLocaleDateString()}</td>
              <td>
                <a
                  href={request.facebook}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "blue" }}
                >
                  {request.facebook}
                </a>
              </td>{" "}
              <td>
                <a
                  href={request.instgram}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "blue" }}
                >
                  {request.instgram}
                </a>
              </td>{" "}
              <td>
                <a
                  href={request.telegram}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "blue" }}
                >
                  {request.telegram}
                </a>
              </td>{" "}
              <td>
                <a
                  href={request.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "blue" }}
                >
                  {request.tiktok}
                </a>
              </td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setActionId(request._id);
                    setAction("delete");
                  }}
                >
                  Delete
                </div>
                <div
                  className="edit"
                  onClick={() => {
                    setIsPop(true);
                    setActionId(request._id);
                    setAction("reject");
                  }}
                >
                  Reject
                </div>
                <div
                  className="edit"
                  onClick={() => {
                    setIsPop(true);
                    setAction("accept");
                    setActionId(request._id);
                  }}
                >
                  Accept
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

export default AllMarketingRequests;
