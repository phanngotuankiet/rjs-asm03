import React from "react";
import Footer from "../layouts/Footer";
import NavBar from "../layouts/NavBar";
import Login from "../Login/Login/Login";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div>
      <NavBar />

      <div className={styles.all}>
        <Login />
      </div>

      <Footer />
    </div>
  );
}
