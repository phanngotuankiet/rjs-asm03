import React from "react";
import Footer from "../layouts/Footer";
import NavBar from "../layouts/NavBar";
import SignUpForm from "../Login/Sign Up/SignUpForm";
import styles from "./SignUpPage.module.css";

export default function SignUpPage() {
  return (
    <>
      <NavBar />

      <div className={styles.all}>
        <SignUpForm />
      </div>

      <Footer />
    </>
  );
}
