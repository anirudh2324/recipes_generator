import React from 'react';
import type { Recipe } from '../types';

interface SavedRecipesProps {
  recipes: Recipe[];
  onClose: () => void;
  onDelete: (recipeName: string) => void;
  onView: (recipe: Recipe) => void;
}

const SavedRecipes: React.FC<SavedRecipesProps> = ({ recipes, onClose, onDelete, onView }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-brand-bg rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-300 flex-shrink-0">
          <h2 className="font-serif text-2xl text-brand-primary">Your Saved Scrolls</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto p-4 md:p-6">
          {recipes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">You haven't saved any secret scrolls yet.</p>
              <p className="text-sm text-gray-400 mt-1">Go perform a Recipe Jutsu to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {recipes.map(recipe => (
                <li key={recipe.recipeName} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center gap-3 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-3 flex-grow mr-4 truncate">
                    {recipe.isFavorite && (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                       </svg>
                    )}
                    <span className="font-medium text-brand-text truncate">{recipe.recipeName}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => onView(recipe)} className="px-3 py-1 text-sm font-semibold bg-brand-secondary text-white rounded-md hover:bg-blue-800 transition-colors">View</button>
                    <button onClick={() => onDelete(recipe.recipeName)} className="px-3 py-1 text-sm font-semibold bg-brand-accent text-white rounded-md hover:bg-red-700 transition-colors">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;
