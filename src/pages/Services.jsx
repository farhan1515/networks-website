import React, { useEffect, useRef, useState } from "react";
import { services } from "../data/servicesData";

const Services = () => {
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
              }, index * 300); // 300ms delay between each card for larger cards
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Our Services
          </h1>
          <p className="text-xl text-gray-300">
            Comprehensive{" "}
            <span className="text-teal-400 font-semibold">
              IT infrastructure solutions
            </span>
          </p>
        </div>
        <div ref={servicesRef} className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`backdrop-blur-lg bg-white/5 border border-teal-500/20 rounded-2xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all duration-700 hover:-translate-y-3 group hover:bg-white/10 hover:border-teal-400/40 transform ${
                animatedServices.includes(index)
                  ? "translate-x-0 opacity-100"
                  : index % 2 === 0
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              }`}
              style={{
                transitionDelay: animatedServices.includes(index)
                  ? "0ms"
                  : `${index * 150}ms`,
                transitionProperty:
                  "transform, opacity, box-shadow, background-color, border-color",
              }}
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500/20 to-cyan-600/20 text-teal-400 rounded-lg mr-4 group-hover:from-teal-400/30 group-hover:to-cyan-500/30 group-hover:text-teal-300 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-110">
                  <i className={`fas ${service.iconClass} text-xl`} />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-300 mb-6 text-lg group-hover:text-gray-200 transition-colors duration-300">
                {service.description}
              </p>
              <div className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <i className="fas fa-check-circle text-emerald-400 mr-3 group-hover:text-emerald-300" />
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] relative overflow-hidden group">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
