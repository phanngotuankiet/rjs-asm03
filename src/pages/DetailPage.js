import React, { useState, useEffect } from "react";

import styles from "./DetailPage.module.css";

// import the fa icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useParams } from "react-router-dom";
import Footer from "../layouts/Footer";
import NavBar from "../layouts/NavBar";
import cartStore from "../store/cartStore";

export default function DetailPage() {
  const [allProductsFetch, setAllProductsFetch] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
      );
      const data = await response.json();
      setAllProductsFetch(data);
    } catch (error) {
      console.error(error);
    }
  }

  const { id } = useParams();
  const getID = id;

  // here writes a find() function to seek for the same id that can be found in the above api data fetching from the useParams {id} variable we have
  const retrievedData = allProductsFetch.find(
    (productDetails) => productDetails._id.$oid === getID
  );

  // làm một hàm lấy về những sản phẩm có category giống với category nạp vào ở parameter
  const getSameCategoryProducts = (getInCategory, getInID) => {
    return allProductsFetch.filter(
      (product) =>
        product.category === getInCategory && product._id.$oid !== getInID
    );
  };
  // console.log(getSameCategoryProducts("airpod"));

  // cho cặp nút tăng giảm số lượng bỏ vào cart
  const [value, setValue] = useState(1);
  const handleDecrease = () => {
    setValue(value - 1);
  };
  const handleIncrease = () => {
    setValue(value + 1);
  };

  // để trigger redux store's action vào redux store
  const addToCart = (product) => ({
    type: "ADD_TO_CART",
    payload: product,
  });

  const addCart = (retrievedData) => {
    // add that product to redux store
    cartStore.dispatch(addToCart(retrievedData));

    // then save to localstorage
    const cartDataFromStorage = localStorage.getItem("cart");
    let cartData = cartDataFromStorage ? JSON.parse(cartDataFromStorage) : [];
    cartData.push(retrievedData);
    localStorage.setItem("cart", JSON.stringify(cartData));

    // check the cart store if it's added ok
    console.log("from lcstr", JSON.parse(localStorage.getItem("cart")));
    console.log(cartStore.getState());
  };

  const [currentClickedImage, setCurrentClickedImage] = useState(null);
  const theCurrentProductImg = (e) => {
    // const currentProductDataFetch = allProductsFetch.find(
    //   (productDetails) => productDetails._id.$oid === getID
    // );
    // const keys = Object.keys(currentProductDataFetch);
    // const img = currentProductDataFetch[keys.indexOf("img")];
    // console.log(img);
    setCurrentClickedImage(e.target.src);
  };

  const navigate = useNavigate();

  const viewDetails = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <NavBar />
      <div className={styles.all}>
        {retrievedData ? (
          <div>
            <div className={styles.upper}>
              {/* images displayed to the left */}
              <div className={styles.images}>
                <img
                  src={retrievedData.img1}
                  height="100px"
                  onClick={theCurrentProductImg}
                  style={{ display: "block" }}
                />
                <img
                  src={retrievedData.img2}
                  height="100px"
                  onClick={theCurrentProductImg}
                  style={{ display: "block" }}
                />
                <img
                  src={retrievedData.img3}
                  height="100px"
                  onClick={theCurrentProductImg}
                  style={{ display: "block" }}
                />
                <img
                  src={retrievedData.img4}
                  height="100px"
                  onClick={theCurrentProductImg}
                  style={{ display: "block" }}
                />
              </div>

              {/* chỗ này display hình bấm vào */}
              {currentClickedImage ? (
                <img src={currentClickedImage} height="440px" width="440px" />
              ) : (
                <img src={retrievedData.img1} height="440px" width="440px" />
              )}

              {/* information short described to the right */}
              <div className={styles.rightInformation}>
                <h1>{retrievedData.name}</h1>
                <h3>{Number(retrievedData.price).toLocaleString()} VND</h3>
                <p className={styles.upperDesc}>{retrievedData.short_desc}</p>
                <span>
                  <span className={styles.categoryLabel}>CATEGORY:</span>{" "}
                  <span className={styles.category}>
                    {retrievedData.category}
                  </span>
                </span>

                <div className={styles.allQuantity}>
                  <div className={styles.quantityBtn}>
                    <p>QUANTITY</p>

                    <div className={styles.inDeValue}>
                      <button type="button" onClick={handleDecrease}>
                        <FontAwesomeIcon icon={faCaretLeft} />
                      </button>

                      <input type="text" value={value} readOnly />

                      <button type="button" onClick={handleIncrease}>
                        <FontAwesomeIcon icon={faCaretRight} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => addCart(retrievedData)}
                    className={styles.addCartBtn}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {/* long description to the bottom */}
            <div className={styles.shortDescBottom}>
              <p className={styles.descLabel}>DESCRIPTION</p>
              <span>PRODUCT DESCRIPTION</span>

              <p className={styles.longDesc}>
                {retrievedData.long_desc.split("\n\n")}
              </p>

              <h3>RELATED PRODUCTS</h3>

              {getSameCategoryProducts(
                retrievedData.category,
                retrievedData._id.$oid
              ).map((product) => (
                <div
                  style={{ width: 220 + "px", cursor: "pointer" }}
                  onClick={() => viewDetails(product._id.$oid)}
                >
                  <img src={product.img1} width="220px" height="220px" />
                  <p className={styles.relatedProductName}>{product.name}</p>
                  <p className={styles.relatedProductPrice}>
                    {Number(product.price).toLocaleString()} VND
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
}
