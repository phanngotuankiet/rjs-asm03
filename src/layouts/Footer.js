import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.all}>
      <div className={styles.allContent}>
        <div className={styles.f1}>
          <h3>CUSTOMER SERVICES</h3>

          <h5>Help & Contact Us</h5>
          <h5>Returns & Refunds</h5>
          <h5>Online Stores</h5>
          <h5>Terms & Conditions</h5>
        </div>

        <div className={styles.f2}>
          <h3>COMPANY</h3>

          <h5>What We Do</h5>
          <h5>Available Services</h5>
          <h5>Latest Posts</h5>
          <h5>FAQs</h5>
        </div>

        <div className={styles.f3}>
          <h3>SOCIAL MEDIA</h3>

          <h5>Twitter</h5>
          <h5>Instagram</h5>
          <h5>Facebook</h5>
          <h5>Pinterest</h5>
        </div>
      </div>
    </div>
  );
}
