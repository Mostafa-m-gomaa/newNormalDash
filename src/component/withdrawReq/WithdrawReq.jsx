import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import ShowInvoice from "../ShowInvoice";

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

  useEffect(() => {
    setOnload(true);

    fetch(`${route}/withdrawReq?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRequests(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
      })
      .finally(() => {
        setOnload(false);
      }, []);
  }, [refresh, currentPage]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            {action === "show" && (
              <>
                <h2>Details of this request invoices</h2>
                {actionId.invoices.map((item) => {
                  return <ShowInvoice data={item} key={item._id} />;
                })}
                <div>
                  <span
                    style={{
                      width: "200px",
                      margin: "15px auto",
                      display: "block",
                    }}
                    className="edit"
                    onClick={() => {
                      setIsPop(false);
                      setActionId({});
                      setRefresh((prev) => prev + 1);
                      setAction("");
                    }}
                  >
                    Close
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <h2>All Withdraw requests</h2>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Invoices</td>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request._id}>
              <td>{request.marketer.name}</td>
              <td>{request.marketer.email}</td>
              <td>{request.role}</td>
              <td>
                <div
                  className="edit"
                  onClick={() => {
                    setAction("show");
                    setIsPop(true);
                    setActionId(request);
                  }}
                >
                  Show
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
