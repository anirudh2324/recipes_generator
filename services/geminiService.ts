import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "The name of the recipe, with a creative ninja or Naruto-themed twist." },
    description: { type: Type.STRING, description: "A short, enticing description of the dish." },
    prepTime: { type: Type.STRING, description: "Preparation time, e.g., '15 minutes'." },
    cookTime: { type: Type.STRING, description: "Cooking time, e.g., '30 minutes'." },
    servings: { type: Type.STRING, description: "Number of servings, e.g., '4 servings'." },
    ingredients: {
      type: Type.ARRAY,
      description: "A list of ingredients required for the recipe, including those provided by the user and any additional ones needed.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "The name of the ingredient." },
          amount: { type: Type.STRING, description: "The quantity of the ingredient, e.g., '2 cups' or '1 tbsp'." }
        },
        required: ["name", "amount"]
      }
    },
    instructions: {
      type: Type.ARRAY,
      description: "Step-by-step instructions to prepare the dish.",
      items: { type: Type.STRING }
    }
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"]
};

export const generateRecipe = async (ingredients: string, mealType: string, dietaryRestrictions: string, difficulty: string): Promise<Recipe> => {
  const prompt = `
    You are Teuchi, the legendary chef from Ichiraku Ramen, a master of turning simple ingredients into legendary meals. Believe it!
    Your goal is to train the next generation of ninja chefs. Your tone should be encouraging, energetic, and full of spirit, just like Naruto.

    A young ninja has come to you with a challenge. Create a recipe based on their mission details:
    - **Available Ingredients (Their Scroll):** ${ingredients}
    - **Mission Type (Meal):** ${mealType}
    - **Their Ninja Way (Dietary Restrictions):** ${dietaryRestrictions || 'None'}
    - **Ninja Rank (Difficulty):** ${difficulty}

    Please provide a creative and easy-to-follow recipe tailored to the ninja's rank.
    - For a **Beginner (Genin)**, the steps should be very simple and clear.
    - For an **Intermediate (Chunin)**, you can introduce slightly more complex techniques.
    - For an **Advanced (Jonin)**, feel free to include more challenging steps or sophisticated culinary jutsus.

    The recipe should primarily use the available ingredients, but you can add a few common pantry staples (like oil, salt, pepper, spices) if necessary.
    Give the recipe a cool, ninja-themed name. Let's show them what a true Ramen master can do!
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    return recipeData as Recipe;
  } catch (error) {
    console.error("Error generating recipe with Gemini:", error);
    throw new Error("Failed to generate recipe. The model may have returned an invalid format.");
  }
};