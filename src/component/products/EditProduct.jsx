import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { setOnload, route, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [sold, setSold] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [Images, setImages] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [chosenCate, setChoenCate] = useState("");
  const [chosenSubCate, setChoenSubCate] = useState("");
  const [chosenBrand, setChoenBrand] = useState("");

  const [err, setErr] = useState("");
  const nav = useNavigate();
  const id = useParams().id;
  // Data
  const [cates, setCates] = useState([]);
  const [subCates, setSubCates] = useState([]);
  const [isFree, setIsFree] = useState(false);
  const [shownSubCates, setShownSubCates] = useState([]);
  const [brands, setBrands] = useState([]);
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
        setCates(data.data);
      });
    fetch(`${route}/store/subCategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubCates(data.data);
      });
    fetch(`${route}/store/brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data);
        console.log(data);
        setOnload(false);
      });
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverImage(file);
    } else {
      setCoverImage(null);
      event.target.value = "";
    }
  };

  const handelSubmit = function (e) {
    e.preventDefault();
    setOnload(true);

    const formData = new FormData();
    console.log(0);
    if (chosenSubCate) {
      formData.append("subCategories", chosenSubCate);
    }
    if (chosenCate) {
      formData.append("category", chosenCate);
    }
    if (coverImage) {
      formData.append("imageCover", coverImage);
    }
    if (publisher) {
      formData.append("publisher", publisher);
    }
    if (title) {
      formData.append("title", title);
    }
    if (description) {
      formData.append("description", description);
    }
    if (isFree) {
      formData.append("isFree", true);
    } else {
      formData.append("isFree", false);
      if (price) {
        formData.append("price", price);
      }
      if (priceAfterDiscount) {
        formData.append("priceAfterDiscount", priceAfterDiscount);
      }
    }
    if (pdf) {
      formData.append("pdf", pdf);
    }
    if (chosenBrand) {
      formData.append("sold", chosenBrand);
    }
    if (sold) {
      formData.append("sold", sold);
    }
    if (Images) {
      Images.map((img) => formData.append("images", img));
    }

    fetch(`${route}/store/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.errors) {
          setErr(data.errors[0].msg);
        }
        if (data.data) {
          nav("/all-products");
        }
        setOnload(false);
      })
      .catch((err) => console.log(err));
  };
  //   get sub cates
  useEffect(() => {
    const cateName = cates.find((e) => e._id == chosenCate);
    if (cateName?.title) {
      setShownSubCates(
        subCates.filter((e) => e.category?.title == cateName.title)
      );
    }
  }, [chosenCate]);
  return (
    <div className="main-sec">
      <h2>Edit Product</h2>
      <form onSubmit={(e) => handelSubmit(e)}>
        <div className="input-group">
          <label>Title :</label>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Publisher :</label>
          <input
            placeholder="Publisher"
            type="text"
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Description :</label>
          <input
            placeholder="description"
            type="text"
            minLength={30}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div style={{ margin: "10px", fontSize: "20px" }}>
          <input
            type="checkbox"
            id="isFree"
            value={true}
            onChange={(e) => setIsFree(e.target.checked)}
          />
          <label class="form-check-label" for="isFree">
            Is Free
          </label>
        </div>
        {!isFree && (
          <>
            <div className="input-group">
              <label>Price :*</label>
              <input
                placeholder="Price"
                type="number"
                required={!isFree}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Price After Discount :*</label>
              <input
                placeholder="Price After Discount"
                type="number"
                max={price}
                onChange={(e) => setPriceAfterDiscount(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="input-group">
          <label>Sold :</label>
          <input
            placeholder="Sold"
            type="number"
            onChange={(e) => setSold(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Category :</label>
          <select
            onChange={(e) => {
              setChoenCate(e.target.value);
              setChoenSubCate("");
            }}
          >
            <option value="" selected disabled></option>
            {cates?.map((cate) => (
              <option value={cate._id} key={cate._id}>
                {cate.title}
              </option>
            ))}
            {cates.length == 0 && <option value="">No Category</option>}
          </select>
        </div>
        {chosenCate && (
          <div className="input-group">
            <label>Sub Category :</label>
            <select onChange={(e) => setChoenSubCate(e.target.value)}>
              <option value="" selected disabled></option>

              {shownSubCates?.map((cate) => (
                <option value={cate._id} key={cate._id}>
                  {cate.title}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="input-group">
          <label>Brands :</label>
          <select onChange={(e) => setChoenBrand(e.target.value)}>
            <option value="" selected disabled></option>

            {brands?.map((brand) => (
              <option value={brand._id} key={brand._id}>
                {brand.title}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Cover Image :</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="input-group">
          <label>Images :</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.type.startsWith("image/")) {
                setImages([...e.target.files]);
              } else {
                setImages(null);
                e.target.value = "";
              }
            }}
            multiple
            name=""
            id=""
          />
        </div>
        <div className="input-group">
          <label>PDF :</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];

              if (file && file.type.endsWith("pdf")) {
                setPdf(file);
              } else {
                setPdf(null);
                e.target.value = "";
              }
            }}
          />
        </div>
        {err && <p className="error">{err}</p>}

        <button type="submit" className="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
