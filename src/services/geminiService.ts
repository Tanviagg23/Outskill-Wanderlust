import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initializeGemini();
  }

  private initializeGemini() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
    }
  }

  async generateResponse(prompt: string, context?: string): Promise<string> {
    if (!this.model) {
      return "I'm sorry, but I'm not properly configured right now. Please make sure the Gemini API key is set up correctly.";
    }

    try {
      const travelContext = `You are an expert AI travel assistant for a travel planning platform. You help users plan trips, find destinations, manage budgets, create itineraries, and answer travel-related questions. Always provide helpful, accurate, and engaging responses about travel.

${context ? `Previous context: ${context}` : ''}

User question: ${prompt}

Please provide a helpful response about travel planning, destinations, or travel advice:`;

      const result = await this.model.generateContent(travelContext);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating Gemini response:', error);
      
      if (error instanceof Error && error.message.includes('API_KEY')) {
        return "It looks like there's an issue with the API configuration. Please check that your Gemini API key is valid and properly set.";
      }
      
      return "I'm having trouble processing your request right now. Please try again in a moment.";
    }
  }

  async generateTravelSuggestions(userInput: string): Promise<string[]> {
    if (!this.model) {
      return [
        "Plan a weekend getaway",
        "Find budget-friendly destinations",
        "Create a 7-day itinerary",
        "Best time to visit popular destinations"
      ];
    }

    try {
      const prompt = `Based on the user input "${userInput}", generate 4 short, relevant travel-related suggestions or questions that would be helpful for trip planning. Return only the suggestions, one per line, without numbering or bullet points.`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const suggestions = response.text().split('\n').filter(s => s.trim()).slice(0, 4);
      
      return suggestions.length > 0 ? suggestions : [
        "Plan a weekend getaway",
        "Find budget-friendly destinations", 
        "Create a 7-day itinerary",
        "Best time to visit popular destinations"
      ];
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return [
        "Plan a weekend getaway",
        "Find budget-friendly destinations",
        "Create a 7-day itinerary", 
        "Best time to visit popular destinations"
      ];
    }
  }

  isConfigured(): boolean {
    return this.model !== null;
  }
}

export const geminiService = new GeminiService();