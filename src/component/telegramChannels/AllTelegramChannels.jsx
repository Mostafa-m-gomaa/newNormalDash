import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

function AllTelegramChannels() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [channels, setChannels] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [keyword, setKeyWord] = useState("");
  const [search, setSearch] = useState("");
  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/telegramChannel/${delId}`, {
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
      `${route}/telegramChannel?page=${currentPage}${
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
        setChannels(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
      })
      .finally(() => setOnload(false));
  }, [refresh, currentPage, search, keyword, token, route, setOnload]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this channel</h2>
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

      <h2>All Telegram Channels</h2>

      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {channels?.map((channel) => (
            <tr>
              <td>{channel.title}</td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(channel._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/telegramChannels/${channel._id}`} className="edit">
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

export default AllTelegramChannels;
