import React from "react";
import EmailSubscription from "./EmailSubscription";
import styles from "./OtherInformation.module.css";

export default function OtherInformation() {
  return (
    <div className={styles.all}>
      <div className={styles.allContent}>
        <div className={styles.g1}>
          <div>
            <h3>FREE SHIPPING</h3>
            <p>Free shipping worldwide</p>
          </div>
        </div>

        <div className={styles.g2}>
          <div>
            <h3>24 X 7 SERVICE</h3>
            <p>Free shipping worldwide</p>
          </div>
        </div>

        <div className={styles.g3}>
          <div>
            <h3>FESTIVAL OFFER</h3>
            <p>Free shipping worldwide</p>
          </div>
        </div>
      </div>

      <EmailSubscription />
    </div>
  );
}
