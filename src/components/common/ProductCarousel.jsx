import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import ProductCard from "./ProductCard";

const ProductCarousel = ({
  products,
  autoplayDelay = 500,
  showPagination = true,
  showNavigation = true,
  onProductClick,
}) => {
  const customCSS = `
    .product-carousel .swiper {
      width: 100%;
      padding-bottom: 50px;
      padding-top: 20px;
    }
    
    .product-carousel .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 350px;
      height: auto;
    }
    
    .product-carousel .swiper-3d .swiper-slide-shadow-left {
      background-image: none;
    }
    
    .product-carousel .swiper-3d .swiper-slide-shadow-right {
      background: none;
    }
    
    .product-carousel .swiper-pagination-bullet {
      background: rgba(6, 182, 212, 0.5);
      opacity: 0.7;
    }
    
    .product-carousel .swiper-pagination-bullet-active {
      background: #06b6d4;
      opacity: 1;
    }
    
    .product-carousel .swiper-button-next,
    .product-carousel .swiper-button-prev {
      color: #06b6d4;
      background: rgba(6, 182, 212, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin-top: -25px;
      border: 1px solid rgba(6, 182, 212, 0.3);
      transition: all 0.3s ease;
    }
    
    .product-carousel .swiper-button-next:hover,
    .product-carousel .swiper-button-prev:hover {
      background: rgba(6, 182, 212, 0.2);
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
      transform: scale(1.1);
    }
    
    .product-carousel .swiper-button-next::after,
    .product-carousel .swiper-button-prev::after {
      font-size: 18px;
      font-weight: bold;
    }
  `;

  return (
    <div className="product-carousel w-full">
      <style>{customCSS}</style>
      <div className="mx-auto w-full max-w-7xl rounded-[24px] border border-teal-500/20 p-4 shadow-2xl backdrop-blur-lg bg-white/5">
        <div className="relative mx-auto flex w-full flex-col rounded-[20px] border border-teal-500/10 bg-gradient-to-br from-teal-950/20 to-cyan-950/10 p-4 shadow-lg">
          {/* Badge */}
          <div className="absolute left-6 top-6 rounded-[14px] border border-teal-500/30 bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <i className="fas fa-star text-yellow-400" />
              Featured Products
            </span>
          </div>

          {/* Header */}
          <div className="flex flex-col justify-center pb-4 pl-6 pt-16">
            <h3 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
              Our Premium Solutions
            </h3>
            <p className="text-gray-300 text-lg">
              Discover our top-rated{" "}
              <span className="text-teal-400 font-semibold">
                IT infrastructure products
              </span>
            </p>
          </div>

          {/* Carousel */}
          <div className="flex w-full items-center justify-center">
            <div className="w-full">
              <Swiper
                spaceBetween={30}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView="auto"
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                }}
                pagination={showPagination ? { clickable: true } : false}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : false
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                className="product-swiper"
              >
                {products.map((product, index) => (
                  <SwiperSlide key={`${product.id}-${index}`}>
                    <div className="h-full rounded-3xl p-2">
                      <ProductCard product={product} onClick={onProductClick} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
