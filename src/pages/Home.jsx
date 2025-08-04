import React, { useEffect, useRef, useState } from "react";
import { companyStats } from "../data/companyStats";
import { services } from "../data/servicesData";
import AnimatedCounter from "../components/common/AnimatedCounter";
import ProductCard from "../components/common/ProductCard";
import ProductCarousel from "../components/common/ProductCarousel";
import { productsData } from "../data/productsData";
import NetworkAnimation from "../components/animations/NetworkAnimation";

const Home = ({ setCurrentPage, setSelectedProduct }) => {
  const allProducts = Object.values(productsData).flat();
  const [animatedServices, setAnimatedServices] = useState([]);
  const servicesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animations for all services with staggered delay
            services.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedServices((prev) => [...prev, index]);
              }, index * 200); // 200ms delay between each card
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
        <div className="absolute inset-0">
          <NetworkAnimation />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/30 via-transparent to-purple-950/20"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 drop-shadow-2xl">
            <span className="bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-pulse filter drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              Sona Networks
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 text-cyan-100 font-medium">
            <span className="text-orange-400 font-bold">21+</span> Years of IT
            Infrastructure Excellence
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 text-gray-200 leading-relaxed">
            Empowering businesses with{" "}
            <span className="text-teal-400 font-semibold">
              cutting-edge network solutions
            </span>
            ,
            <span className="text-purple-400 font-semibold">
              enterprise servers
            </span>
            , and{" "}
            <span className="text-cyan-400 font-semibold">
              cybersecurity infrastructure
            </span>{" "}
            since 2001
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <button
              onClick={() => setCurrentPage("products")}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <button className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] backdrop-blur-sm bg-white/5">
              Get Consultation
            </button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/20 to-purple-950/10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-full mb-4 shadow-lg group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-300 group-hover:scale-110">
                  <i className={`fas ${stat.iconClass}`} />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300">
                  <AnimatedCounter
                    end={stat.number.replace(/\D/g, "")}
                    suffix={stat.number.replace(/\d/g, "")}
                  />
                </div>
                <div className="text-gray-200 font-semibold group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        ref={servicesRef}
        className="py-20 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-950/10 via-purple-950/5 to-cyan-950/10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              Our Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive{" "}
              <span className="text-teal-400 font-semibold">
                IT infrastructure solutions
              </span>{" "}
              tailored to your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`backdrop-blur-lg bg-white/5 border border-teal-500/20 rounded-2xl p-6 shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-700 hover:-translate-y-3 group hover:bg-white/10 hover:border-teal-400/40 transform ${
                  animatedServices.includes(index)
                    ? "translate-x-0 opacity-100"
                    : index % 2 === 0
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
                style={{
                  transitionDelay: animatedServices.includes(index)
                    ? "0ms"
                    : `${index * 100}ms`,
                  transitionProperty:
                    "transform, opacity, box-shadow, background-color, border-color",
                }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-teal-500/20 to-cyan-600/20 text-teal-400 rounded-lg mb-4 group-hover:from-teal-400/30 group-hover:to-cyan-500/30 group-hover:text-teal-300 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-110">
                  <i className={`fas ${service.iconClass}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                    >
                      <i className="fas fa-check-circle text-emerald-400 mr-2 group-hover:text-emerald-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-950/10 via-transparent to-teal-950/15"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ProductCarousel
            products={allProducts.slice(0, 8)}
            autoplayDelay={2000}
            showPagination={true}
            showNavigation={true}
            onProductClick={setSelectedProduct}
          />
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage("products")}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white px-10 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] relative overflow-hidden group"
            >
              <span className="relative z-10">View All Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
