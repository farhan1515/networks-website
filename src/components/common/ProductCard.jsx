import React from 'react';

const ProductCard = ({ product, onClick }) => (
  <div 
    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden group"
    onClick={() => onClick(product)}
  >
    <div className="relative overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute top-4 right-4">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {product.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
      <div className="space-y-2 mb-4">
        {product.ports && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Ports:</span>
            <span className="font-medium">{product.ports.total}</span>
          </div>
        )}
        {product.poe_support && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">PoE Budget:</span>
            <span className="font-medium text-green-600">{product.poe_budget}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-blue-600">{product.price_range}</span>
        <i className="fas fa-arrow-right text-gray-400 group-hover:text-blue-600" />
      </div>
    </div>
  </div>
);

export default ProductCard;