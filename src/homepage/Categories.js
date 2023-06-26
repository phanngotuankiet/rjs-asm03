import React from "react";
import styles from "./Categories.module.css";
import product_1 from "../img/product_1.png";
import product_2 from "../img/product_2.png";
import product_3 from "../img/product_3.png";
import product_4 from "../img/product_4.png";
import product_5 from "../img/product_5.png";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className={styles.all}>
      <p>CAREFULLY CREATED COLLECTIONS</p>
      <h3>BROWSE OUR CATEGORIES</h3>

      <div className={styles.up}>
        <Link to="/shop">
          <img src={product_1} />
        </Link>

        <Link to="/shop">
          <img src={product_2} />
        </Link>
      </div>

      <div className={styles.down}>
        <Link to="/shop">
          <img src={product_3} />
        </Link>

        <Link to="/shop">
          <img src={product_4} />
        </Link>

        <Link to="/shop">
          <img src={product_5} />
        </Link>
      </div>
    </div>
  );
}
