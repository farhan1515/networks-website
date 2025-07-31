// Environment Configuration Example
// Copy this file to environment.js and add your actual API key

export const config = {
  openai: {
    apiKey: "your_openai_api_key_here", // Get from https://platform.openai.com/api-keys
  },
  development: {
    enableAI: true,
    fallbackMode: false,
  },
};

// Instructions:
// 1. Create environment.js from this template
// 2. Add your OpenAI API key
// 3. Never commit environment.js to version control
// 4. Add environment.js to .gitignore
