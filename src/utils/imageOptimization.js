// Image optimization utilities for better performance

/**
 * Generate a placeholder image URL using a solid color
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} color - Hex color (without #)
 * @param {string} textColor - Text color (without #)
 * @param {string} text - Placeholder text
 * @returns {string} Data URL for placeholder image
 */
export const generatePlaceholder = (
  width = 300,
  height = 200,
  color = "E5E7EB",
  textColor = "6B7280",
  text = "Loading..."
) => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#${color}"/>
      <text x="50%" y="50%" font-size="16" text-anchor="middle" dy=".3em" fill="#${textColor}" font-family="system-ui, sans-serif">
        ${text}
      </text>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/**
 * Generate a gradient placeholder
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} fromColor - Starting gradient color
 * @param {string} toColor - Ending gradient color
 * @returns {string} Data URL for gradient placeholder
 */
export const generateGradientPlaceholder = (
  width = 300,
  height = 200,
  fromColor = "F3F4F6",
  toColor = "E5E7EB"
) => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${fromColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#${toColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <circle cx="50%" cy="50%" r="20" fill="#D1D5DB" opacity="0.5"/>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/**
 * Preload critical images
 * @param {string[]} imageSources - Array of image URLs to preload
 */
export const preloadImages = (imageSources) => {
  imageSources.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Check if image loading is supported
 * @returns {boolean} Whether native lazy loading is supported
 */
export const supportsNativeLazyLoading = () => {
  return "loading" in HTMLImageElement.prototype;
};

/**
 * Get responsive image sizes based on viewport
 * @param {number} maxWidth - Maximum image width
 * @returns {string} Sizes string for responsive images
 */
export const getResponsiveSizes = (maxWidth = 1200) => {
  return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${maxWidth}px`;
};

/**
 * Optimize image URL for better performance (if using a CDN)
 * @param {string} url - Original image URL
 * @param {Object} options - Optimization options
 * @returns {string} Optimized image URL
 */
export const optimizeImageUrl = (url, options = {}) => {
  const { width, height, quality = 80, format = "auto" } = options;

  // If using a CDN like Cloudinary, ImageKit, etc., add optimization parameters
  // For now, return the original URL as-is
  // In a real implementation, you would add CDN-specific parameters here

  return url;
};

/**
 * Create a WebP fallback chain
 * @param {string} originalUrl - Original image URL
 * @returns {Object} Object with webp and fallback URLs
 */
export const createWebPFallback = (originalUrl) => {
  const extension = originalUrl.split(".").pop().toLowerCase();
  const baseUrl = originalUrl.replace(`.${extension}`, "");

  return {
    webp: `${baseUrl}.webp`,
    fallback: originalUrl,
  };
};
