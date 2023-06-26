import React from "react";
import Footer from "../layouts/Footer";
import NavBar from "../layouts/NavBar";
import Banner from "../homepage/Banner";
import Categories from "../homepage/Categories";
import OtherInformation from "../homepage/OtherInformation";
import ListOfProducts from "../homepage/ListOfProducts";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Banner />
      <Categories />
      <ListOfProducts />

      <OtherInformation />

      <Footer />
    </>
  );
}
