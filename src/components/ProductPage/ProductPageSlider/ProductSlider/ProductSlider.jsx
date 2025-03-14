import s from './ProductSlider.module.scss'
import inactiveBtn from '@/assets/img/productSlider/sliderBtnInactive.svg'
import activeBtn from '@/assets/img/productSlider/sliderBtn.svg'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Thumbs} from 'swiper/modules';
import 'swiper/css';
import {BASE_URL} from "@/consts/baseURL.js";
import {useState} from "react";

const ProductSlider = ({images, currentImage}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(currentImage);
  const handleThumbnailClick = (index) => {
    if (mainSwiper) mainSwiper.slideTo(index);
    if (thumbsSwiper) thumbsSwiper.slideTo(index);
  };

  const thumbSliderWidth = images.length >= 6 ? 520 : images.length * 88 - 8

  // горизонтальные отступы кнопок в зависимости от того десктоп или планшет 
  const nextBtnIndentValue = window.innerWidth <= 1720 ? -22 : -(window.innerWidth / 2 - window.innerHeight * 71.5 / 2 / 100 - 40)

  return (
    <div>
      <button className={s.sliderBtnPrev} style={{left: nextBtnIndentValue}} onClick={() => mainSwiper.slidePrev()}
              disabled={activeIndex === 0}>
        <img src={activeIndex === 0 ? inactiveBtn : activeBtn} alt="previous button"/>
      </button>

      {/* 71.5/2/100 - половина ширины слайдера на десктопе во vh */}
      <button className={s.sliderBtnNext} style={{right: nextBtnIndentValue}} onClick={() => mainSwiper.slideNext()}
              disabled={activeIndex === images.length - 1}>
        <img src={activeIndex === images.length - 1 ? inactiveBtn : activeBtn} alt="next button"/>
      </button>

      <Swiper
        className={s.mainSlider}
        modules={[Thumbs]} thumbs={{swiper: thumbsSwiper}}
        slidesPerView={1}
        initialSlide={currentImage}
        onSwiper={setMainSwiper}
        onSlideChange={() => {
          if (mainSwiper) {
            setActiveIndex(mainSwiper.realIndex)
          }
        }}
      >

        {
          images.map((image, i) => {
              return (
                <SwiperSlide key={i} className={s.slideddd} >

                  {/*<img className={s.slideImage} src={`${BASE_URL}${image.imageUrl}`} alt=""/>*/}
                  <img className={s.slideImage} src={image.imageUrl} alt="" />

                </SwiperSlide>)
            }
          )
        }

      </Swiper>


      {/*Второй слайдер - thumbSlider*/}


      <Swiper
        style={{width: thumbSliderWidth}}
        className={s.thumbSlider}
        modules={[Thumbs]}
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        slidesPerView={images.length >= 6 ? 6 : images.length}
        spaceBetween={8}
        onSlideChange={() => {
        }}
      >

        {
          images.map((image, i) => {
              return (
                <SwiperSlide onClick={() => handleThumbnailClick(i)}
                             className={thumbsSwiper && activeIndex === i ? s.thumbnailSlideActive : s.thumbnailSlide}
                             key={i}>
                  {/*<img className={s.slideImage} src={`${BASE_URL}${image.imageUrl}`} alt=""/>*/}
                  <img className={s.slideImageSmall} src={image.imageUrl} alt=""/>
                </SwiperSlide>)
            }
          )
        }
      </Swiper>
    </div>
  )    
}

export default ProductSlider;