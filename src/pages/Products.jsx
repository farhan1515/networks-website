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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600">
            Enterprise-grade IT infrastructure solutions
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
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                productFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
