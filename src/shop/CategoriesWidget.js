import React, { useEffect, useState } from "react";
import ProductDisplayerToDetail from "./ProductDisplayerToDetail";
import styles from "./CategoriesWidget.module.css";

export default function CategoriesWidget() {
  const [category, setCategory] = useState([]);

  const handleClick = (keyword) => {
    fetch(
      "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        );
        setCategory(filteredData);
      });
  };

  const allProductsFetch = () => {
    fetch(
      `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
    )
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      });
  };

  // auto fetch all products khi mới vào ShopPage
  useEffect(() => {
    allProductsFetch();
  }, []);

  const fetchAllProducts = () => {
    allProductsFetch();
  };

  const fetchIPhone = () => {
    handleClick("iphone");
  };

  const fetchIPad = () => {
    handleClick("ipad");
  };

  const fetchMacBook = () => {
    handleClick("macbook");
  };

  const fetchAirpod = () => {
    handleClick("airpod");
  };

  const fetchWatch = () => {
    handleClick("watch");
  };

  const fetchMouse = () => {
    handleClick("mouse");
  };

  const fetchKeyboard = () => {
    handleClick("keyboard");
  };

  const fetchOther = () => {
    handleClick("other");
  };
  // nhớ sửa chỗ này

  return (
    <div className={styles.shopPage}>
      <div className={styles.all}>
        <h3>CATEGORIES</h3>

        <div>
          <div className={styles.appleSquare}>
            <h4>APPLE</h4>
          </div>

          <div className={styles.productLine}>
            <a onClick={fetchAllProducts}>All</a>
          </div>

          <div className={styles.square}>
            <h4>IPHONE & MAC</h4>
          </div>

          <div className={styles.productLine}>
            <a onClick={fetchIPhone}>iPhone</a>
            <a onClick={fetchIPad}>iPad</a>
            <a onClick={fetchMacBook}>MacBook</a>
          </div>

          <div className={styles.square}>
            <h4>WIRELESS</h4>
          </div>

          <div className={styles.productLine}>
            <a onClick={fetchAirpod}>AirPods</a>
            <a onClick={fetchWatch}>Watch</a>
          </div>

          <div className={styles.square}>
            <h4>OTHER</h4>
          </div>

          <div className={styles.productLine}>
            <a onClick={fetchMouse}>Mouse</a>
            <a onClick={fetchKeyboard}>Keyboard</a>
            <a onClick={fetchOther}>Other</a>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.upperOfRightSideSearchFields}>
          <input placeholder="Enter search here!" />

          <div>
            <select id="priceSortingDropdown" name="priceSortingDropdown">
              <option value="defaultSorting">Default sorting</option>
              <option value="highToLow">Sort high to low</option>
              <option value="lowToHigh">Sort low to high</option>
              <option value="bestSelling">Best selling</option>
            </select>
          </div>
        </div>

        {/* here displays the product list to the right*/}
        <div className={styles.productList}>
          {category.map((inside) => (
            <ProductDisplayerToDetail
              id={inside._id.$oid}
              img1={inside.img1}
              name={inside.name}
              price={inside.price}
            />
          ))}
          OK
        </div>
      </div>
    </div>
  );
}
