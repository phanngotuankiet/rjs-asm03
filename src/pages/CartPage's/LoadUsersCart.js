import React, { useEffect, useState } from "react";
import styles from "./LoadUsersCart.module.css";

import NumberInput from "./NumberInput";

// import the fa icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import cartStore from "../../store/cartStore";
import { Link } from "react-router-dom";
import CartTotal from "./CartTotal";

export default function LoadUsersCart({}) {
  const [toRender, setTorender] = useState(0);
  const [usersCart, setUsersCart] = useState([]);

  useEffect(() => {
    // retrieve the cart of the current logging in user
    const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || []);

    if (Array.isArray(cartLocalStorage)) {
      setUsersCart(cartLocalStorage);
    }
    setTorender((toRender) => toRender + 1);
  }, []);

  console.log(usersCart);

  const removeProduct = (product) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      cartStore.dispatch({ type: "REMOVE_FROM_CART", payload: product });
      console.log(cartStore.getState());
    }
  };

  function countBooksById(books, id) {
    let count = 0;
    for (let i = 0; i < books.length; i++) {
      if (books[i]._id.$oid === id) {
        count++;
      }
    }
    console.log("ok");
    return count;
  }

  function booksDisplayer(books) {
    const uniqueBooks = books.reduce((uniqueBooks, book) => {
      const existingBook = uniqueBooks.find(
        (b) => b._id.$oid === book._id.$oid
      );
      if (!existingBook) {
        uniqueBooks.push(book);
      }
      return uniqueBooks;
    }, []);

    return uniqueBooks;
  }
  // return ra danh sách book cart mà không bị lặp lại
  const uniqueBooks = booksDisplayer(usersCart);

  return (
    <div key={toRender} className={styles.all}>
      <div className={styles.upper}>
        <table>
          <tr>
            <th>IMAGE</th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th>REMOVE</th>
          </tr>

          {uniqueBooks.map((eachProductItem) => (
            <tr key={eachProductItem._id.$oid}>
              <td>
                <img src={eachProductItem.img1} width="50px" height="50px" />
              </td>
              <td>
                <h4>{eachProductItem.name}</h4>
              </td>
              <td>
                <p>{Number(eachProductItem.price).toLocaleString()}</p>
                <p>VND</p>
              </td>

              <td>
                <p>
                  <NumberInput
                    value={countBooksById(usersCart, eachProductItem._id.$oid)}
                    eachProductItem={eachProductItem}
                  />
                </p>
              </td>

              {/* giá tiền tổng dựa trên số lượng sản phẩm */}
              <td>
                <p>
                  {Number(
                    countBooksById(usersCart, eachProductItem._id.$oid) *
                      eachProductItem.price
                  ).toLocaleString()}
                  <p>VND</p>
                </p>
              </td>

              <td>
                <p
                  className={styles.removeIcon}
                  onClick={() => removeProduct(eachProductItem)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </p>
              </td>
            </tr>
          ))}
        </table>

        <CartTotal />
      </div>

      <div className={styles.shoppingCheckout}>
        <p>
          <FontAwesomeIcon icon={faArrowLeft} />
          <Link
            style={{ textDecoration: "none", marginLeft: "6px" }}
            to="/shop"
          >
            Continue shopping
          </Link>
        </p>

        <p>
          <Link
            style={{ textDecoration: "none", marginRight: "6px" }}
            to="/checkout"
          >
            Proceed to checkout
          </Link>
          <FontAwesomeIcon icon={faArrowRight} />
        </p>
      </div>
    </div>
  );
}
