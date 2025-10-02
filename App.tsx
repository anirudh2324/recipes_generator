import React, { useState, useEffect } from 'react';
import type { Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import Header from './components/Header';
import IngredientForm from './components/IngredientForm';
import RecipeCard from './components/RecipeCard';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import SavedRecipes from './components/SavedRecipes';

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [showSaved, setShowSaved] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedRecipesRaw = localStorage.getItem('savedNarutoRecipes');
      if (savedRecipesRaw) {
        setSavedRecipes(JSON.parse(savedRecipesRaw));
      }
    } catch (e) {
      console.error("Failed to parse saved recipes from localStorage", e);
      setSavedRecipes([]);
    }
  }, []);

  const handleGenerateRecipe = async (ingredients: string, mealType: string, dietaryRestrictions: string, difficulty: string) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const generatedRecipe = await generateRecipe(ingredients, mealType, dietaryRestrictions, difficulty);
      setRecipe(generatedRecipe);
    } catch (err) {
      setError('Sorry, the Recipe Jutsu failed. The scroll could not be summoned. Please check your ingredients and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveRecipe = (recipeToSave: Recipe) => {
    const isAlreadySaved = savedRecipes.some(r => r.recipeName === recipeToSave.recipeName);
    if (!isAlreadySaved) {
      const recipeWithFavorite = { ...recipeToSave, isFavorite: false };
      const updatedRecipes = [...savedRecipes, recipeWithFavorite];
      setSavedRecipes(updatedRecipes);
      localStorage.setItem('savedNarutoRecipes', JSON.stringify(updatedRecipes));
    }
  };

  const handleToggleFavorite = (recipeNameToToggle: string) => {
    const updatedRecipes = savedRecipes.map(r =>
      r.recipeName === recipeNameToToggle ? { ...r, isFavorite: !r.isFavorite } : r
    );
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedNarutoRecipes', JSON.stringify(updatedRecipes));

    // Also update the currently viewed recipe if it's the one being favorited
    if (recipe && recipe.recipeName === recipeNameToToggle) {
        setRecipe(prevRecipe => ({ ...prevRecipe!, isFavorite: !prevRecipe!.isFavorite }));
    }
  };
  
  const handleDeleteRecipe = (recipeNameToDelete: string) => {
    const updatedRecipes = savedRecipes.filter(r => r.recipeName !== recipeNameToDelete);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem('savedNarutoRecipes', JSON.stringify(updatedRecipes));
  };
  
  const handleViewRecipe = (recipeToView: Recipe) => {
    setRecipe(recipeToView);
    setShowSaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const isCurrentRecipeSaved = savedRecipes.some(r => recipe && r.recipeName === recipe.recipeName);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-text">
      <Header onShowSaved={() => setShowSaved(true)} savedCount={savedRecipes.length} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <IngredientForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />

          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
                <strong className="font-bold">A Jutsu has failed! </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {recipe && <RecipeCard recipe={recipe} onSave={handleSaveRecipe} onToggleFavorite={handleToggleFavorite} isSaved={isCurrentRecipeSaved} />}
            {!isLoading && !error && !recipe && (
              <div className="text-center text-gray-500 py-10 px-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 01-9-9h18a9 9 0 01-9 9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12V9s0-2 2-2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V9s0-2 2-2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 12V9s0-2-2-2" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-brand-text">Your recipe scroll will appear here</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Enter some ingredients to begin your training.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      {showSaved && <SavedRecipes recipes={savedRecipes} onClose={() => setShowSaved(false)} onDelete={handleDeleteRecipe} onView={handleViewRecipe} />}
    </div>
  );
};

export default App;
