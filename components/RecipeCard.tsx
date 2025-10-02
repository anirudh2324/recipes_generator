import React, { useState } from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSave: (recipe: Recipe) => void;
  onToggleFavorite: (recipeName: string) => void;
  isSaved: boolean;
}

const IngredientIcon: React.FC<{ name: string }> = ({ name }) => {
    const lowerName = name.toLowerCase();
    const iconClasses = "w-10 h-10 text-brand-secondary flex-shrink-0";

    // Pork/Meat icon
    if (['pork', 'beef', 'chicken', 'meat'].some(keyword => lowerName.includes(keyword))) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13.5 8.5C15 10 16 11 16 13a4 4 0 1 1-8 0c0-2 1-3 2.5-4.5"/>
                <path d="M13.5 8.5C13.5 6.5 12 5 10 5s-3.5 1.5-3.5 3.5"/>
                <path d="M18.5 16.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                <path d="M5.5 16.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z"/>
            </svg>
        );
    }
    
    // Noodle icon
    if (['noodle', 'ramen', 'soba', 'udon', 'pasta'].some(keyword => lowerName.includes(keyword))) {
        return (
             <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 12V9s0-2 2-2"/>
                <path d="M12 12V9s0-2 2-2"/>
                <path d="M17 12V9s0-2-2-2"/>
                <path d="M12 21a9 9 0 0 1-9-9h18a9 9 0 0 1-9 9Z"/>
            </svg>
        );
    }

    // Egg icon
    if (lowerName.includes('egg')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c-5 0-9-4.5-9-10S7 2 12 2s9 4.5 9 10-4 10-9 10Z"/>
            </svg>
        );
    }

    // Oil / Sauce icon
    if (['oil', 'vinegar', 'soy sauce', 'sauce'].some(keyword => lowerName.includes(keyword))) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 14h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4z"/>
                <path d="M8 14V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v9"/>
                <path d="M8 8h8"/>
            </svg>
        );
    }
    
    // Salt / Spice icon
    if (['salt', 'pepper', 'spice', 'sugar', 'seasoning'].some(keyword => lowerName.includes(keyword))) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 22h10"/>
                <path d="M6 18h12a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1z"/>
                <path d="M9 3h6v5H9z"/>
                <path d="M12 5h.01"/>
                <path d="M10 5h.01"/>
                <path d="M14 5h.01"/>
            </svg>
        );
    }

    // Vegetable icon
    if (['onion', 'scallion', 'leek', 'garlic', 'cabbage', 'spinach', 'bamboo', 'carrot', 'mushroom', 'pepper', 'lettuce', 'herb'].some(keyword => lowerName.includes(keyword))) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21c0-4.4-3.6-8-8-8-4.4 0-8 3.6-8 8"/>
                <path d="M11 13c0-4.4 3.6-8 8-8 4.4 0 8 3.6 8 8h-16"/>
                <path d="M15 13c0-2.8 2.2-5 5-5"/>
            </svg>
        );
    }

    // Narutomaki/Fish Cake icon (swirl)
    if (['naruto', 'fish cake'].some(keyword => lowerName.includes(keyword))) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.2-8.7"/>
                <path d="M12 15a3 3 0 1 1-2.1-5.1"/>
                <path d="M12 12H3"/>
                <path d="M18 12h-2"/>
                <path d="M12 6V4"/>
                <path d="M12 20v-2"/>
            </svg>
        );
    }

    // Default icon (shuriken)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 10 3-3 3.5 3.5.5-8.5-8.5.5L7 10l-3 3 3 3-3.5 3.5- .5-8.5 8.5.5L17 14l3-3-3-3z"/>
        </svg>
    );
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSave, onToggleFavorite, isSaved: isRecipeSaved }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSaveBtnClicked, setIsSaveBtnClicked] = useState(false);

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
    setIsSaveBtnClicked(true);
    setTimeout(() => setIsSaveBtnClicked(false), 2000);
  };


  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start gap-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary flex-grow pr-4">{recipe.recipeName}</h2>
          <div className="flex-shrink-0 flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(recipe.recipeName)}
              disabled={!isRecipeSaved}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 border text-sm font-medium rounded-md shadow-sm transition-all duration-200 ${
                recipe.isFavorite ? 'text-yellow-500 border-yellow-400 bg-yellow-50' : 'text-brand-text border-gray-300'
              } disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary`}
              title={isRecipeSaved ? 'Toggle Favorite' : 'Save the recipe to favorite it'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
            <button
              onClick={handleSaveClick}
              disabled={isRecipeSaved}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 border text-sm font-medium rounded-md shadow-sm transition-all duration-200 ${
                isRecipeSaved || isSaveBtnClicked
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : 'bg-white border-gray-300 text-brand-text hover:bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary disabled:cursor-not-allowed`}
              aria-live="polite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={(isRecipeSaved || isSaveBtnClicked) ? "M5 13l4 4L19 7" : "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"} />
              </svg>
              {(isRecipeSaved || isSaveBtnClicked) ? 'Saved!' : 'Save'}
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

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <span key={index} className="bg-brand-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

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
          <ul className="space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md border border-gray-200/75">
                 <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 p-1">
                    <IngredientIcon name={ingredient.name} />
                </div>
                <span className="text-brand-text flex-grow">
                    <strong className="font-medium">{ingredient.amount}</strong> {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-text mb-4">Instructions</h3>
          <ol className="space-y-8">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-brand-primary text-white font-bold text-lg rounded-full">
                  {index + 1}
                </div>
                <span className="flex-1 text-lg leading-relaxed pt-1.5">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;