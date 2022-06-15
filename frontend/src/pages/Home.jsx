import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";

function Home() {
  return (
    <>
      <Header />
      <Carousel />
      <Hero />
    </>
  );
}

export default Home;
