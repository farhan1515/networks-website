import { useEffect, useState } from "react";

/**
 * Hook to monitor performance metrics
 * @returns {Object} Performance metrics and utilities
 */
const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loading: true,
    loadTime: 0,
    renderTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
  });

  useEffect(() => {
    const measurePerformance = () => {
      if ("performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0];
        const paint = performance.getEntriesByType("paint");

        const loadTime = navigation
          ? navigation.loadEventEnd - navigation.loadEventStart
          : 0;
        const renderTime = navigation
          ? navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart
          : 0;

        const fcp = paint.find(
          (entry) => entry.name === "first-contentful-paint"
        );
        const firstContentfulPaint = fcp ? fcp.startTime : 0;

        // Measure LCP using PerformanceObserver
        let largestContentfulPaint = 0;
        if ("PerformanceObserver" in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              largestContentfulPaint = lastEntry.startTime;
            });
            observer.observe({ entryTypes: ["largest-contentful-paint"] });
          } catch (e) {
            console.warn("LCP measurement not supported:", e);
          }
        }

        setMetrics({
          loading: false,
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          firstContentfulPaint: Math.round(firstContentfulPaint),
          largestContentfulPaint: Math.round(largestContentfulPaint),
        });
      }
    };

    // Wait for page to fully load
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
      return () => window.removeEventListener("load", measurePerformance);
    }
  }, []);

  // Log performance metrics in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !metrics.loading) {
      console.group("🚀 Performance Metrics");
      console.log("Load Time:", metrics.loadTime + "ms");
      console.log("Render Time:", metrics.renderTime + "ms");
      console.log(
        "First Contentful Paint:",
        metrics.firstContentfulPaint + "ms"
      );
      console.log(
        "Largest Contentful Paint:",
        metrics.largestContentfulPaint + "ms"
      );
      console.groupEnd();
    }
  }, [metrics]);

  return {
    ...metrics,
    isGoodPerformance:
      metrics.firstContentfulPaint < 1500 &&
      metrics.largestContentfulPaint < 2500,
  };
};

export default usePerformanceMonitor;
