import React from "react";
import styles from "./CartTotal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

export default function CartTotal() {
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

  // tính tổng giá tiền của toàn bộ sản phẩm trong giỏ
  function total(cart) {
    const totalPrice = cart.reduce((total = 0, product) => {
      total = total + Number(product.price);
      return total;
    }, 0);
    return totalPrice;
  }

  return (
    <div className={styles.all}>
      <h2>Cart Total</h2>

      <div className={styles.cartTotalContent}>
        <h4>
          <span>SUBTOTAL</span>
          <span>{Number(total(cartLocalStorage)).toLocaleString()} VND</span>
        </h4>

        <h4>
          <span>TOTAL</span>
          <p>{Number(total(cartLocalStorage)).toLocaleString()} VND</p>
        </h4>
      </div>

      <input placeholder="Enter your coupon" />
      <button>
        <FontAwesomeIcon icon={faGift} /> Apply coupon
      </button>
    </div>
  );
}
