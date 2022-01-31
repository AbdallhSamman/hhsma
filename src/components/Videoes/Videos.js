import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Videos.css";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";

function Videos() {
  return (
    <div className="videos">
      <div className="videos__container">
        <h1 className="videos__title">Amazon Related Videos</h1>
        <ul className="videos__items">
          <Swiper navigation={true} className="mySwiper">
            <SwiperSlide>
              <li className="videos__singleVideo" key={1}>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/66qOop6J8Q8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </li>
            </SwiperSlide>
            <SwiperSlide>
              <li className="videos__singleVideo" key={2}>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/YORgJwW9xxQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </li>
            </SwiperSlide>
            <SwiperSlide>
              <li className="videos__singleVideo" key={3}>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/DpNJ4DBn-t8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </li>
            </SwiperSlide>
          </Swiper>
        </ul>
      </div>
    </div>
  );
}

export default Videos;
