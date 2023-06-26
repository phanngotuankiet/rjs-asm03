import styles from "./Login.module.css";
import loginStore from "../../store/loginStore";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "react-redux";

export default function Login() {
  // take values from input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // cái state này là để check coi thông tin nhập vào có tồn tại cái data piece y chang trong localStorage không
  // hàm trong biến này sẽ lấy toàn bộ những gì trong storage với key là "items"
  const users = JSON.parse(localStorage.getItem("users"));
  const yesEmailAndPasswordUserInputExistInLocalStorage =
    users &&
    users.some((user) => user.email === email && user.password === password);

  console.log(yesEmailAndPasswordUserInputExistInLocalStorage);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = users.find((user) => user.email === email);

    console.log(currentUser);

    if (yesEmailAndPasswordUserInputExistInLocalStorage) {
      loginStore.dispatch({
        type: "LOGIN",
        user: { name: currentUser.name },
      });

      console.log(loginStore.getState());

      alert("OK! All information exist");
      navigate("/");
    } else {
      loginStore.dispatch({
        type: "WRONGPASSWORD",
        user: null,
      });

      console.log(loginStore.getState());

      alert("One or two fields are incorrect, or not exist");
      setPassword("");
    }
  };

  return (
    <div className={styles.all}>
      <div className={styles.allContent}>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button>SIGN IN</button>
        </form>

        <p>
          <span>Create an account?</span> <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const mapStateToLoginStore = (state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

connect(mapStateToLoginStore)(Login);
