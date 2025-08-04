import React from "react";

const ProductCard = ({ product, onClick }) => (
  <div
    className="backdrop-blur-lg bg-white/5 border border-teal-500/20 rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500 hover:-translate-y-3 cursor-pointer overflow-hidden group hover:bg-white/10 hover:border-teal-400/40"
    onClick={() => onClick(product)}
  >
    <div className="relative overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-4 right-4">
        <span className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
          {product.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
        {product.name}
      </h3>
      <p className="text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
        {product.description}
      </p>
      <div className="space-y-2 mb-4">
        {product.ports && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Total Ports:
            </span>
            <span className="font-medium text-teal-400 group-hover:text-teal-300 transition-colors duration-300">
              {product.ports.total}
            </span>
          </div>
        )}
        {product.poe_support && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              PoE Budget:
            </span>
            <span className="font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
              {product.poe_budget}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          {product.price_range}
        </span>
        <i className="fas fa-arrow-right text-gray-400 group-hover:text-teal-400 transition-all duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  </div>
);

export default ProductCard;
