import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "./side.css";
import { AppContext } from "../../App";

const Side = () => {
  const { login, setLogin, route, token } = useContext(AppContext);
  const linkClick = () => {
    document.querySelector(".side").classList.remove("side-show");
  };

  const logOut = (e) => {
    localStorage.clear();
    fetch(`${route}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => console.log(res));
  };
  return (
    <div className="side">
      {login ? (
        <Link to="/" className="logout" onClick={logOut}>
          تسجيل الخروج
        </Link>
      ) : null}
      <div className="links">
        <h2>General</h2>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={linkClick}
          to="/all-users"
        >
          all users
        </NavLink>
        <NavLink onClick={linkClick} to="/all-instructors">
          all instructors
        </NavLink>
        <NavLink onClick={linkClick} to="/add-users">
          create user / instructor
        </NavLink>
        <NavLink onClick={linkClick} to="/all-posts">
          All Posts
        </NavLink>

        <h2>Education</h2>
        <NavLink onClick={linkClick} to="/all-brokers">
          all brokers
        </NavLink>
        <NavLink onClick={linkClick} to="/create-broker">
          create broker
        </NavLink>
        <NavLink onClick={linkClick} to="/all-category">
          all categories
        </NavLink>
        <NavLink onClick={linkClick} to="/add-category">
          create categories
        </NavLink>
        <NavLink onClick={linkClick} to="/telegramChannels">
          All telegram channels
        </NavLink>
        <NavLink onClick={linkClick} to="/telegramChannels/new">
          Create telegram channel
        </NavLink>
        <NavLink onClick={linkClick} to="/all-courses">
          all courses
        </NavLink>
        <NavLink onClick={linkClick} to="/add-course">
          add course
        </NavLink>
        <NavLink onClick={linkClick} to="/all-lessons">
          all lesson
        </NavLink>
        <NavLink onClick={linkClick} to="/add-lesson">
          add lesson
        </NavLink>
        <NavLink onClick={linkClick} to="/all-lives">
          all lives
        </NavLink>
        <NavLink onClick={linkClick} to="/add-live">
          create live
        </NavLink>
        <NavLink onClick={linkClick} to="/all-packages">
          all packages
        </NavLink>
        <NavLink onClick={linkClick} to="/add-package">
          add packages
        </NavLink>
        <NavLink onClick={linkClick} to="/add-course-package">
          add course packages
        </NavLink>
        <NavLink onClick={linkClick} to="/add-userPackage">
          Add User To Package
        </NavLink>
        <NavLink onClick={linkClick} to="/remove-userPackage">
          remove User from Package
        </NavLink>

        <NavLink onClick={linkClick} to="/all-analytic">
          all analytic
        </NavLink>
        <NavLink onClick={linkClick} to="/add-analytic">
          add analytic
        </NavLink>
        <NavLink onClick={linkClick} to="/all-education-coupons">
          all education coupons
        </NavLink>
        <NavLink onClick={linkClick} to="/add-education-coupon">
          add education coupon
        </NavLink>
        <NavLink onClick={linkClick} to="/all-education-orders">
          all education orders
        </NavLink>
        <h2>Store</h2>
        <NavLink onClick={linkClick} to="/all-products">
          all products
        </NavLink>
        <NavLink onClick={linkClick} to="/add-product">
          add product
        </NavLink>
        <NavLink onClick={linkClick} to="/all-store-categories">
          all categories
        </NavLink>
        <NavLink onClick={linkClick} to="/add-store-category">
          add category
        </NavLink>

        <NavLink onClick={linkClick} to="/all-store-subcategories">
          all subCategories
        </NavLink>
        <NavLink onClick={linkClick} to="/add-store-subcategory">
          add subCategories
        </NavLink>
        <NavLink onClick={linkClick} to="/all-brands">
          all brands
        </NavLink>
        <NavLink onClick={linkClick} to="/add-brand">
          add brand
        </NavLink>
        <NavLink onClick={linkClick} to="/all-store-coupons">
          all store coupons
        </NavLink>
        <NavLink onClick={linkClick} to="/add-store-coupon">
          add store coupon
        </NavLink>
        <NavLink onClick={linkClick} to="/all-store-orders">
          all store orders
        </NavLink>

        <h2>advertisements</h2>
        <NavLink onClick={linkClick} to="/all-advertisements">
          all advertisements
        </NavLink>
        <NavLink
          style={{ marginBottom: "20px" }}
          onClick={linkClick}
          to="/add-advertisement"
        >
          add advertisement
        </NavLink>
        <h2>LandingPage</h2>
        <NavLink onClick={linkClick} to="/all-questions">
          all questions
        </NavLink>
        <NavLink onClick={linkClick} to="/add-question">
          add question
        </NavLink>
        <NavLink onClick={linkClick} to="/all-landing">
          all landing
        </NavLink>
        <NavLink onClick={linkClick} to="/add-landing">
          add landing
        </NavLink>
        <NavLink onClick={linkClick} to="/all-stories">
          all stories
        </NavLink>
        <NavLink onClick={linkClick} to="/add-story">
          add story
        </NavLink>
        <h2>Marketing </h2>
        <NavLink onClick={linkClick} to="/createInvoiceForAllUsers">
          Create Invoice For All Users
        </NavLink>
        <NavLink onClick={linkClick} to="/purchae-with-user">
          purchae with user{" "}
        </NavLink>
        <NavLink onClick={linkClick} to="/all-requests">
          All Marketing Requests
        </NavLink>

        <NavLink onClick={linkClick} to="/all-withdraw-req">
          All Withdraw requests
        </NavLink>
      </div>
    </div>
  );
};

export default Side;
