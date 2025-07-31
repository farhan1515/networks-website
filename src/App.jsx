import React, { useState } from "react";
import Navigation from "./components/common/Navigation";
import Chatbot from "./components/chatbot/Chatbot";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
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
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="pt-16">{renderCurrentPage()}</main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-network-wired text-white" />
                </div>
                <span className="text-lg font-bold">Sona Networks</span>
              </div>
              <p className="text-gray-400 mb-4">
                21+ years of IT infrastructure excellence, serving businesses
                with cutting-edge technology solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Network Switches</li>
                <li>Enterprise Servers</li>
                <li>Security Appliances</li>
                <li>Storage Solutions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>IT Infrastructure Design</li>
                <li>Network Security</li>
                <li>Cloud Migration</li>
                <li>24/7 Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>+91 9618 983 030</p>
                <p>info@sona-networks.com</p>
                <p>Hyderabad, India</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sona Networks Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Chatbot />
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full"
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h2>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                  {selectedProduct.category}
                </span>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                {selectedProduct.description}
              </p>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {selectedProduct.ports && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Port Configuration
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ethernet Ports:</span>
                        <span className="font-medium">
                          {selectedProduct.ports.ethernet}
                        </span>
                      </div>
                      {selectedProduct.ports.sfp && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">SFP Ports:</span>
                          <span className="font-medium">
                            {selectedProduct.ports.sfp}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Ports:</span>
                        <span className="font-medium">
                          {selectedProduct.ports.total}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <i className="fas fa-check-circle text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Price Range
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedProduct.price_range}
                    </p>
                  </div>
                  <div className="space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
                      Get Quote
                    </button>
                    <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold">
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
