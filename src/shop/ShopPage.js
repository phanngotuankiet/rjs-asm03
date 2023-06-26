import React from "react";
import styles from "./ShopPage.module.css";
import Footer from "../layouts/Footer";
import NavBar from "../layouts/NavBar";
import CategoriesWidget from "./CategoriesWidget";

export default function ShopPage() {
  return (
    <div>
      <NavBar />

      <div className={styles.all}>
        <div className={styles.shopBanner}>
          <h1>SHOP</h1>

          <span>SHOP</span>
        </div>

        <CategoriesWidget />
      </div>

      <Footer />
    </div>
  );
}
