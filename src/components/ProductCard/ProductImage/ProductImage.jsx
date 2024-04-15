import s from './ProductImage.module.scss';
import Badges from "@/components/ProductCard/ProductImage/Badges/Badges.jsx";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {useRef, useState} from "react";
import useBigScreen from "@/hooks/useBigScreen.js";

const ProductImage = ({product, orientation}) => {
  const isBigScreen = useBigScreen()

  const [currentSlide, setCurrentSlide] = useState(0)

  const base_url = 'https://i-rif.com/'
  const swiperRef = useRef(null)
  const hoverHandler = (index) => {
    if (swiperRef.current !== null) {
      swiperRef.current.swiper.slideTo(index);
    }
  }
  const mouseLeaveHandler = () => {
    swiperRef.current.swiper.slideTo(0);
  }

  if (product.images.length === 0) {
    return (
        <div className={orientation === "vertical" ? s.imgCardVer : s.imgCardHor}>
          <div>
            Нет фото
          </div>
          <Badges product={product}/>
        </div>
    )
  }

  console.log('currentSlide', currentSlide)

  return (
      <div className={orientation === "vertical" ? s.imgCardVer : s.imgCardHor} onMouseLeave={mouseLeaveHandler}>

        <Swiper
            ref={swiperRef}
            className={s.slider}
            slidesPerView={1}
            onSlideChange={() => {
              setCurrentSlide(swiperRef.current.swiper.realIndex)
            }}
            loop
            speed={isBigScreen ? 0 : 300}
        >

          {
            product.images.map((image, i) => {
              return (
                  <SwiperSlide className={s.slide} key={i}>
                    <img className={s.testImg} src={`${base_url}${image.imageUrl}`} alt=""/>
                  </SwiperSlide>
              )
            })
          }
        </Swiper>

        {
            isBigScreen && <div className={s.overlay}>
              {
                product.images.map((image, i) => <div onMouseEnter={() => hoverHandler(i)} className={s.tile}
                                                      key={i}></div>)
              }

            </div>
        }

        {
          <div className={s.pagination}>
            {
              product.images.map((image, i) => <div
                  onMouseEnter={() => hoverHandler(i)}
                  className={currentSlide === i ? s.paginationItemActive : s.paginationItem} key={i}>

              </div>)
            }
          </div>
        }

        <Badges product={product}/>
      </div>)
}

export default ProductImage;