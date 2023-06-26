import React from "react";
import styles from "./ProductDisplayer.module.css";

export default function ProductDisplayer(props) {
  return (
    <div className={styles.all} onClick={props.openModal}>
      <img src={props.img1} width="270px" height="270px" />

      <p className={styles.productName}>{props.name}</p>

      <p className={styles.productPrice}>
        {Number(props.price).toLocaleString()} VND
      </p>
    </div>
  );
}
