import React, { useEffect, useState } from "react";

import loginStore from "../store/loginStore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// fa icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [key, setKey] = useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  // vì dùng useEffect nên khi nhấn nút logout nó sẽ tự rerender lại cái sự thay đổi
  // vừa mới tạo đó là nhấn nút logout vào cái component menu bar này
  useEffect(() => {
    if (!isLoggedIn) {
      setKey((key) => key + 1);
    }
  }, [isLoggedIn]);

  // action creator for the logout button in menu bar connects to redux through 'connect'
  function logout() {
    const logoutYes = window.confirm("Are you sure you want to logout?");

    if (logoutYes) {
      dispatch({
        type: "LOGOUT",
      });

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("currentUser");

      navigate("/");
    }

    console.log(loginStore.getState().isAuthenticated);
  }

  return (
    <div className={styles.all} key={key}>
      <div className={styles.allContent}>
        <div className={styles.leftNav}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h5>Home</h5>
          </Link>

          <Link to="/shop" style={{ textDecoration: "none" }}>
            <h5>Shop</h5>
          </Link>
        </div>

        <div className={styles.logo}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2>BOUTIQUE</h2>
          </Link>
        </div>

        <div className={styles.rightNav}>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <h5>
              <FontAwesomeIcon icon={faCartShopping} /> Cart
            </h5>
          </Link>

          {currentUser ? (
            <h5>
              <FontAwesomeIcon icon={faUser} /> {currentUser.name}{" "}
              <FontAwesomeIcon icon={faCaretDown} />
              <span style={{ textDecoration: "none" }} onClick={logout}>
                (Logout)
              </span>
            </h5>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <h5>
                <FontAwesomeIcon icon={faUser} /> Login
              </h5>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
