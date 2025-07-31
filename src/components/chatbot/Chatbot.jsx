import React, { useState, useEffect, useRef } from "react";
import { productsData } from "../../data/productsData";
import aiService from "../../services/aiService";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "🌟 **Welcome to Sona Networks!**\n\nI'm your AI-powered assistant, here to help with all your IT infrastructure needs. With 21+ years of excellence, we provide:\n\n🔹 **Network Switches** (1G to 400G)\n🔹 **Security Solutions** (Firewalls, Anti-virus)\n🔹 **Servers & Storage** (HP, Dell, Lenovo)\n🔹 **Optical Transceivers** (SFP, QSFP, DAC)\n🔹 **WiFi Solutions** (Enterprise wireless)\n🔹 **IT Services** (24/7 support, cloud migration)\n\nI can understand your specific requirements and provide personalized recommendations. How can I assist you today? 🚀",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const quickReplies = [
    "What network switch do you recommend for my business?",
    "Tell me about your firewall solutions",
    "I need a server for my company",
    "What are your optical transceivers?",
    "Help me with IT infrastructure planning",
    "Contact information and pricing",
  ];

  const formatProductSpecs = (product) => {
    let specs = `🔹 **${product.name}**\n`;
    if (product.description) specs += `${product.description}\n\n`;

    if (product.ports) {
      specs += "**Ports:**\n";
      Object.entries(product.ports).forEach(([key, value]) => {
        if (key !== "total") specs += `• ${value}\n`;
      });
      specs += "\n";
    }

    if (product.features?.length) {
      specs += "**Features:**\n";
      product.features.forEach((feature) => (specs += `• ${feature}\n`));
      specs += "\n";
    }

    if (product.applications?.length) {
      specs += "**Ideal for:**\n";
      product.applications.forEach((app) => (specs += `• ${app}\n`));
      specs += "\n";
    }

    return specs;
  };

  const generateAIResponse = async (userMessage) => {
    try {
      setIsTyping(true);

      // Add thinking animation
      const thinkingMessage = {
        text: "🤔 Analyzing your requirements...",
        isBot: true,
        timestamp: new Date(),
        isThinking: true,
      };
      setMessages((prev) => [...prev, thinkingMessage]);

      const response = await aiService.generateResponse(userMessage);

      // Remove thinking message and add actual response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isThinking);
        return [
          ...filtered,
          {
            text: response.text,
            isBot: true,
            timestamp: new Date(),
            isAI: response.success,
          },
        ];
      });

      setIsTyping(false);
      return response;
    } catch (error) {
      console.error("AI Response Error:", error);
      setIsTyping(false);

      // Remove thinking message and add fallback
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isThinking);
        return [
          ...filtered,
          {
            text: "I apologize, but I'm experiencing technical difficulties. Please contact our team directly at +91 9618 983 030 or info@sona-networks.com for immediate assistance.",
            isBot: true,
            timestamp: new Date(),
            isAI: false,
          },
        ];
      });
    }
  };

  const getFallbackResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Storage Solutions
    if (msg.includes("storage") || msg.includes("san") || msg.includes("nas")) {
      const storageProducts = productsData.storage;
      let response = "**Available Storage Solutions:**\n\n";
      storageProducts.forEach((product) => {
        response += formatProductSpecs(product);
      });
      response +=
        "\n💡 **Key Benefits:**\n• High-capacity enterprise storage\n• Data protection and backup\n• Scalable architecture\n\n📞 Contact us for detailed specifications and pricing!";

      return {
        text: response,
        showProducts: storageProducts.map((p) => p.id),
      };
    }

    // Network Switches
    if (
      msg.includes("switch") ||
      msg.includes("network switch") ||
      (msg.includes("network") && !msg.includes("storage"))
    ) {
      let response = "**Our Network Switch Portfolio (1G to 400G):**\n\n";

      if (
        msg.includes("high") ||
        msg.includes("enterprise") ||
        msg.includes("data center")
      ) {
        const highEndSwitches = productsData.network_switches.filter((s) =>
          s.applications.some(
            (a) =>
              a.toLowerCase().includes("data center") ||
              a.toLowerCase().includes("enterprise")
          )
        );

        response += "**High-End & Enterprise Switches:**\n\n";
        highEndSwitches.slice(0, 3).forEach((switch_) => {
          response += formatProductSpecs(switch_);
        });
      } else if (msg.includes("poe") || msg.includes("power")) {
        const poeSwitches = productsData.network_switches.filter(
          (s) =>
            s.description.toLowerCase().includes("poe") ||
            (s.features &&
              s.features.some((f) => f.toLowerCase().includes("poe")))
        );

        response += "**PoE-Enabled Switches:**\n\n";
        poeSwitches.forEach((switch_) => {
          response += formatProductSpecs(switch_);
        });
      } else {
        response += "**Featured Switches:**\n\n";
        productsData.network_switches.slice(0, 3).forEach((switch_) => {
          response += formatProductSpecs(switch_);
        });
      }

      response +=
        "\n💡 **Available Port Configurations:**\n• 8-port to 52-port options\n• 1G/2.5G/5G/10G speeds\n• SFP+ and QSFP support\n\n📞 Contact us for customized solutions!";

      return {
        text: response,
        showProducts: productsData.network_switches
          .slice(0, 3)
          .map((p) => p.id),
      };
    }

    // Default fallback
    return {
      text: "Hello! I'm your Sona Networks AI Assistant. I can help with:\n\n🔹 **Network Switches** (1G to 400G)\n🔹 **Firewalls & Security** (SonicWall, Fortinet, Cisco, Sophos)\n🔹 **Servers** (HP, Dell, Lenovo)\n🔹 **Storage Solutions** (SAN, NAS)\n🔹 **Optical Transceivers** (SFP, QSFP, DAC)\n🔹 **WiFi Solutions** (UniFi systems)\n🔹 **IT Services** (Infrastructure, Security, Support)\n\n**21+ years serving businesses across India!**\n\nWhat can I help you find today?",
    };
  };

  const handleQuickReply = async (reply) => {
    const userMessage = { text: reply, isBot: false, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);

    if (isAIEnabled) {
      await generateAIResponse(reply);
    } else {
      setTimeout(() => {
        const botResponse = getFallbackResponse(reply);
        const botMessage = {
          text: botResponse.text,
          isBot: true,
          timestamp: new Date(),
          showProducts: botResponse.showProducts || [],
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    if (isAIEnabled) {
      await generateAIResponse(currentInput);
    } else {
      setIsTyping(true);
      setTimeout(() => {
        const botResponse = getFallbackResponse(currentInput);
        const botMessage = {
          text: botResponse.text,
          isBot: true,
          timestamp: new Date(),
          showProducts: botResponse.showProducts || [],
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleNewConversation = () => {
    setMessages([
      {
        text: "🌟 **Welcome back to Sona Networks!**\n\nI'm ready to help with your IT infrastructure needs. With access to our complete product catalog and 21+ years of expertise, I can provide personalized recommendations.\n\nWhat would you like to know about? 🚀",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
    aiService.clearHistory();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
      >
        <i className="fas fa-robot" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <i className="fas fa-robot" />
            Sona Networks AI
          </h3>
          <p className="text-sm opacity-90">
            {isAIEnabled ? "AI-Powered" : "Standard"} IT Infrastructure Expert
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewConversation}
            className="hover:bg-white/20 p-2 rounded-full text-sm"
            title="New Conversation"
          >
            <i className="fas fa-plus" />
          </button>
          <button
            onClick={() => setIsAIEnabled(!isAIEnabled)}
            className={`p-2 rounded-full text-sm transition-colors ${
              isAIEnabled ? "bg-green-500/20" : "bg-gray-500/20"
            }`}
            title={isAIEnabled ? "AI Mode: ON" : "AI Mode: OFF"}
          >
            <i className={`fas ${isAIEnabled ? "fa-brain" : "fa-brain"}`} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-2 rounded-full"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isBot ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isBot
                  ? message.isThinking
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : message.isAI
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 border border-blue-200"
                    : "bg-gray-100 text-gray-800"
                  : "bg-blue-600 text-white"
              } ${message.isThinking ? "animate-pulse" : ""}`}
            >
              {message.isAI && (
                <div className="flex items-center gap-1 text-xs text-blue-600 mb-2">
                  <i className="fas fa-robot" />
                  <span>AI Response</span>
                </div>
              )}
              <div className="whitespace-pre-line text-sm">{message.text}</div>
              {message.showProducts && (
                <div className="mt-3 space-y-2">
                  {message.showProducts.map((productId) => {
                    const product = Object.values(productsData)
                      .flat()
                      .find((p) => p.id === productId);
                    if (!product) return null;
                    return (
                      <div
                        key={productId}
                        className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {product.price_range}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && !messages.some((msg) => msg.isThinking) && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleQuickReply(reply)}
              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 rounded-full text-xs transition-colors border border-blue-200"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={
              isAIEnabled
                ? "Ask me anything about IT infrastructure..."
                : "Ask about network switches, firewalls, servers..."
            }
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white p-2 rounded-full transition-all duration-200"
          >
            <i className="fas fa-paper-plane" />
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          {isAIEnabled ? (
            <span className="flex items-center justify-center gap-1">
              <i className="fas fa-robot text-blue-500" />
              AI-powered responses enabled
            </span>
          ) : (
            <span>Standard response mode</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
