import React, { useState } from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSave: (recipe: Recipe) => void;
}

/**
 * Handles image loading errors for ingredient images.
 * When an image fails to load, it's replaced with a generic fallback SVG icon.
 * @param e The synthetic event from the img onError handler.
 */
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const fallbackSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9ca3af">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.117 1.243H4.252c-.654 0-1.187-.585-1.117-1.243l1.263-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.116 1.007zM8.25 10.5a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25V15a2.25 2.25 0 01-2.25-2.25h-3a2.25 2.25 0 01-2.25-2.25V10.5z" />
    </svg>
  `;
  // Use a base64 encoded data URL for the fallback to avoid external requests.
  const svgDataUrl = `data:image/svg+xml;base64,${btoa(fallbackSvg)}`;
  e.currentTarget.src = svgDataUrl;
  e.currentTarget.classList.add('p-2'); // Add padding to the SVG icon
  e.currentTarget.classList.remove('object-cover'); // Ensure SVG is not cropped
};


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopyRecipe = () => {
    if (navigator.clipboard) {
      const recipeText = `
Recipe: ${recipe.recipeName}
${recipe.description}

--------------------

Prep Time: ${recipe.prepTime}
Cook Time: ${recipe.cookTime}
Servings: ${recipe.servings}

--------------------

Ingredients:
${recipe.ingredients.map(ing => `- ${ing.amount} ${ing.name}`).join('\n')}

--------------------

Instructions:
${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}
      `.trim();

      navigator.clipboard.writeText(recipeText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };
  
  const handleSaveClick = () => {
    onSave(recipe);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };


  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start gap-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary flex-grow pr-4">{recipe.recipeName}</h2>
          <div className="flex-shrink-0 flex items-center gap-2">
            <button
              onClick={handleSaveClick}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 border text-sm font-medium rounded-md shadow-sm transition-all duration-200 ${
                isSaved
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : 'bg-white border-gray-300 text-brand-text hover:bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary`}
              aria-live="polite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={isSaved ? "M5 13l4 4L19 7" : "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"} />
              </svg>
              {isSaved ? 'Saved!' : 'Save'}
            </button>
            <button
              onClick={handleCopyRecipe}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 border text-sm font-medium rounded-md shadow-sm transition-all duration-200 ${
                isCopied
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-brand-text hover:bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary`}
              aria-live="polite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={isCopied ? "M5 13l4 4L19 7" : "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"} />
              </svg>
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <p className="mt-3 text-gray-600">{recipe.description}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-brand-text">
            <div className="flex items-center gap-2">
                {/* Kunai Icon for Prep Time */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 3.5l-9 9 4 4 9-9-4-4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 12.5l-4 4a2 2 0 102.828 2.828l4-4-2.828-2.828z" />
                </svg>
                <strong>Prep:</strong> {recipe.prepTime}
            </div>
            <div className="flex items-center gap-2">
                {/* Scroll Icon for Cook Time */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <strong>Cook:</strong> {recipe.cookTime}
            </div>
            <div className="flex items-center gap-2">
                {/* Ramen Bowl Icon for Servings */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 01-9-9h18a9 9 0 01-9 9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12V9s0-2 2-2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V9s0-2 2-2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 12V9s0-2-2-2" />
                </svg>
                <strong>Servings:</strong> {recipe.servings}
            </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 md:px-8 py-6 border-t border-gray-200 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <h3 className="text-xl font-bold text-brand-text mb-4">Ingredients</h3>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                <img
                  src={`https://source.unsplash.com/50x50/?${encodeURIComponent(ingredient.name)},food`}
                  alt={ingredient.name}
                  className="w-12 h-12 rounded-lg object-cover bg-gray-200 flex-shrink-0"
                  onError={handleImageError}
                  loading="lazy"
                />
                <span className="text-brand-text flex-grow">
                    <strong className="font-medium">{ingredient.amount}</strong> {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-text mb-4">Instructions</h3>
          <ol className="space-y-6">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-brand-primary text-white font-bold rounded-full">
                  {index + 1}
                </div>
                <span className="flex-1 text-base leading-relaxed pt-1">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;