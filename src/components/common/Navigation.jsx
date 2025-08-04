import React, { useState } from "react";

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", id: "home" },
    { name: "Products", id: "products" },
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-950/90 backdrop-blur-md border-b border-teal-500/20 z-40 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/25">
              <i className="fas fa-network-wired text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
              Sona Networks
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === item.id
                    ? "text-teal-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    : "text-gray-300 hover:text-teal-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-teal-400 transition-colors duration-300"
          >
            {mobileMenuOpen ? (
              <i className="fas fa-times" />
            ) : (
              <i className="fas fa-bars" />
            )}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-teal-500/20 py-4 bg-gray-900/50">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handlePageChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? "text-teal-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    : "text-gray-300 hover:text-teal-400 hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
