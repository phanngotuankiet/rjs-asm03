import React from "react";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import styles from "./CartPage.module.css";
import LoadUsersCart from "./CartPage's/LoadUsersCart";

export default function CartPage() {
  return (
    <>
      <NavBar />

      <div className={styles.all}>
        <div className={styles.cartBanner}>
          <h1>CART</h1>

          <span>CART</span>
        </div>

        <h2>SHOPPING CART</h2>

        <LoadUsersCart />
      </div>

      <Footer />
    </>
  );
}
