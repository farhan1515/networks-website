import React, { useState } from "react";
import { productsData } from "../data/productsData";
import ProductCard from "../components/common/ProductCard";

const Products = ({ setSelectedProduct }) => {
  const [productFilter, setProductFilter] = useState("all");
  const allProducts = Object.values(productsData).flat();
  const filteredProducts =
    productFilter === "all"
      ? allProducts
      : allProducts.filter((product) => {
          if (productFilter === "switches") {
            return (
              product.category.toLowerCase().includes("switch") ||
              product.category.toLowerCase().includes("network")
            );
          }
          if (productFilter === "security") {
            return (
              product.category.toLowerCase().includes("firewall") ||
              product.category.toLowerCase().includes("security")
            );
          }
          if (productFilter === "servers") {
            return (
              product.category.toLowerCase().includes("server") ||
              product.category.toLowerCase().includes("storage")
            );
          }
          if (productFilter === "transceivers") {
            return (
              product.category.toLowerCase().includes("transceiver") ||
              product.category.toLowerCase().includes("optical")
            );
          }
          return product.category
            .toLowerCase()
            .includes(productFilter.toLowerCase());
        });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Our Products
          </h1>
          <p className="text-xl text-gray-300">
            Enterprise-grade{" "}
            <span className="text-teal-400 font-semibold">
              IT infrastructure solutions
            </span>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            "all",
            "switches",
            "security",
            "servers",
            "transceivers",
            "wireless",
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => setProductFilter(filter)}
              className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                productFilter === filter
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                  : "backdrop-blur-lg bg-white/10 border border-teal-500/20 text-gray-300 hover:bg-white/20 hover:text-teal-400 hover:border-teal-400/40"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={setSelectedProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
