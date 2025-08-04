// Google Sheets API service for lead capture
class GoogleSheetsService {
  constructor() {
    // You'll need to set this in your environment
    this.sheetUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL || "";
    this.fallbackEmail = "info@sona-networks.com";
  }

  // Save lead data to Google Sheets
  async saveLeadData(leadData) {
    try {
      if (!this.sheetUrl) {
        console.warn(
          "Google Sheets URL not configured, logging lead data:",
          leadData
        );
        // Fallback: log to console or save to localStorage
        this.saveFallback(leadData);
        return { success: true, method: "fallback" };
      }

      const formData = new FormData();
      formData.append("timestamp", new Date().toISOString());
      formData.append("name", leadData.name || "");
      formData.append("company", leadData.company || "");
      formData.append("email", leadData.email || "");
      formData.append("phone", leadData.phone || "");
      formData.append("products_interest", leadData.productsInterest || "");
      formData.append("budget", leadData.budget || "");
      formData.append("requirements", leadData.requirements || "");
      formData.append("source", "Website Chatbot");

      const response = await fetch(this.sheetUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Lead data saved to Google Sheets successfully");
        return { success: true, method: "google_sheets" };
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      // Fallback to local storage
      this.saveFallback(leadData);
      return { success: true, method: "fallback", error: error.message };
    }
  }

  // Fallback method to save data locally
  saveFallback(leadData) {
    try {
      const existingLeads = JSON.parse(
        localStorage.getItem("sona_leads") || "[]"
      );
      const newLead = {
        ...leadData,
        timestamp: new Date().toISOString(),
        source: "Website Chatbot",
      };
      existingLeads.push(newLead);
      localStorage.setItem("sona_leads", JSON.stringify(existingLeads));
      console.log("Lead data saved to localStorage as fallback");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  // Get leads from localStorage (for debugging/fallback)
  getLocalLeads() {
    try {
      return JSON.parse(localStorage.getItem("sona_leads") || "[]");
    } catch (error) {
      console.error("Error reading local leads:", error);
      return [];
    }
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone format (Indian format)
  validatePhone(phone) {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, "");
    // Check for Indian mobile numbers (10 digits starting with 6-9, or with country code)
    return /^[6-9]\d{9}$/.test(cleanPhone) || /^91[6-9]\d{9}$/.test(cleanPhone);
  }

  // Format phone number
  formatPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length === 10) {
      return `+91 ${cleanPhone}`;
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith("91")) {
      return `+${cleanPhone}`;
    }
    return phone;
  }
}

const googleSheetsService = new GoogleSheetsService();
export default googleSheetsService;
