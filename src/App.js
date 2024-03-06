import "./App.css";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { createContext } from "react";
import React, { useState, useEffect } from "react";
import Side from "./component/sidebar/Side";
import { MdOutlineDoneOutline } from "react-icons/md";
import { BiError } from "react-icons/bi";
import Login from "./component/login/Login";
import burger from "./assets/9666728_menu_burger_vertical_icon.png";
import AllUsers from "./component/users/AllUsers";
import CreateUser from "./component/users/CreateUser";
import EditUser from "./component/users/EditUser";
import Instructors from "./component/users/Instructors";
import AllCategoires from "./component/categories/AllCategoires";
import CreateCategorie from "./component/categories/CreateCategorie";
import EditCategorie from "./component/categories/EditCategorie";
import AllCourses from "./component/courses/AllCourses";
import CreateCourse from "./component/courses/CreateCourse";
import EditCourse from "./component/courses/EditCourse";
import CourseDetails from "./component/courses/CourseDetails";
import AllAnalytic from "./component/analytic/AllAnalytic";
import NewAnalytic from "./component/analytic/NewAnalytic";
import AllPosts from "./component/posts/AllPosts";
import AllAdvertisements from "./component/advertisements/AllAdvertisements";
import NewAdvertisements from "./component/advertisements/NewAdvertisements";
import EditAdd from "./component/advertisements/EditAdd";
import AllLesson from "./component/lesons/AllLesson";
import CreateLesson from "./component/lesons/CreateLesson";
import EditLesson from "./component/lesons/EditLesson";
import AllLanding from "./component/landing/AllLanding";
import NewLanding from "./component/landing/NewLanding";
import EditLanding from "./component/landing/EditLanding";
import AllLives from "./component/lives/AllLives";
import CreateLive from "./component/lives/CreateLive";
import AllPackages from "./component/packages/AllPackages";
import EditLive from "./component/lives/EditLive";
import CreatePackage from "./component/packages/CreatePackage";
import UpdatePackage from "./component/packages/UpdatePackage";
import AllStoreCategories from "./component/storeCates/AllStoreCategories";
import CreateStoreCategorie from "./component/storeCates/CreateStoreCategories";
import EditStoreCategorie from "./component/storeCates/EditStoreCategorie";
import AllStoreSubCate from "./component/storeCates/AllStoreSubCate";
import CreateStoreSunCate from "./component/storeCates/CreateStoreSubCate";
import EditStoreSubCate from "./component/storeCates/EditStoeSubCate";
import AllProducts from "./component/products/AllProduct";
import CreateProduct from "./component/products/AddProduct";
import EditProduct from "./component/products/EditProduct";
import AllBrands from "./component/brands/AllBrands";
import CreateBrand from "./component/brands/CreateBrands";
import EditBrand from "./component/brands/EditBrands";

import AddMessage from "./component/lives/AddMessage";
import EditAnalytic from "./component/analytic/EditAnalytic";
import CreateCoupon from "./component/coupons/CreateCoupon";
import EditCoupon from "./component/coupons/EditCoupon";
import AllCoupons from "./component/coupons/AllCoupons";
import AllStories from "./component/stories/AllStories";
import CreateStory from "./component/stories/CreateStory";
import EditStory from "./component/stories/EditStory";
import AllStoreOrders from "./component/orders/AllStoreOrders";
import AllEduOrders from "./component/orders/AllEduOrders";
import AddUserToPackage from "./component/packages/AddUserToPackage";
import RemoveUserToPackage from "./component/packages/RemoveUserToPackage";
import CreateInvoiceForAllUsers from "./component/Invoices/CreateInvoiceForAllUsers";
import AllMarketingRequests from "./component/marketingRequests/AllMarketingRequests";
import WithdrawReq from "./component/withdrawReq/WithdrawReq";
import { Toaster } from "react-hot-toast";
import MarketLog from "./component/marketLog/MarketLog";
import PurchaeWithUser from "./component/Invoices/PurchaeWithUser";
import AllTelegramChannels from "./component/telegramChannels/AllTelegramChannels";
import CreateTelegramChannel from "./component/telegramChannels/CreateTelegramChannel";
import EditTelegramChannel from "./component/telegramChannels/EditTelegramChannel";
import AllBrokers from "./component/broker/AllBrokers";
import CreateBroker from "./component/broker/CreateBroker";
import EditBroker from "./component/broker/EditBroker";
import EditQuestion from "./component/questions/EditQuestion";
import CreateQuestion from "./component/questions/CreateQuestion";
import AllQuestions from "./component/questions/AllQuestions";
import CreateCoursePack from "./component/packages/CoursePack";
import AllPachages from "./component/packages/AllPackages";
import Numbers from "./component/broker/numbers";

export const AppContext = createContext();

const Layout = function () {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("data"));
  if (data?.role === "admin") {
    return <Outlet />;
  }
  if (!token) {
    return <Navigate state={{ from: location }} replace to="/" />;
  }
};

function App() {
  const [token, setToken] = useState("");
  const [login, setLogin] = useState(false);
  const [onload, setOnload] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("hello");
  // const [route, setRoute] = useState(
  //   "https://api.thenewnormal.trade/api/v1/"
  // );
  const [route, setRoute] = useState(
    "https://api.thenewnormal.trade/api/v1/"
  );
  

  const displayMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
  };
  const burgerClick = () => {
    document.querySelector(".side").classList.toggle("side-show");
  };
  useEffect(() => {
    let timeout;
    if (showMessage) {
      timeout = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showMessage]);
  useEffect(() => {
    let timeout;
    if (showSuccess) {
      timeout = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showSuccess]);
  useEffect(() => {
    let timeout;
    if (showError) {
      timeout = setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showError]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setLogin(localStorage.getItem("login"));
  }, [login]);

  return (
    <AppContext.Provider
      value={{
        route,
        setRoute,
        displayMessage,
        onload,
        setOnload,
        showSuccess,
        setShowSuccess,
        showError,
        setShowError,
        token,
        setToken,
        login,
        setLogin,
      }}
    >
      <Toaster />
      <div className="App">
        <img src={burger} onClick={burgerClick} className="burger" />
        {onload ? (
          <div className="spin-cont">
            <div className="back-ground"></div>
            <div className="spinner"></div>
          </div>
        ) : null}

        {showSuccess ? (
          <div className="success">
            Done <MdOutlineDoneOutline />
          </div>
        ) : null}
        {showError ? (
          <div className="wrong">
            try again <BiError />
          </div>
        ) : null}

        {showMessage ? <div className="message">{message}</div> : null}

        {login ? <Side /> : null}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/telegramChannels" element={<AllTelegramChannels />} />
            <Route
              path="/telegramChannels/new"
              element={<CreateTelegramChannel />}
            />
            <Route
              path="/telegramChannels/:id"
              element={<EditTelegramChannel />}
            />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/all-brokers" element={<AllBrokers />} />
            <Route path="/numbers" element={<Numbers/>} />
            <Route path="/create-broker" element={<CreateBroker />} />
            <Route path="/edit-broker/:id" element={<EditBroker />} />
            <Route path="/all-instructors" element={<Instructors />} />
            <Route path="/all-category" element={<AllCategoires />} />
            <Route path="/add-category" element={<CreateCategorie />} />
            <Route path="/edit-cate/:id" element={<EditCategorie />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/all-courses/:id" element={<CourseDetails />} />
            <Route path="/add-course" element={<CreateCourse />} />
            <Route path="/edit-course/:id" element={<EditCourse />} />
            <Route path="/all-analytic" element={<AllAnalytic />} />
            <Route path="/add-analytic" element={<NewAnalytic />} />
            <Route path="/edit-analytic/:id" element={<EditAnalytic />} />
            <Route path="/all-posts" element={<AllPosts />} />
            <Route path="/all-advertisements" element={<AllAdvertisements />} />
            <Route path="/add-advertisement" element={<NewAdvertisements />} />
            <Route path="/edit-advertisement/:id" element={<EditAdd />} />
            <Route path="/all-lessons" element={<AllLesson />} />
            <Route path="/add-lesson" element={<CreateLesson />} />
            <Route path="/edit-lesson/:id" element={<EditLesson />} />
            <Route path="/all-stories" element={<AllStories />} />
            <Route path="/add-story" element={<CreateStory />} />
            <Route path="/edit-story/:id" element={<EditStory />} />
            <Route path="/all-questions" element={<AllQuestions />} />
            <Route path="/add-question" element={<CreateQuestion />} />
            <Route path="/edit-question/:id" element={<EditQuestion />} />
            <Route path="/all-landing" element={<AllLanding />} />
            <Route path="/add-landing" element={<NewLanding />} />
            <Route path="/edit-landing/:id" element={<EditLanding />} />
            <Route path="/all-lives" element={<AllLives />} />
            <Route path="/add-live" element={<CreateLive />} />
            <Route path="/edit-live/:id" element={<EditLive />} />
            <Route path="/add-message/:id" element={<AddMessage />} />
            <Route path="/all-packages" element={<AllPachages />} />
            <Route path="/add-package" element={<CreatePackage />} />
            <Route path="/add-course-package" element={<CreateCoursePack />} />
            <Route path="/edit-package/:id" element={<UpdatePackage />} />
            <Route path="/edit-live/:id" element={<EditLive />} />
            <Route
              path="/all-store-categories"
              element={<AllStoreCategories />}
            />
            <Route
              path="/add-store-category"
              element={<CreateStoreCategorie />}
            />
            <Route
              path="/edit-store-category/:id"
              element={<EditStoreCategorie />}
            />
            <Route
              path="/all-store-subcategories"
              element={<AllStoreSubCate />}
            />
            <Route
              path="/add-store-subcategory"
              element={<CreateStoreSunCate />}
            />
            <Route
              path="/edit-subcategory/:id"
              element={<EditStoreSubCate />}
            />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/add-product" element={<CreateProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/all-brands" element={<AllBrands />} />
            <Route path="/add-brand" element={<CreateBrand />} />
            <Route path="/edit-brand/:id" element={<EditBrand />} />
            <Route path="/all-store-orders" element={<AllStoreOrders />} />
            <Route path="/all-education-orders" element={<AllEduOrders />} />
            <Route
              path="/all-store-coupons"
              element={<AllCoupons type={"store"} />}
            />
            <Route
              path="/add-store-coupon"
              element={<CreateCoupon type={"store"} />}
            />
            <Route
              path="/edit-store-coupon/:id"
              element={<EditCoupon type={"store"} />}
            />
            <Route
              path="/all-education-coupons"
              element={<AllCoupons type={"education"} />}
            />
            <Route
              path="/add-education-coupon"
              element={<CreateCoupon type={"education"} />}
            />
            <Route
              path="/edit-education-coupon/:id"
              element={<EditCoupon type={"education"} />}
            />
            <Route path="/add-userPackage" element={<AddUserToPackage />} />
            <Route
              path="/remove-userPackage"
              element={<RemoveUserToPackage />}
            />
            <Route
              path="/createInvoiceForAllUsers"
              element={<CreateInvoiceForAllUsers />}
            />
            <Route path="/purchae-with-user" element={<PurchaeWithUser />} />
            <Route path="/market-log/:id" element={<MarketLog />} />
            <Route path="/all-requests" element={<AllMarketingRequests />} />
            <Route path="/all-withdraw-req" element={<WithdrawReq />} />
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
