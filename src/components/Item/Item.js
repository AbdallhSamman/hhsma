import { StarIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import "./Item.css";
import "swiper/css/bundle";
import { CKEditor } from "ckeditor4-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { db } from "../Firebase/firebase";
import { useParams ,useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { Pagination } from "swiper"; 

function Item() {
  const [{ basket }, dispatch] = useStateValue();
  const [item, setItem] = useState([]);
  const [related, setRelated] = useState([]);
  let product = [];
  let slider = [];
  let stars = [];
  const navigate=useNavigate();

  const params = useParams();
  const itemId = params.itemId;
  const category = params.category;

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id:item[0].product_id,
        title: item[0].product_name,
        image: item[0].product_images,
        price: item[0].product_price,
        rating: item[0].product_rating/item[0].product_users_rating,
      },
    });
    localStorage.setItem("cart", JSON.stringify(basket));

  }
  const buynow=()=>{
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: item[0].product_id,
        title: item[0].product_name,
        image: item[0].product_images,
        price: item[0].product_price,
        rating: item[0].product_rating/item[0].product_users_rating,
      },
    });
    localStorage.setItem("cart", JSON.stringify(basket));
    navigate('/payment')
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    db.collection("categories")
      .where("category_name", "==", category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let products = doc.data().products;
          slider.push(products);
          setRelated(slider);
          products.forEach((e) => {
            if (e.product_id == itemId) {
              product.push(e);
              setItem(product);
            }
          });
        });
      });
  }, []);

  let sliders = related[0]?.map((e, i) => {
    return (
      <Link to={`/item/${e.product_category}/${e.product_id}`}>
        <SwiperSlide key={i + 2000}>
          <div>
            <img
              style={{ width: "300px", height: "200px", objectFit: "contain" }}
              className="object-contain"
              src={e.product_images[0]}
              alt="item"
            />
            <p className="text-[rgb(0,113,133)] mt-4">{e?.product_name}</p>
            {Array(Math.floor(e.product_rating / e.product_users_rating))
              .fill()
              .map((_, i) => (
                <StarIcon
                  className="h-3 inline-block text-yellow-500"
                  key={i + 1001}
                />
              ))}
            <span className="blue__green">
              {" "}
              {`(${e ? e.product_users_rating : ""})`}
            </span>
            <h5>
              <span className="color__single a-size-medium">
                {e?.product_price} JOD
              </span>
            </h5>
          </div>
        </SwiperSlide>
      </Link>
    );
  });

  for (
    let i = 0;
    i < item[0]?.product_rating / item[0]?.product_users_rating;
    i++
  ) {
    stars.push(
      <span>
        <StarIcon className="h-5 w-5 text-yellow-400 inline-block" />
      </span>
    );
  }

  return (
    <div className="bg-white outline outline-[43px] outline-white">
      <div className="mx-5 my-10 bg-white">
        <div className="contentsHeader md:grid md:gap-10 md:grid-cols-3 sm:grid-cols-2">
          <div className="card__left">
            <div>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  width: "300px",
                }}
                slidesPerView={1}
                spaceBetween={20}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                {item[0]?.product_images.map((e) => {
                  return (
                    <>
                      <SwiperSlide>
                        <img src={e} />
                      </SwiperSlide>
                    </>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="card__mid">
            <h1 className="a-size-large color__single mb-1">
              {item[0]?.product_name}
            </h1>
            <div className="mb-2">
              {stars}
              <span className="blue__green">{`(${
                item[0] ? item[0].product_users_rating : ""
              })`}</span>
            </div>
            <hr />
            <div className="a-size-medium color__single mt-4">
              About this item
            </div>
            <p className="a-size-p mt-2">{item[0]?.product_description}</p>
          </div>
          <aside className="card__right">
            <p className="color__single a-size-medium">
              {item[0]?.product_price}
              <span>JOD</span>
            </p>
            <p className="text-green-600">In Stock.</p>
            <br />
            
            <button className="button w-full rounded-2xl mb-2" onClick={addToBasket}>
              Add to Cart
            </button>
            <button id="buy" className="button w-full rounded-2xl" onClick={buynow}>Buy Now</button>
            <p className="text-sm text-gray-500 mt-2">Ships from Amazon.com</p>
          </aside>
        </div>

        <hr className="hr__singe" />
        <div className="conHeader">
          <h3 className="secHeader a-size-medium">Top rated from our brands</h3>
          <Swiper
            style={{ marginBottom: "70px" }}
            slidesPerView={4}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper cursor-pointer "
          >
            {sliders}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Item;
