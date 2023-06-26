import React, { useEffect, useState } from "react";
import styles from "./YourOrder.module.css";

export default function YourOrder() {
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

  const [hasProducts, setHasProducts] = useState(false);
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  // hàm này là để khi mà dùng hàm map() map tới sản phẩm nào thì trích id từ cái sản phẩm đó và
  // so với toàn bộ sản phẩm đang có ở mảng cart coi có bị lặp hay không, nếu bị lặp thì trả về
  // giá trị là lặp bao nhiêu lần, còn nếu như không lặp (=1) thì trả về 1
  function soLuongSP(mangGoc, sPhamTruyenVao) {
    return mangGoc.reduce((total = 0, sPhamHienTai) => {
      if (sPhamTruyenVao._id.$oid === sPhamHienTai._id.$oid) {
        total = total + 1;
      }
      return total;
    }, 0);
  }

  // hàm này để lọc ra các sản phẩm có cùng id trong mảng cart từ lcstr và đưa từng cái sản phẩm bị lặp
  // lẫn không bị lặp id vào 1 mảng riêng (useState productsToDisplay rồi chuyển useState hasProducts
  // thành đúng)
  const productsListToDisplay = () => {
    // mảng này là để chứa tất cả các sản phẩm mà không bị lặp id sản phẩm (trích xuất từ mảng cart
    // của localstorage)
    const arrayProductsToDisplay = [];
    for (let i = 0; i < cartLocalStorage.length; i++) {
      let isProductFound = false;
      for (let j = 0; j < arrayProductsToDisplay.length; j++) {
        if (
          cartLocalStorage[i]._id.$oid === arrayProductsToDisplay[j]._id.$oid
        ) {
          isProductFound = true;
          break;
        }
      }
      // nếu như spham đang quét qua trong mảng cart không bị lặp với 1 spham nào đang trong mảng local hàm
      // arrayProductsToDisplay thì push sản phẩm không lặp đó vào mảng local hàm arrayProductsToDisplay
      // rồi sau đó setProductsToDisplay cho cái state của hàm set này nguyên giá trị của mảng local hàm arrayProductsToDisplay này luôn, từ đây số lượng sản phẩm trong giỏ lớn hơn 0 nên setHasProducts bằng true
      if (!isProductFound) {
        arrayProductsToDisplay.push(cartLocalStorage[i]);

        setProductsToDisplay(arrayProductsToDisplay);

        setHasProducts(true);
      }
    }
  };
  useEffect(() => {
    productsListToDisplay();
  }, []);

  // tính xem tổng giá tiền của toàn bộ sản phẩm trong giỏ
  function total(cart) {
    const totalPrice = cart.reduce((total = 0, product) => {
      total = total + Number(product.price);
      return total;
    }, 0);
    return totalPrice;
  }

  return (
    <div className={styles.all}>
      <h2>Your Order</h2>

      {hasProducts ? (
        <div>
          {productsToDisplay.map((product) => (
            <p>
              <p key={product._id.$oid} className={styles.yourOrder}>
                <span className={styles.productName}>{product.name}</span>

                <span className={styles.productPrice}>
                  {Number(product.price).toLocaleString()} VND x{" "}
                  {soLuongSP(cartLocalStorage, product)}
                </span>
              </p>

              <hr
                style={{
                  borderColor: "#abaeb6",
                  borderStyle: "none",
                  borderTopStyle: "solid",
                  borderTopColor: "red",
                  borderWidth: "1px",
                }}
              />
            </p>
          ))}

          <p className={styles.total}>
            <span>TOTAL:</span>
            <span>{Number(total(cartLocalStorage)).toLocaleString()} VND</span>
          </p>
        </div>
      ) : (
        <p>No products in order</p>
      )}
    </div>
  );
}
