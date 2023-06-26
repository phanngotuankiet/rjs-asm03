import React from "react";
import styles from "./ProductDisplayerToDetail.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductDisplayerToDetail({ id, img1, name, price }) {
  const navigate = useNavigate();

  const viewDetails = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.all}>
      <img
        src={img1}
        width="230px"
        height="230px"
        onClick={() => viewDetails(id)}
      />

      <h5 onClick={() => viewDetails(id)}>{name}</h5>
      <p>{Number(price).toLocaleString()} VND</p>
    </div>
  );
}
