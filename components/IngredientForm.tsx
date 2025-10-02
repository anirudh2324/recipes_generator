import React, { useState } from 'react';

interface IngredientFormProps {
  onSubmit: (ingredients: string, mealType: string, dietaryRestrictions: string, difficulty: string) => void;
  isLoading: boolean;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit, isLoading }) => {
  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState('Dinner');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onSubmit(ingredients, mealType, dietaryRestrictions, difficulty);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-brand-text mb-2">
            What ingredients do you have, young ninja?
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., pork belly, noodles, narutomaki, green onions"
            className="w-full h-24 p-3 bg-white text-brand-text border border-gray-400 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out placeholder-gray-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="mealType" className="block text-sm font-medium text-brand-text mb-2">
              Mission Type (Meal)
            </label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full p-3 bg-white text-brand-text border border-gray-400 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
              <option>Dessert</option>
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-brand-text mb-2">
              Ninja Rank (Difficulty)
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 bg-white text-brand-text border border-gray-400 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out"
            >
              <option value="Beginner">Beginner (Genin)</option>
              <option value="Intermediate">Intermediate (Chunin)</option>
              <option value="Advanced">Advanced (Jonin)</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dietary" className="block text-sm font-medium text-brand-text mb-2">
            Ninja Way (Dietary, optional)
          </label>
          <input
            id="dietary"
            type="text"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            placeholder="e.g., vegan, gluten-free"
            className="w-full p-3 bg-white text-brand-text border border-gray-400 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary transition duration-150 ease-in-out placeholder-gray-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !ingredients.trim()}
          className="w-full flex justify-center items-center gap-2 bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Summoning...' : 'Recipe Jutsu!'}
        </button>
      </form>
    </div>
  );
};

export default IngredientForm;