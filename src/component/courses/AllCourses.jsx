import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
function AllCourses() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [updateId, setUpdateId] = useState("");
  const [order, setOrder] = useState(0);
  const updateOrder = function (e) {
    e.preventDefault();
    setOnload(true);
    fetch(`${route}/education/courses/${updateId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderNumber: order }),
    })
      .then((res) => res.json())
      .then((res) => {
        // setRefresh((prev) => prev + 1);
        console.log(res);
        setOnload(false);
        setUpdateId("");
      })
      .catch((err) => console.log(err));
  };
  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/education/courses/${delId}`, {
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

    fetch(`${route}/education/courses?page=${currentPage}&sort=orderNumber`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCourses(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
        setOnload(false);
      });
  }, [refresh]);
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
      {updateId && (
        <div className="popUp">
          <div>
            <div>
              <form onSubmit={updateOrder}>
                <label style={{ display: "block" }}>Order number :</label>
                <input
                  required
                  type="number"
                  style={{ display: "block", width: "100%", padding: "10px" }}
                  onChange={(e) => setOrder(e.target.value)}
                />
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "40px" }}
                >
                  <button className="edit" type="submit">
                    update
                  </button>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => {
                      setIsPop(false);
                      setUpdateId("");
                    }}
                  >
                    No
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <h2>All Courses</h2>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            {/* <td>Package</td> */}
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr key={course._id}>
              <td>{course.title}</td>
              {/* <td>{course.package.title ? course.package.title: "null"}</td> */}
          
    
            
        
         

          
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(course._id);
                  }}
                >
                  Delete
                </div>
            
                <Link to={`/edit-course/${course._id}`} className="edit">
                  Edit
                </Link>
                <Link to={`${course._id}`} className="edit">
                  details
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

export default AllCourses;
