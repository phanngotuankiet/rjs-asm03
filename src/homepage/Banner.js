import React from "react";
import { Link } from "react-router-dom";
import banner1 from "../img/banner1.jpg";
import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <div className={styles.all}>
      <img src={banner1} className={styles.banner1} />
      <p className={styles.inspiration}>NEW INSPIRATION 2023</p>
      <h2>20% OFF ON NEW SEASON</h2>
      <Link to="/shop">
        <p className={styles.btn}>Browse collections</p>
      </Link>
    </div>
  );
}
