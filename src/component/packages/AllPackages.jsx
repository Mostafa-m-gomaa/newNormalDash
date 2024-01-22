import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-svgrepo-com.svg";

function AllPachages() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [packages, setPackage] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/education/packages/${delId}`, {
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

    fetch(`${route}/education/packages/dashboard?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPackage(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
        console.log(data);
        setOnload(false);
      });
  }, [refresh, currentPage]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this package</h2>
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

      <h2>All Packages</h2>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Type</td>
            <td>Price</td>
            <td>Renew Price</td>
            <td>Expiration Time</td>
            <td>Sold</td>
            {/* <td>telegramChannels</td> */}
            {/* <td>Courses</td> */}
            {/* <td>Users</td> */}
            <td>Image</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {packages?.map((packagee) => (
            <tr key={packagee._id}>
              <td>{packagee.title}</td>
              <td>{packagee.type}</td>
              <td>{packagee.price}</td>
              <td>{packagee.renewPrice ? packagee.renewPrice : "none"}</td>
              <td>{packagee.expirationTime ? packagee.expirationTime : "none"}</td>
              <td>{packagee.sold}</td>
              {/* <td>
                {packagee.telegramChannelNames[0] === "*"
                  ? "All channels "
                  : packagee.telegramChannelNames.join(",")}
              </td> */}
                    
              {/* <td>{packagee.courses.map((e) => e.title).join(", ")}</td> */}
              
              {/* <td>{packagee.users.length}</td> */}
              <td>
                <img
                  src={packagee.image}
                  onError={(e) => (e.target.src = noImage)}
                  alt=""
                />
              </td>
             
             
      

              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(packagee._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/edit-package/${packagee._id}`} className="edit">
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

export default AllPachages;
