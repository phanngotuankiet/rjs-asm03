import React from "react";
import styles from "./EmailSubscription.module.css";

export default function EmailSubscription() {
  return (
    <div className={styles.all}>
      <div className={styles.allContent}>
        <div className={styles.g1}>
          <h3>LET'S BE FRIENDS!</h3>
          <p>Nisi nisi tempor consequat laboris nisi.</p>
        </div>

        <div className={styles.g2}>
          <input placeholder="Enter your email address" type="email" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}
