import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import "./Home.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "@mui/material/Slider";
import { StarIcon } from "@heroicons/react/solid";
import Videos from "../Videoes/Videos";
import { useNavigate } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { db } from "../Firebase/firebase";
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";
import Loading from "../Loading/Loading";
// install Swiper modules
SwiperCore.use([Navigation]);

function Home() {
  const [products, setProducts] = useState([]);
  const [filter_products, setProductsFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState(999);
  const [rateFilter, setRateFilter] = useState(5);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let product = [];
  let searchBar;
  let button;
  try{
     searchBar = document.getElementById("search");
     button = document.getElementById("searchButton");
  }catch(error){
    searchBar = document.getElementById("root");
    button=document.getElementById("root");
  }

  const returnProduct = (element) => {
    let found = 0;
 
    const prod = element.map((elemento, index) => {
      if (elemento.product_price <= priceFilter) {
        let proRate = elemento.product_rating / elemento.product_users_rating;
        if (proRate <= rateFilter) {
          if (
            elemento.product_name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            elemento.product_description
              .toLowerCase()
              .includes(search.toLowerCase())||
              elemento.product_category
                .toLowerCase()
                .includes(search.toLowerCase())
          ) {
            found += 1;
            return (
              <Product
                key={elemento.product_id + 3000}
                id={elemento.product_id}
                category={elemento.product_category}
                title={elemento.product_name}
                price={elemento.product_price}
                description={elemento.product_description}
                image={elemento.product_images[0]}
                rating={Math.floor(
                  elemento.product_rating / elemento.product_users_rating
                )}
              />
            );
          } else if (found === 0) {
            return (
              <div>
                <h1>
                  There is no Item found <br></br>Check Spelling please or try
                  another keyword{" "}
                </h1>
              </div>
            );
          }
        }
      }
    });
    return prod;
  };

  const unfilter = () => {
    setPriceFilter(999);
    setRateFilter(5);
  };

  useEffect(() => {
    const items = localStorage.getItem("items");
    // if (items) {
    //   setProducts(JSON.parse(items));
    //   return;
    // }
    db.collection("categories")
      .orderBy("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docs) => {
          product.push(docs.data().products);
        });
      try{ searchBar.addEventListener("change", () => {
        setSearch(searchBar.value);
        setProductsFilter(product);
        setProducts(product);
        console.log("i am herre")
      });}catch(err){console.log(err)}
       
        setProducts(product);
        localStorage.setItem("items", JSON.stringify(product));
        setProductsFilter(product);
        setLoading(true);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <Swiper navigation={true} className="mySwiper">
          <SwiperSlide>
            <img
              className="home__image swiper-image"
              src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
              alt="home_img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="home__image swiper-image"
              src="https://m.media-amazon.com/images/I/51r+YpWo9rL._SX1500_.jpg"
              alt="home_img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="home__image swiper-image"
              src="https://m.media-amazon.com/images/I/51r+YpWo9rL._SX1500_.jpg"
              alt="home_img"
            />
          </SwiperSlide>
        </Swiper>

        <div className="product__home product__home__span2  grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading === false ? (
            <Loading />
          ) : (
            filter_products
              .slice(0, 4)
              .map((elee, index) => returnProduct(elee))
          )}
        </div>
        <img
          width={"100%"}
          className="md:col-span-full"
          src="https://links.papareact.com/dyz"
          alt=""
        />
        <div className="product__home__span2 grid grid-flow-row-dense md:col-span-2 sm:grid-cols-2 md:grid-cols-2">
          {filter_products
            .slice(0, 1)
            .map((elee, index) => returnProduct(elee))}
        </div>
        <Videos />
      </div>
    </div>
  );
}
export default Home;
