import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-svgrepo-com.svg";

function AllLesson() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [lessons, setLessons] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [cousers, setCourses] = useState([]);
  const [selected, setSelected] = useState("");
  const [findata, setFinData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);

  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/education/lessons/${delId}`, {
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
    fetch(`${route}/education/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.data);
        console.log(data.data);
      });
    fetch(`${route}/education/lessons?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLessons(data.data);
        setPagesNumber(data.paginationResult.numberOfPages);

        setOnload(false);
      });
  }, [refresh, currentPage]);
  useEffect(() => {
    if (selected) {
      setFinData(lessons.filter((e) => e.course == selected));
    } else {
      setFinData(lessons);
    }
  }, [selected, lessons]);

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

      <h2>Chose The Course </h2>
      <div style={{ width: "fit-content", margin: "20px auto" }}>
        <select
          style={{ padding: "20px", border: "solid 1px #ccc " }}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="" style={{ padding: "20px" }}>
            All
          </option>
          {cousers.map((course) => (
            <option
              key={course._id}
              value={course._id}
              style={{ padding: "20px" }}
            >
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <h2>Lessons</h2>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Type</td>
            <td>Course</td>
            <td>VideoUrl</td>
            <td>Image</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody>
          {findata?.map((lesson) => (
            <tr key={findata._id}>
              <td>{lesson.title}</td>
              <td>{lesson.type}</td>
              <td>
                {cousers.map((e) => {
                  if (e._id == lesson.course) {
                    return e.title;
                  }
                })}
              </td>
              <td>
                <a
                  href={lesson.videoUrl}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  className="line-3"
                  target="_blank"
                  rel="noreferrer"
                >
                  {lesson.videoUrl}
                </a>
              </td>
              <td>
                <img
                  src={lesson.image}
                  onError={(e) => (e.target.src = noImage)}
                  alt=""
                />
              </td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(lesson._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/edit-lesson/${lesson._id}`} className="edit">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{findata.length == 0 && "No lessons in this course"}</h2>
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

export default AllLesson;
