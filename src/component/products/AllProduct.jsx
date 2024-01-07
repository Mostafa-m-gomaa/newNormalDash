import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-svgrepo-com.svg";

function AllProducts() {
  const token = localStorage.getItem("token");
  const { route, setOnload } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [delId, setDelId] = useState("");
  const [refresh, setRefresh] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);

  const handelDelete = function () {
    setOnload(true);
    fetch(`${route}/store/products/${delId}`, {
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

    fetch(`${route}/store/products?page=${currentPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPagesNumber(data.paginationResult.numberOfPages);
        setProducts(data.data);
        setOnload(false);
      });
  }, [refresh, currentPage]);

  return (
    <div className="main-sec">
      {isPop && (
        <div className="popUp">
          <div>
            <h2>Are You Sure you want to delete this product</h2>
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

      <h2>All Products</h2>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>publisher</td>
            <td>Cover Image</td>
            <td>Quantity</td>
            <td>Sold</td>
            <td>Price</td>
            <td>Category</td>
            <td>SubCategory</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr>
              <td>{product.title}</td>
              <td>{product.publisher ? product.publisher : "Empty"}</td>
              <td>
                <img
                  src={product.imageCover}
                  onError={(e) => (e.target.src = noImage)}
                  alt=""
                />
              </td>
              <td>{product.quantity}</td>
              <td>{product.sold}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <span style={{ textDecorationLine: "line-through" }}>
                  {product.price} $
                </span>
                <br />
                {product.priceAfterDiscount}$
              </td>
              <td>
                {product.category?.title ? product.category?.title : "Empty"}
              </td>
              <td>
                {product.subCategories[0]?.title
                  ? product.subCategories[0]?.title
                  : "Empty"}
              </td>
              <td className="actions">
                <div
                  className="del"
                  onClick={() => {
                    setIsPop(true);
                    setDelId(product._id);
                  }}
                >
                  Delete
                </div>
                <Link to={`/edit-product/${product._id}`} className="edit">
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

export default AllProducts;
