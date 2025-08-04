import React, { useState, useRef, useEffect } from "react";
import {
  generatePlaceholder,
  supportsNativeLazyLoading,
} from "../../utils/imageOptimization";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder,
  width = 300,
  height = 200,
  ...props
}) => {
  const defaultPlaceholder = placeholder || generatePlaceholder(width, height);
  const [imageSrc, setImageSrc] = useState(defaultPlaceholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    let observer;

    // Use native lazy loading if supported, otherwise use IntersectionObserver
    if (supportsNativeLazyLoading()) {
      setIsInView(true);
    } else if (imageRef && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(imageRef);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );
      observer.observe(imageRef);
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsInView(true);
    }

    return () => {
      if (observer && observer.unobserve && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef]);

  useEffect(() => {
    if (isInView && src) {
      const imageLoader = new Image();
      imageLoader.src = src;
      imageLoader.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      imageLoader.onerror = () => {
        // Keep placeholder on error
        setIsLoaded(true);
      };
    }
  }, [isInView, src]);

  return (
    <div
      ref={setImageRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-70"
        } w-full h-full object-cover`}
        loading={supportsNativeLazyLoading() ? "lazy" : "eager"}
        decoding="async"
        width={width}
        height={height}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
