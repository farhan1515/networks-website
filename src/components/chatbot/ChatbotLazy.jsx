import React, { lazy, Suspense } from "react";

// Lazy load the heavy chatbot component
const Chatbot = lazy(() => import("./Chatbot"));

const ChatbotLazy = ({ setSelectedProduct }) => {
  return (
    <Suspense
      fallback={
        <div className="fixed bottom-6 right-6 z-50">
          {/* Loading state for chatbot */}
          <div className="relative group">
            {/* Pulsing Ring Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full animate-pulse opacity-30"></div>

            {/* Loading Button */}
            <div className="relative bg-gradient-to-r from-gray-400 to-gray-500 text-white p-4 rounded-full shadow-2xl backdrop-blur-sm border-2 border-white/20">
              <div className="animate-spin">
                <i className="fas fa-circle-notch text-xl"></i>
              </div>
            </div>

            {/* Loading Tooltip */}
            <div className="absolute bottom-16 right-0 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 rounded-xl shadow-xl opacity-100 transition-all duration-300 pointer-events-none min-w-max border border-gray-600 backdrop-blur-lg">
              <div className="text-sm font-medium">
                🤖 Loading AI Assistant...
              </div>
              <div className="text-xs text-gray-300">Please wait a moment</div>
              {/* Speech bubble arrow */}
              <div className="absolute -bottom-1 right-4 w-3 h-3 bg-gradient-to-r from-gray-800 to-gray-900 rotate-45 border-r border-b border-gray-600"></div>
            </div>
          </div>
        </div>
      }
    >
      <Chatbot setSelectedProduct={setSelectedProduct} />
    </Suspense>
  );
};

export default ChatbotLazy;
