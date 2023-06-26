import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUpForm.module.css";

export default function SignUpForm() {
  const [nameInputField, setNameInputField] = useState("");
  const [emailInputField, setEmailInputField] = useState("");
  const [passwordInputField, setPasswordInputField] = useState("");
  const [phoneNumberInputField, setPhoneNumberInputField] = useState("");

  // check if email is already in localstorage
  const [emailIsRegistered, setEmailIsRegistered] = useState(false);

  // this state related to click on and blur off the email field only
  const [inputFocusE, setInputFocusE] = useState(false);
  // this state related to click on and blur off the password field only
  const [inputFocusP, setInputFocusP] = useState(false);

  function isEmailRegistered(event) {
    // get input from the email input field
    let emailInput = event.target.value;
    setEmailInputField(emailInput);
    // get the key "users" in localstorage with value which is a string of users' accounts
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // then returns the result true/false after checking if there is email with same as email
    // value passed in the parameter field of this function
    setEmailIsRegistered(users.some((user) => user.email === emailInput));

    console.log(emailInputField);

    let checkIfAlreadyRegisteredYetWhenItsNotOnClicked = users.some(
      (user) => user.email === emailInputField
    );

    return emailIsRegistered && checkIfAlreadyRegisteredYetWhenItsNotOnClicked;
  }

  function checkAllFieldsFilled(event) {
    event.preventDefault();
    // Khi onSubmit form thì kiểm tra cái giá trị emailInputField lại lần nữa
    // với DB localstorage sẵn có
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // đảm bảo khi click submit form thì quét-tìm-trùng phải được chạy lại
    // lấy lại dữ liệu trong ô input email và lưu trữ trong 1 variable
    const sosanh = emailInputField;
    // biến này tìm quét value trong toàn bộ localstorage với từ khoá email
    // càng quét nó càng so sánh cái .email đó với const var sosanh vốn
    // lưu dữ liệu trong ô email đã nhập trước khi click submit btn
    let checkValidEmailFieldAgain = users.some((user) => user.email === sosanh);
    // và checkValidEmailFieldAgain sẽ trả về true hoặc false

    setEmailIsRegistered(users.some((user) => user.email === emailInputField));

    // this variable is created to check if all data input on form are valid
    let valid =
      emailIsRegistered == false &&
      passwordInputField.length > 8 &&
      nameInputField.length > 0 &&
      emailInputField.length > 0 &&
      phoneNumberInputField.length > 0;

    if (valid && !checkValidEmailFieldAgain) {
      alert(
        "All fields are filled and the input informations are registered successfully."
      );

      // wrap all data in the form when validation confirms all are valid
      let wrapSignUpFormData = {
        name: nameInputField,
        email: emailInputField,
        password: passwordInputField,
        phone: phoneNumberInputField,
      };

      console.log(wrapSignUpFormData);

      // Push up input-fielded data after checking that entered email is not avai. in localstorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(wrapSignUpFormData);
      localStorage.setItem("users", JSON.stringify(users));

      return true;
    } else {
      alert(
        "Please fill all input fields and make sure the email you entered is not yet registered!"
      );
      return false;
    }
  }

  return (
    <div className={styles.all}>
      <div className={styles.allContent}>
        <h1>Sign Up</h1>
        <form onSubmit={checkAllFieldsFilled}>
          <input
            type="text"
            s
            id="fullname"
            placeholder="Full Name"
            name="fullName"
            onChange={(event) => setNameInputField(event.target.value)}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={isEmailRegistered}
            onClick={() => setInputFocusE(true)}
            onBlur={() => setInputFocusE(false)}
            required
          />

          {emailIsRegistered && inputFocusE
            ? "Email is already registered!"
            : ""}

          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(event) => setPasswordInputField(event.target.value)}
            onClick={() => setInputFocusP(true)}
            onBlur={() => setInputFocusP(false)}
            required
          />

          {passwordInputField.length > 8 || !inputFocusP
            ? ""
            : "Password length must be greater than 8 digits"}

          <input
            type="tel"
            id="phone"
            placeholder="Phone"
            name="phoneNumber"
            onChange={(event) => setPhoneNumberInputField(event.target.value)}
          />
          <button type="submit">SIGN UP</button>
        </form>
        <p>
          <span>Login?</span> <Link to="/login">Click</Link>
        </p>
      </div>
    </div>
  );
}
