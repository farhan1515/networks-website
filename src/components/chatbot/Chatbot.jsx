import React, { useState, useEffect, useRef } from "react";
import { productsData } from "../../data/productsData";
import aiService from "../../services/aiService";
import googleSheetsService from "../../services/googleSheetsService";
import LazyImage from "../common/LazyImage";

const Chatbot = ({ setSelectedProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(false);
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

  // Lead capture state
  const [isLeadCapture, setIsLeadCapture] = useState(false);
  const [leadStep, setLeadStep] = useState(0);
  const [leadData, setLeadData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productsInterest: "",
    budget: "",
    requirements: "",
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Auto-show welcome tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowWelcomeTooltip(true);
        // Hide after 5 seconds
        setTimeout(() => setShowWelcomeTooltip(false), 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const quickReplies = [
    "Network switches",
    "Firewall solutions",
    "Server recommendations",
    "Contact & pricing",
  ];

  // Lead capture keywords and functions
  const leadCaptureKeywords = [
    "price",
    "cost",
    "how much",
    "buy",
    "quotation",
    "quote",
    "purchase",
    "order",
    "variation",
    "model",
    "options",
    "pricing",
    "budget",
    "demo",
    "contact",
    "info",
    "information",
    "details",
    "spec",
    "specification",
  ];

  const shouldTriggerLeadCapture = (message) => {
    const msg = message.toLowerCase();
    return leadCaptureKeywords.some((keyword) => msg.includes(keyword));
  };

  const getLeadCapturePrompt = (step, previousData = {}) => {
    const prompts = [
      {
        question: "Great! May I know your name to personalize your quote? 😊",
        field: "name",
        required: true,
        validation: (value) =>
          value.trim().length >= 2 ? null : "Please enter a valid name",
      },
      {
        question:
          "Nice to meet you! What's your company name? (You can skip this if you prefer)",
        field: "company",
        required: false,
        skipText: "Skip",
      },
      {
        question:
          "Where can we send your detailed quote and product information? Please share your email or phone number 📧📱",
        field: "contact",
        required: true,
        validation: (value) => {
          if (googleSheetsService.validateEmail(value)) return null;
          if (googleSheetsService.validatePhone(value)) return null;
          return "Please enter a valid email or phone number";
        },
      },
      {
        question:
          "Which products are you interested in? (I can suggest based on our conversation)",
        field: "productsInterest",
        required: false,
        placeholder: "Network switches, Firewalls, Servers, etc.",
      },
      {
        question:
          "Do you have a budget range in mind? This helps us recommend the best options for you 💰",
        field: "budget",
        required: false,
        skipText: "Skip",
      },
      {
        question: "Any specific requirements or questions? (Optional)",
        field: "requirements",
        required: false,
        skipText: "Skip",
        placeholder: "Port count, brand preference, special features, etc.",
      },
    ];
    return prompts[step] || null;
  };

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

  // Lead capture functions
  const startLeadCapture = (context = "") => {
    setIsLeadCapture(true);
    setLeadStep(0);

    // Auto-fill products of interest from context
    if (context) {
      setLeadData((prev) => ({ ...prev, productsInterest: context }));
    }

    const prompt = getLeadCapturePrompt(0);
    const botMessage = {
      text: `I'd love to help you with personalized recommendations and pricing! 🎯\n\n${prompt.question}`,
      isBot: true,
      timestamp: new Date(),
      isLeadCapture: true,
      leadStep: 0,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleLeadCaptureResponse = async (userInput) => {
    const currentPrompt = getLeadCapturePrompt(leadStep);
    const currentField = currentPrompt.field;

    // Handle skip
    if (userInput.toLowerCase().trim() === "skip" && !currentPrompt.required) {
      advanceLeadStep();
      return;
    }

    // Validate required fields
    if (currentPrompt.required && !userInput.trim()) {
      const errorMessage = {
        text: "This information is required to send you a personalized quote. Could you please provide it? 😊",
        isBot: true,
        timestamp: new Date(),
        isLeadCapture: true,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Validate input
    if (currentPrompt.validation) {
      const validationError = currentPrompt.validation(userInput);
      if (validationError) {
        const errorMessage = {
          text: `${validationError}\n\nCould you please try again? 😊`,
          isBot: true,
          timestamp: new Date(),
          isLeadCapture: true,
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }
    }

    // Update lead data
    const updatedLeadData = { ...leadData };

    if (currentField === "contact") {
      // Determine if it's email or phone
      if (googleSheetsService.validateEmail(userInput)) {
        updatedLeadData.email = userInput;
      } else if (googleSheetsService.validatePhone(userInput)) {
        updatedLeadData.phone = googleSheetsService.formatPhone(userInput);
      }
    } else {
      updatedLeadData[currentField] = userInput;
    }

    setLeadData(updatedLeadData);

    // Check if this is the last step
    const nextStep = leadStep + 1;
    const nextPrompt = getLeadCapturePrompt(nextStep);

    if (!nextPrompt) {
      // Complete lead capture
      await completeLeadCapture(updatedLeadData);
    } else {
      // Move to next step
      setLeadStep(nextStep);

      let confirmationText = "Perfect! ";
      if (currentField === "name") {
        confirmationText = `Nice to meet you, ${userInput}! `;
      }

      const nextMessage = {
        text: `${confirmationText}${nextPrompt.question}`,
        isBot: true,
        timestamp: new Date(),
        isLeadCapture: true,
        leadStep: nextStep,
        showSkip: !nextPrompt.required && nextPrompt.skipText,
      };
      setMessages((prev) => [...prev, nextMessage]);
    }
  };

  const advanceLeadStep = () => {
    const nextStep = leadStep + 1;
    const nextPrompt = getLeadCapturePrompt(nextStep);

    if (!nextPrompt) {
      completeLeadCapture(leadData);
    } else {
      setLeadStep(nextStep);
      const nextMessage = {
        text: nextPrompt.question,
        isBot: true,
        timestamp: new Date(),
        isLeadCapture: true,
        leadStep: nextStep,
        showSkip: !nextPrompt.required && nextPrompt.skipText,
      };
      setMessages((prev) => [...prev, nextMessage]);
    }
  };

  const completeLeadCapture = async (finalLeadData) => {
    setIsSubmittingLead(true);

    // Show saving message
    const savingMessage = {
      text: "💾 Saving your information...",
      isBot: true,
      timestamp: new Date(),
      isThinking: true,
    };
    setMessages((prev) => [...prev, savingMessage]);

    try {
      // Save to Google Sheets
      const result = await googleSheetsService.saveLeadData(finalLeadData);

      // Remove saving message
      setMessages((prev) => prev.filter((msg) => !msg.isThinking));

      const contactInfo = finalLeadData.email || finalLeadData.phone;
      const thankYouMessage = {
        text: `🎉 **Thank you, ${finalLeadData.name}!**\n\nOur team will reach out soon with the best options and pricing for you. You'll receive a detailed quote at **${contactInfo}**.\n\n✅ **What happens next:**\n• Our sales engineer will contact you within 4 hours\n• You'll receive personalized product recommendations\n• We'll provide competitive pricing and technical specifications\n\n🚀 **In the meantime**, feel free to ask me any other questions about our products!`,
        isBot: true,
        timestamp: new Date(),
        isLeadComplete: true,
      };

      setMessages((prev) => [...prev, thankYouMessage]);

      // Reset lead capture state
      setIsLeadCapture(false);
      setLeadStep(0);
      setLeadData({
        name: "",
        company: "",
        email: "",
        phone: "",
        productsInterest: "",
        budget: "",
        requirements: "",
      });
    } catch (error) {
      // Remove saving message
      setMessages((prev) => prev.filter((msg) => !msg.isThinking));

      const errorMessage = {
        text: "I apologize, but there was a technical issue saving your information. Please contact our team directly at **+91 9618 983 030** or **info@sona-networks.com** and mention that you're interested in a quote. Our team will be happy to help you! 😊",
        isBot: true,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);

      // Reset lead capture state
      setIsLeadCapture(false);
      setLeadStep(0);
    }

    setIsSubmittingLead(false);
  };

  const extractProductContext = (messages) => {
    const recentMessages = messages.slice(-5); // Look at last 5 messages
    const productMentions = [];

    recentMessages.forEach((msg) => {
      const text = msg.text.toLowerCase();
      if (text.includes("switch") || text.includes("network"))
        productMentions.push("Network Switches");
      if (text.includes("firewall") || text.includes("security"))
        productMentions.push("Firewalls");
      if (text.includes("server")) productMentions.push("Servers");
      if (
        text.includes("storage") ||
        text.includes("san") ||
        text.includes("nas") ||
        text.includes("backup") ||
        text.includes("file sharing")
      )
        productMentions.push("Storage Solutions");
      if (text.includes("wifi") || text.includes("wireless"))
        productMentions.push("WiFi Solutions");
      if (text.includes("transceiver") || text.includes("sfp"))
        productMentions.push("Optical Transceivers");
    });

    return [...new Set(productMentions)].join(", ");
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
            showProducts: response.showProducts || [],
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

    // Storage Solutions with company size recommendations
    if (
      msg.includes("storage") ||
      msg.includes("san") ||
      msg.includes("nas") ||
      msg.includes("backup") ||
      msg.includes("file sharing")
    ) {
      const storageProducts = productsData.storage;
      let response = "**Storage Solutions Based on Your Needs:**\n\n";

      // Extract company size if mentioned
      let recommendedProducts = [];
      let companySize = "";

      if (msg.includes("2000") && msg.includes("employee")) {
        companySize = "2000+ employees (Enterprise)";
        response += `🏢 **For ${companySize}:**\n`;
        response +=
          "I recommend **SAN Storage** + **SAN Drives** for enterprise-grade performance:\n\n";
        recommendedProducts = storageProducts.filter(
          (p) => p.id === "san_storage" || p.id === "san_drive"
        );
      } else if (
        msg.includes("1000") ||
        msg.includes("1500") ||
        (msg.includes("large") && msg.includes("company"))
      ) {
        companySize = "500-2000 employees (Large Enterprise)";
        response += `🏢 **For ${companySize}:**\n`;
        response +=
          "I recommend **SAN Storage** for enterprise backup and performance:\n\n";
        recommendedProducts = storageProducts.filter(
          (p) => p.id === "san_storage" || p.id === "san_drive"
        );
      } else if (
        msg.includes("500") ||
        msg.includes("medium") ||
        msg.includes("growing")
      ) {
        companySize = "50-500 employees (Medium Business)";
        response += `🏢 **For ${companySize}:**\n`;
        response +=
          "I recommend **NAS Device** for file sharing and backup:\n\n";
        recommendedProducts = storageProducts.filter(
          (p) => p.id === "nas_device"
        );
      } else if (
        msg.includes("small") ||
        msg.includes("startup") ||
        (msg.match(/\b\d{1,2}\b/) && parseInt(msg.match(/\b\d{1,2}\b/)[0]) < 50)
      ) {
        companySize = "10-50 employees (Small Business)";
        response += `🏢 **For ${companySize}:**\n`;
        response +=
          "I recommend **NAS Device** for basic file sharing and backup:\n\n";
        recommendedProducts = storageProducts.filter(
          (p) => p.id === "nas_device"
        );
      } else {
        response += "Here are all our available storage solutions:\n\n";
        recommendedProducts = storageProducts;
      }

      recommendedProducts.forEach((product) => {
        response += formatProductSpecs(product);
      });

      if (companySize) {
        response += `\n💡 **Why this is perfect for ${companySize}:**\n`;
        if (
          companySize.includes("Enterprise") ||
          companySize.includes("Large")
        ) {
          response +=
            "• High availability and scalability for mission-critical data\n";
          response += "• Enterprise-grade performance for database storage\n";
          response += "• Redundancy and backup capabilities\n";
        } else if (companySize.includes("Medium")) {
          response += "• Cost-effective file sharing and backup\n";
          response += "• RAID support for data protection\n";
          response += "• Easy to manage and expand\n";
        } else {
          response += "• Simple setup and management\n";
          response += "• Affordable backup solution\n";
          response += "• Perfect for small team file sharing\n";
        }
      }

      response += "\n📞 Contact us for detailed specifications and pricing!";

      return {
        text: response,
        showProducts: recommendedProducts.map((p) => p.id),
      };
    }

    // Firewall Solutions
    if (
      msg.includes("firewall") ||
      msg.includes("security") ||
      msg.includes("sonicwall") ||
      msg.includes("fortinet") ||
      msg.includes("cisco") ||
      msg.includes("sophos")
    ) {
      const firewallProducts = productsData.firewalls;
      let response = "**Network Security & Firewall Solutions:**\n\n";

      // Determine company size or specific firewall needs
      let recommendedProducts = [];
      let companySize = "";

      if (
        msg.includes("enterprise") ||
        msg.includes("large") ||
        msg.includes("1000")
      ) {
        companySize = "Enterprise (500+ employees)";
        response += `🏢 **For ${companySize}:**\n`;
        response +=
          "I recommend **Enterprise-grade Firewalls** for maximum protection:\n\n";
        recommendedProducts = firewallProducts.filter(
          (p) =>
            p.id === "sonicwall_670" ||
            p.id === "fortinet_firewall" ||
            p.id === "cisco_firewall"
        );
      } else if (
        msg.includes("medium") ||
        msg.includes("500") ||
        msg.includes("growing")
      ) {
        companySize = "Medium Business (50-500 employees)";
        response += `🏢 **For ${companySize}:**\n`;
        response +=
          "I recommend **Mid-range Firewalls** for balanced security and cost:\n\n";
        recommendedProducts = firewallProducts.filter(
          (p) => p.id === "sonicwall_350" || p.id === "sophos_firewall"
        );
      } else if (
        msg.includes("small") ||
        msg.includes("startup") ||
        msg.includes("50")
      ) {
        companySize = "Small Business (10-50 employees)";
        response += `🏢 **For ${companySize}:**\n`;
        response +=
          "I recommend **Compact Firewalls** perfect for small businesses:\n\n";
        recommendedProducts = firewallProducts.filter(
          (p) => p.id === "sonicwall_270" || p.id === "sophos_firewall"
        );
      } else if (msg.includes("sonicwall")) {
        response += "**SonicWall Series - Industry Leading Protection:**\n\n";
        recommendedProducts = firewallProducts.filter(
          (p) => p.brand === "SonicWall"
        );
      } else if (msg.includes("fortinet")) {
        response += "**Fortinet FortiGate - AI-Powered Security:**\n\n";
        recommendedProducts = firewallProducts.filter(
          (p) => p.brand === "Fortinet"
        );
      } else if (msg.includes("cisco")) {
        response += "**Cisco ASA Series - Enterprise Security:**\n\n";
        recommendedProducts = firewallProducts.filter(
          (p) => p.brand === "Cisco"
        );
      } else if (msg.includes("sophos")) {
        response += "**Sophos Unified Threat Management:**\n\n";
        recommendedProducts = firewallProducts.filter(
          (p) => p.brand === "Sophos"
        );
      } else {
        response += "Here are our top firewall solutions by brand:\n\n";
        recommendedProducts = firewallProducts.slice(0, 4); // Show top 4 firewalls
      }

      recommendedProducts.forEach((product) => {
        response += formatProductSpecs(product);
      });

      if (companySize) {
        response += `\n🛡️ **Why this is perfect for ${companySize}:**\n`;
        if (companySize.includes("Enterprise")) {
          response +=
            "• Advanced threat protection with AI-powered detection\n";
          response += "• High throughput for large network traffic\n";
          response += "• Centralized management and reporting\n";
          response += "• 24/7 enterprise support\n";
        } else if (companySize.includes("Medium")) {
          response += "• Balanced performance and cost-effectiveness\n";
          response += "• Scalable for business growth\n";
          response += "• Easy management interface\n";
          response += "• Comprehensive threat protection\n";
        } else {
          response += "• Simple setup and management\n";
          response += "• Affordable enterprise-grade security\n";
          response += "• Perfect for small office networks\n";
          response += "• Essential threat protection\n";
        }
      }

      response +=
        "\n🛡️ **All Firewalls Include:**\n• Intrusion Prevention System (IPS)\n• Application Control\n• VPN Support\n• Real-time Threat Intelligence\n\n📞 Contact us for security assessment and pricing!";

      return {
        text: response,
        showProducts: recommendedProducts.map((p) => p.id),
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

    // Check if should trigger lead capture for quick replies
    if (!isLeadCapture && shouldTriggerLeadCapture(reply)) {
      const productContext = extractProductContext([...messages, userMessage]);

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

      // Start lead capture after a short delay
      setTimeout(() => {
        startLeadCapture(productContext);
      }, 2000);
      return;
    }

    // Normal flow
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

    // Handle lead capture flow
    if (isLeadCapture) {
      await handleLeadCaptureResponse(currentInput);
      return;
    }

    // Check if should trigger lead capture
    if (!isLeadCapture && shouldTriggerLeadCapture(currentInput)) {
      const productContext = extractProductContext([...messages, userMessage]);

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

      // Start lead capture after a short delay
      setTimeout(() => {
        startLeadCapture(productContext);
      }, 2000);
      return;
    }

    // Normal flow
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

    // Reset lead capture state
    setIsLeadCapture(false);
    setLeadStep(0);
    setLeadData({
      name: "",
      company: "",
      email: "",
      phone: "",
      productsInterest: "",
      budget: "",
      requirements: "",
    });
    setIsSubmittingLead(false);

    aiService.clearHistory();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Floating Chat Button */}
        <div className="relative group">
          {/* Pulsing Ring Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full animate-pulse opacity-30"></div>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce shadow-lg">
            <i className="fas fa-exclamation"></i>
          </div>

          {/* Main Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] group-hover:rotate-12 backdrop-blur-sm border-2 border-white/20"
          >
            <i className="fas fa-comments text-xl animate-pulse"></i>
          </button>

          {/* Tooltip/Speech Bubble */}
          <div className="absolute bottom-16 right-0 bg-gradient-to-r from-teal-900 to-cyan-900 text-white px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 pointer-events-none min-w-max border border-teal-500/30 backdrop-blur-lg">
            <div className="text-sm font-medium">💬 Chat with AI Assistant</div>
            <div className="text-xs text-teal-300">Get instant IT support!</div>
            {/* Speech bubble arrow */}
            <div className="absolute -bottom-1 right-4 w-3 h-3 bg-gradient-to-r from-teal-900 to-cyan-900 rotate-45 border-r border-b border-teal-500/30"></div>
          </div>

          {/* Welcome Message Popup */}
          <div
            className={`absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl p-4 border border-teal-500/20 transition-all duration-500 transform pointer-events-none min-w-max max-w-xs backdrop-blur-lg bg-white/95 ${
              showWelcomeTooltip
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-2 rounded-full flex-shrink-0">
                <i className="fas fa-robot text-white text-sm"></i>
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">
                  Sona Networks AI
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Hi! I'm here to help with your IT infrastructure needs. Ask me
                  anything!
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-teal-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Online & Ready</span>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-1 right-8 w-3 h-3 bg-white rotate-45 border-r border-b border-teal-500/20"></div>
          </div>

          {/* Floating Icons Animation */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-8 -left-2 text-teal-400 opacity-60 animate-bounce text-xs"
              style={{ animationDelay: "0s" }}
            >
              💻
            </div>
            <div
              className="absolute -top-6 -right-8 text-cyan-400 opacity-60 animate-bounce text-xs"
              style={{ animationDelay: "1s" }}
            >
              🔧
            </div>
            <div
              className="absolute -bottom-2 -left-8 text-emerald-400 opacity-60 animate-bounce text-xs"
              style={{ animationDelay: "2s" }}
            >
              🚀
            </div>
          </div>
        </div>

        {/* Entrance Animation Style */}
        <style jsx>{`
          @keyframes slideInUp {
            from {
              transform: translateY(100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .fixed {
            animation: slideInUp 0.8s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-lg">
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

      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[40vh]">
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
              {message.isLeadCapture && (
                <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
                  <i className="fas fa-user-plus" />
                  <span>Lead Capture</span>
                </div>
              )}
              {message.isLeadComplete && (
                <div className="flex items-center gap-1 text-xs text-green-600 mb-2">
                  <i className="fas fa-check-circle" />
                  <span>Registration Complete</span>
                </div>
              )}
              <div className="whitespace-pre-line text-sm">{message.text}</div>
              {message.showSkip && (
                <div className="mt-2">
                  <button
                    onClick={() => {
                      const skipMessage = {
                        text: "skip",
                        isBot: false,
                        timestamp: new Date(),
                      };
                      setMessages((prev) => [...prev, skipMessage]);
                      advanceLeadStep();
                    }}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-xs transition-colors"
                  >
                    Skip
                  </button>
                </div>
              )}
              {message.showProducts && (
                <div className="mt-3 space-y-2">
                  {message.showProducts.slice(0, 3).map((productId) => {
                    const product = Object.values(productsData)
                      .flat()
                      .find((p) => p.id === productId);
                    if (!product) return null;
                    return (
                      <div
                        key={productId}
                        className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-blue-300"
                        onClick={() =>
                          setSelectedProduct && setSelectedProduct(product)
                        }
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <LazyImage
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded-lg group-hover:scale-105 transition-transform"
                              placeholder="data:image/svg+xml,%3Csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23E5E7EB'/%3E%3Ctext x='50%25' y='50%25' font-size='10' text-anchor='middle' dy='.3em' fill='%236B7280'%3E...%3C/text%3E%3C/svg%3E"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all flex items-center justify-center">
                              <i className="fas fa-search text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">
                              {product.description}
                            </p>
                            <p className="text-sm font-medium text-blue-600">
                              {product.price_range}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Click for details →
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {message.showProducts.length > 3 && (
                    <div className="text-center">
                      <button
                        className="text-blue-600 text-sm hover:text-blue-700 font-medium"
                        onClick={() => handleQuickReply("Show more products")}
                      >
                        View {message.showProducts.length - 3} more products →
                      </button>
                    </div>
                  )}
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

      {messages.length <= 1 && (
        <div className="p-3 border-t border-gray-200 flex-shrink-0">
          <div className="text-xs text-gray-500 mb-2 text-center">
            Quick suggestions:
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 text-teal-700 rounded-full text-xs transition-colors border border-teal-200 font-medium hover:shadow-md"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={
              isLeadCapture
                ? "Enter your response..."
                : isAIEnabled
                ? "Ask me anything about IT infrastructure..."
                : "Ask about network switches, firewalls, servers..."
            }
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 disabled:from-gray-400 disabled:to-gray-400 text-white p-2 rounded-full transition-all duration-200 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <i className="fas fa-paper-plane" />
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          {isLeadCapture ? (
            <span className="flex items-center justify-center gap-1">
              <i className="fas fa-user-plus text-green-500" />
              Lead capture in progress ({leadStep + 1}/6)
            </span>
          ) : isAIEnabled ? (
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
