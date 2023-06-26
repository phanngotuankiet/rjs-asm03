import React, { useEffect, useState } from "react";
import styles from "./NumberInput.module.css";

// import the fa icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

function NumberInput(props) {
  const [value, setValue] = useState(props.value);
  // lấy value của key cart về nhét vào state trong NumberInput này
  const [usersCart, setUsersCart] = useState([]);

  useEffect(() => {
    // retrieve the cart of the current logging in user
    const cartLocalStorage = JSON.parse(localStorage.getItem("cart") || []);

    if (Array.isArray(cartLocalStorage)) {
      setUsersCart(cartLocalStorage);
    }
  }, []);

  const handleDecrease = (itemToRemove) => {
    setValue(value - 1);
    const indexToRemove = usersCart.findIndex(
      (item) => item._id.$oid === itemToRemove._id.$oid
    );
    // nếu như tìm được item đó trong usersCart thì tiến hành remove, còn không thì skip
    if (indexToRemove !== -1) {
      const newDecreasedCart = [...usersCart];
      newDecreasedCart.splice(indexToRemove, 1);
      setUsersCart(newDecreasedCart);

      localStorage.setItem("cart", JSON.stringify(newDecreasedCart));
      console.log(newDecreasedCart);
    }
  };

  const handleIncrease = () => {
    setValue(value + 1);
    const newIncreasedCart = [...usersCart, props.eachProductItem];
    setUsersCart(newIncreasedCart);

    localStorage.setItem("cart", JSON.stringify(newIncreasedCart));
    console.log(newIncreasedCart);
  };

  return (
    <div className={styles.all}>
      <span onClick={() => handleDecrease(props.eachProductItem)}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </span>

      <input type="number" value={value} readOnly />

      <span onClick={() => handleIncrease()}>
        <FontAwesomeIcon icon={faCaretRight} />
      </span>
    </div>
  );
}

export default NumberInput;
