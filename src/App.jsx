import React, { useState } from "react";
import Navigation from "./components/common/Navigation";
import ChatbotLazy from "./components/chatbot/ChatbotLazy";
import usePerformanceMonitor from "./hooks/usePerformanceMonitor";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Monitor performance metrics
  const performanceMetrics = usePerformanceMonitor();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
          />
        );
      case "products":
        return <Products setSelectedProduct={setSelectedProduct} />;
      case "services":
        return <Services />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="pt-16">{renderCurrentPage()}</main>
      <footer className="bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 border-t border-teal-500/20 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                  <i className="fas fa-network-wired text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
                  Sona Networks
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                <span className="text-orange-400 font-bold">21+</span> years of
                IT infrastructure excellence, serving businesses with{" "}
                <span className="text-teal-400 font-semibold">
                  cutting-edge technology solutions
                </span>
                .
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-teal-400">Products</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  Network Switches
                </li>
                <li className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  Enterprise Servers
                </li>
                <li className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  Security Appliances
                </li>
                <li className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  Storage Solutions
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-teal-400">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  IT Infrastructure Design
                </li>
                <li className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  Network Security
                </li>
                <li className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  Cloud Migration
                </li>
                <li className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">
                  24/7 Support
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-teal-400">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p className="hover:text-teal-400 transition-colors duration-300">
                  +91 9618 983 030
                </p>
                <p className="hover:text-teal-400 transition-colors duration-300">
                  info@sona-networks.com
                </p>
                <p className="hover:text-teal-400 transition-colors duration-300">
                  Hyderabad, India
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-teal-500/20 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; 2025{" "}
              <span className="text-teal-400 font-semibold">
                Sona Networks Pvt. Ltd.
              </span>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <ChatbotLazy setSelectedProduct={setSelectedProduct} />
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-lg bg-gray-900/90 border border-teal-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full transition-colors duration-300 hover:scale-105"
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white">
                  {selectedProduct.name}
                </h2>
                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {selectedProduct.category}
                </span>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                {selectedProduct.description}
              </p>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {selectedProduct.ports && (
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Port Configuration
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Ethernet Ports:</span>
                        <span className="font-medium text-teal-400">
                          {selectedProduct.ports.ethernet}
                        </span>
                      </div>
                      {selectedProduct.ports.sfp && (
                        <div className="flex justify-between">
                          <span className="text-gray-300">SFP Ports:</span>
                          <span className="font-medium text-teal-400">
                            {selectedProduct.ports.sfp}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Ports:</span>
                        <span className="font-medium text-teal-400">
                          {selectedProduct.ports.total}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-white mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <i className="fas fa-check-circle text-emerald-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 border border-teal-500/20 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      Price Range
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                      {selectedProduct.price_range}
                    </p>
                  </div>
                  <div className="space-x-4">
                    <button className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                      Get Quote
                    </button>
                    <button className="border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400 px-6 py-3 rounded-lg font-bold transition-all duration-300">
                      Download Datasheet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
