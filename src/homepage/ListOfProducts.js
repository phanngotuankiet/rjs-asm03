import React, { useEffect, useState } from "react";
import styles from "./ListOfProducts.module.css";
import ProductDisplayer from "./ProductDisplayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ListOfProducts() {
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eachProductData, setEachProductData] = useState({});

  function fetchProducts() {
    fetch(
      "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // open and clode modal functions
  const openModal = (product) => {
    setEachProductData(product);

    console.log(eachProductData);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const navigate = useNavigate();

  const viewDetails = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.all}>
      <div className={styles.allContent}>
        <p>MADE THE HARD WAY</p>
        <h3>TOP TRENDING PRODUCTS</h3>

        <div className={styles.grid}>
          {products.map((inside) => (
            <ProductDisplayer
              img1={inside.img1}
              name={inside.name}
              price={inside.price}
              openModal={() => openModal(inside)}
            />
          ))}
        </div>
      </div>

      {/* here shows the modal of each product details whenever a product is clicked, and close the modal */}
      <div className={styles.modalPopsHere}>
        {modalIsOpen && (
          <div className={styles.backgroundModal}>
            <div className={styles.modal}>
              <img src={eachProductData.img1} width="400px" height="400px" />

              <div className={styles.contentModalRight}>
                <div className={styles.close} onClick={closeModal}>
                  x
                </div>
                <h3>{eachProductData.name}</h3>

                <p className={styles.priceOnModal}>
                  {Number(eachProductData.price).toLocaleString()} VND
                </p>

                <p className={styles.shortDesc}>{eachProductData.short_desc}</p>

                <button onClick={() => viewDetails(eachProductData._id.$oid)}>
                  <FontAwesomeIcon icon={faShoppingCart} /> View Detail
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
