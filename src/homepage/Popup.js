import React, { useState } from "react";
import store from "../store/popupStore";

const SHOW_POPUP = "SHOW_POPUP";
const HIDE_POPUP = "HIDE_POPUP";

const Popup = ({ contentInside }) => {
  const [modal, setModal] = useState(store.getState().isOpen);

  // store.subscribe() này giống như cái useEffect khi mà cái giá trị thuộc
  // store's state ở trường hợp này là isOpen thay đổi, thì những gì ở
  // trong cái store.subscribe này sẽ được thực thi
  store.subscribe(() => {
    setModal(store.getState().isOpen);
  });

  const handleShowPopup = () => {
    store.dispatch({ type: SHOW_POPUP });
  };

  const handleHidePopup = () => {
    store.dispatch({ type: HIDE_POPUP });
  };
  return (
    <div>
      <button onClick={handleShowPopup}>Show Popup</button>

      {modal && (
        <div>
          <div>{contentInside}</div>
          <button onClick={handleHidePopup}>Hide Popup</button>
        </div>
      )}
    </div>
  );
};

export default Popup;
