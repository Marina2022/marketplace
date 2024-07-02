import s from './ProductSlider.module.scss'

import {Swiper, SwiperSlide} from 'swiper/react';
import {Thumbs} from 'swiper/modules';


import {useState} from "react";

import 'swiper/css';
import {BASE_URL} from "@/consts/baseURL.js";

const ProductSlider = ({images, currentImage}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(currentImage);
  const handleThumbnailClick =   (index) => {
    if (mainSwiper) mainSwiper.slideTo(index);
    if (thumbsSwiper) thumbsSwiper.slideTo(index);
  };

  return (
      <div>
        <Swiper
            className={s.mainSlider}
            modules={[Thumbs]} thumbs={{swiper: thumbsSwiper}}
            spaceBetween={50}
            slidesPerView={1}
            loop
            initialSlide={currentImage}
            onSwiper={setMainSwiper}
            onSlideChange={() =>  {
              if (mainSwiper) {
                setActiveIndex(mainSwiper.realIndex)
              }
              
            }}
        >

          {
            images.map((image, i) => {
                  return (
                      <SwiperSlide key={i} >

                        <img className={s.slideImage} src={`${BASE_URL}${image.imageUrl}`} alt=""/>

                      </SwiperSlide>)
                }
            )
          }

        </Swiper>


        {/*Второй слайдер - thumbSlider*/}
        
        <Swiper
            
            className={s.thumbSlider}
            modules={[Thumbs]}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            slidesPerView={6}
            spaceBetween={8}
            onSlideChange={() =>  {
              // setActiveIndex(thumbsSwiper.realIndex )              
            }}
        >

          {
            images.map((image, i) => {              
                  return (
                      <SwiperSlide onClick={()=>handleThumbnailClick(i) } className={thumbsSwiper && activeIndex === i ? s.thumbnailSlideActive :  s.thumbnailSlide} key={i}>
                        <img className={s.slideImage} src={`${BASE_URL}${image.imageUrl}`} alt=""/>
                      </SwiperSlide>)
                }
            )
          }        
      </Swiper>
</div>


)
  ;
};

export default ProductSlider;