import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize the client only if the key is present to avoid immediate errors, 
// though robust apps should handle missing keys gracefully in UI.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateDateTrivia = async (dateStr: string, context: string): Promise<string> => {
  if (!ai) {
    return "API Key missing. Cannot generate trivia.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      The user has a significant date: ${dateStr}.
      Context: ${context}.
      
      Please provide a short, fascinating, and "mind-blowing" fact about this specific date in history, 
      or what the world might look like at this future date. 
      Keep it under 3 sentences. Be witty and engaging.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Could not retrieve time data.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The time streams are cloudy. Please try again later.";
  }
};