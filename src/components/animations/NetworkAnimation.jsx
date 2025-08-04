import React, { useEffect, useRef, useState } from "react";

const NetworkAnimation = () => {
  const canvasRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Visibility observer for performance optimization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Page visibility API for performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView || !isVisible) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let nodes = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Scale the drawing context so everything draws at the correct size
      ctx.scale(dpr, dpr);

      // Set display size
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      // Reinitialize nodes with proper dimensions
      initializeNodes();
    };

    const initializeNodes = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Only initialize if we have valid dimensions
      if (width > 0 && height > 0) {
        nodes = Array.from({ length: 50 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          radius: Math.random() * 2 + 1,
        }));
      }
    };

    const animate = () => {
      if (nodes.length === 0) return;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with proper bounds
        if (node.x < 0 || node.x > width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }
        // Add glow effect to nodes
        ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.9)"; // Bright cyan for high visibility
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for connections
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            // Add subtle glow to connections
            const opacity = (1 - distance / 100) * 0.7;
            ctx.shadowColor = "rgba(6, 182, 212, 0.5)";
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`; // Bright cyan connections with glow
            ctx.lineWidth = 1.5; // Thicker lines for better visibility
            ctx.stroke();
            ctx.shadowBlur = 0; // Reset shadow
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    // Initialize canvas and start animation
    const init = () => {
      resize();
      // Use a small delay to ensure DOM is fully rendered
      setTimeout(() => {
        if (nodes.length === 0) {
          initializeNodes();
        }
        animate();
      }, 100);
    };

    // Handle resize events with debouncing
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    };

    init();
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
    };
  }, [isInView, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
      style={{
        background: "transparent",
        display: "block",
        minHeight: "100%",
        minWidth: "100%",
      }}
    />
  );
};

export default NetworkAnimation;
