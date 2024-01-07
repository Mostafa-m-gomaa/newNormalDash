import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-svgrepo-com.svg";

function AllStoreSubCate() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [subCates, setSubCates] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [mainCates, setMainCates] = useState([]);
  const [selected, setSelected] = useState("");
  const [findata, setFinData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);

  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/store/subCategories/${delId}`, {
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
    fetch(`${route}/store/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMainCates(data.data);
      });
    fetch(`${route}/store/subCategories?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubCates(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);
        setOnload(false);
      });
  }, [refresh, currentPage]);
  useEffect(() => {
    if (selected) {
      setFinData(subCates.filter((e) => e.category.title == selected));
    } else {
      setFinData(subCates);
    }
  }, [selected, subCates, currentPage]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this Lesson</h2>
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

      <h2>Chose The Main Category </h2>
      <div style={{ width: "fit-content", margin: "20px auto" }}>
        <select
          style={{ padding: "20px", border: "solid 1px #ccc " }}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="" selected disabled style={{ padding: "20px" }}>
            category
          </option>
          {mainCates.map((course) => (
            <option value={course.title} style={{ padding: "20px" }}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <h2>SubCategories</h2>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Main Category</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {findata?.map((data) => (
            <tr>
              <td>{data.title}</td>
              <td>{data?.category?.title}</td>

              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(data._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/edit-subcategory/${data._id}`} className="edit">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{findata.length == 0 && "No SubCategories in this category"}</h2>
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

export default AllStoreSubCate;
