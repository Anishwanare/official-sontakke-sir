import React from "react";
import Header from "../Components/Header";
import DropDown from "../Components/Dropdown";
import Hero from "../Components/Hero";
import Guide from "../Components/Guide";
import About from "../Components/About";
import Features from "../Components/Features";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import Founders from "../Components/Founders";

const Home = () => {
  return (
    <div className="min-h-screen  ">
      
      <Hero />
      {/* <Guide /> */}
      <About />
      <Founders/>
      <Features />
      <Contact />
    </div>
  );
};
export default Home;
