import React from "react";
import styles from "./CheckOutPage.module.css";
import Footer from "../layouts/Footer";
import NavBar from "../layouts/NavBar";
import YourOrder from "./YourOrder";

export default function CheckOutPage() {
  return (
    <>
      <NavBar />

      <div className={styles.all}>
        <div className={styles.banner}>
          <h1>CHECKOUT</h1>

          <h5>CHECKOUT</h5>
        </div>

        <div className={styles.billingDetails}>
          <div>
            <h2>BILLING DETAILS</h2>

            <form>
              <p>FULL NAME:</p>
              <input type="text" placeholder="Enter Your Full Name Here!" />

              <p>EMAIL:</p>
              <input type="email" placeholder="Enter Your Email Here!" />

              <p>PHONE NUMBER:</p>
              <input type="tel" placeholder="Enter Your Full Number Here!" />

              <p>ADDRESS:</p>
              <input type="text" placeholder="Enter Your Address Here!" />
            </form>

            <button>Place order</button>
          </div>

          <YourOrder />
        </div>
      </div>

      <Footer />
    </>
  );
}
