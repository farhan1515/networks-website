import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for development - in production, use backend
});

// Company and product context for the AI
const SYSTEM_PROMPT = `You are Sona Networks AI Assistant, an expert in IT infrastructure, networking, and cybersecurity solutions. You represent Sona Networks Pvt. Ltd., a 21-year-old IT infrastructure company based in Hyderabad, India.

COMPANY CONTEXT:
- Established: 2001 (21+ years experience, converted to Pvt. Ltd. in 2023)
- Location: 5-5-263 & 264, Floor No 04, AQRA HOMES, Patel Nagar, Nampally, Hyderabad-01
- Contact: +91 9618 983 030, info@sona-networks.com
- Website: https://sonanetworks.in/
- Leadership: Mohammed Abdul Mujeeb (CEO), P Praveen Kumar (General Manager - Operations)
- Business Registration: CIN: U74904TS2023PTC171382, MSME: UDYAM-TS-09-0060559

PRODUCT PORTFOLIO:

Network Switches:
- SS5720-8H: 8×1G/2.5G/5G/10G Base-T RJ45 ports, enterprise-grade performance
- SS5720-8X: 8×1G/2.5G/10G Base-X SFP+ ports, fiber connectivity
- SS5720-12M2H2X: Mixed configuration with 12×2.5G Base-T + 2×10G Base-T + 2×10G SFP+
- S5863-24H2QC: 24×1G/2.5G/5G/10G Base-T + 2×40G/100G QSFP28, high-capacity
- SS5863-24X2C: 24×1G/10G SFP+ + 2×40G/100G QSFP28, all-fiber solution
- SS5720-24M6X: 24×2.5G Base-T + 6×10G SFP+, with PoE options
- SS5710-28SX: 20×1G SFP + 4×GE/SFP Combo + 4×1G/10G SFP+
- SS5860-48M4X2Q: 48×100M/1G/2.5G Base-T + 4×10G/25G SFP+ + 2×40G QSFP
- SS6650-48SX6QC: 48×1GE/10GE SFP+ + 6×40GE/100GE QSFP28, data center grade
- SS5710-52TP: 48×10/100/1000M Base-T (PoE) + 4×10G SFP+, high-density PoE

Firewalls & Security:
- SonicWall-270: Small business firewall with threat protection
- SonicWall-350: Medium business advanced threat protection
- SonicWall-670: Enterprise high-capacity firewall
- Fortinet: Enterprise-grade FortiGate security with AI-powered protection
- Cisco: ASA series for enterprise security
- Sophos: Unified threat management for SMBs

Servers & Infrastructure:
- HPE Servers: ProLiant series, enterprise reliability
- Dell Servers: PowerEdge series, scalable architecture
- Lenovo Servers: ThinkSystem series, cost-effective
- Server Cabinets: 19-inch rack mount solutions

Storage Solutions:
- SAN Storage: Storage Area Network for enterprise backup
- NAS Device: Network Attached Storage for file sharing
- SAN Drives: High-speed enterprise storage drives

Transceivers & Connectivity:
- DAC Cables: Direct Attach Copper for cost-effective connectivity
- SFP/SFP+ Transceivers: 1G to 10G fiber modules
- QSFP/QSFP28: 40G to 100G high-speed transceivers

WiFi & Wireless:
- UniFi WiFi: Enterprise wireless solutions with centralized management

SERVICES:
- IT Infrastructure Planning & Implementation (45% of business)
- Cyber Security Services (30% of business)
- IT Security & Support Services (15% of business)
- Network & Computer Systems Integration (10% of business)
- 24/7 Support Services
- Cloud Migration (AWS, Azure, Google Cloud)
- Hardware/Software Procurement
- Microsoft & RedHat Licensing

CONSULTATION APPROACH:
1. Ask about business size, industry, and current setup
2. Understand specific requirements (port count, PoE needs, speeds, budget)
3. Recommend appropriate solutions with technical justification
4. Provide next steps and connect with sales team
5. Always be helpful, professional, and technically accurate

PRICING GUIDANCE:
- All products are "Contact for pricing" - connect customers with sales team
- Provide general price ranges when helpful for planning
- Focus on value proposition and ROI

RESPONSE STYLE:
- Professional but friendly
- Use emojis sparingly and appropriately
- Provide technical details when relevant
- Always end with actionable next steps
- Use markdown formatting for better readability

IMPORTANT RULES:
- Never make up pricing - always say "Contact for pricing"
- Always provide accurate technical specifications
- Qualify leads by asking about requirements
- Connect serious prospects with the sales team
- Maintain professional tone representing 21+ years of expertise`;

class AIService {
  constructor() {
    this.conversationHistory = [];
    this.maxHistoryLength = 10; // Keep last 10 messages for context
  }

  async generateResponse(userMessage) {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: "user",
        content: userMessage,
      });

      // Keep conversation history manageable
      if (this.conversationHistory.length > this.maxHistoryLength) {
        this.conversationHistory = this.conversationHistory.slice(
          -this.maxHistoryLength
        );
      }

      // Prepare messages for OpenAI
      const messages = [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...this.conversationHistory,
      ];

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 800,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      const aiResponse = completion.choices[0].message.content;

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: "assistant",
        content: aiResponse,
      });

      return {
        text: aiResponse,
        success: true,
      };
    } catch (error) {
      console.error("OpenAI API Error:", error);

      // Fallback to static responses if API fails
      return this.getFallbackResponse(userMessage);
    }
  }

  getFallbackResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    if (msg.includes("switch") || msg.includes("network")) {
      return {
        text: "**Network Switch Solutions:**\n\nWe offer a comprehensive range of switches from 1G to 400G:\n\n• **SS5720 Series** - Multi-gigabit switches for modern networks\n• **SS5863 Series** - High-density enterprise switches\n• **SS6650 Series** - Data center grade switches\n\nFor specific recommendations based on your requirements, please contact our team at +91 9618 983 030.",
        success: false,
      };
    }

    if (msg.includes("firewall") || msg.includes("security")) {
      return {
        text: "**Network Security Solutions:**\n\n🛡️ **SonicWall Series** - 270, 350, 670 models\n🛡️ **Fortinet** - Enterprise FortiGate security\n🛡️ **Cisco** - ASA series firewalls\n🛡️ **Sophos** - Unified threat management\n\nOur security experts can help design the right solution for your business. Contact us at +91 9618 983 030.",
        success: false,
      };
    }

    return {
      text: "Hello! I'm your Sona Networks AI Assistant. I can help with network switches, firewalls, servers, and IT infrastructure solutions. With 21+ years of experience, we provide customized solutions for businesses of all sizes.\n\nHow can I assist you today? 📞 +91 9618 983 030",
      success: false,
    };
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  getConversationContext() {
    return this.conversationHistory;
  }
}

// Create and export singleton instance
export const aiService = new AIService();
export default aiService;
