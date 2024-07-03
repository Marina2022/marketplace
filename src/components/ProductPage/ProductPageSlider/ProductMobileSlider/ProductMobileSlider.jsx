import s from './ProductMobileSlider.module.scss';

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

import {BASE_URL} from "@/consts/baseURL.js";
import {useState} from "react";

const ProductMobileSlider = ({images, setSliderPopupIsOpen, setCurrentImage}) => {

  const [swiper, setSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0);

  return (
     <div className={s.wrapper}>
      <Swiper
        onClick={()=>setSliderPopupIsOpen(true)}
        className={s.slider}
        slidesPerView={1}
        loop                
        onSwiper={setSwiper}
        onSlideChange={() => {
          if (swiper) {
            setActiveIndex(swiper.realIndex)
            setCurrentImage(swiper.realIndex)
          }
        }}
      >

        {
          images.map((image, i) => {
              return (
                <SwiperSlide key={i} className={s.slide}>
                  <img className={s.slideImage} src={`${BASE_URL}${image.imageUrl}`} alt=""/>
                </SwiperSlide>
              )
            }
          )
        }

      </Swiper>

       <ul className={s.pagination}>
         {
           images.map((image, i) => {
             return <li
             onClick={()=>swiper.slideTo(i)}  
               key={i} className={ activeIndex === i ? s.pagItemActive : s.pagItem}>               
             </li>
           })
         }
       </ul>       
      </div>



  )
}

export default ProductMobileSlider;
