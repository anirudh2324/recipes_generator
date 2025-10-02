import React from 'react';

interface HeaderProps {
  onShowSaved: () => void;
  savedCount: number;
}

const Header: React.FC<HeaderProps> = ({ onShowSaved, savedCount }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center gap-4">
        <div className="text-center flex-grow">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-primary">
            Ichiraku Recipe Jutsu
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Transform your ingredients with ninja-level cooking!
          </p>
        </div>
        <button 
          onClick={onShowSaved} 
          className="flex-shrink-0 relative inline-flex items-center gap-2 px-3 py-2 border border-brand-secondary text-sm font-medium rounded-md text-brand-secondary bg-white hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden sm:inline">Saved Scrolls</span>
          {savedCount > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-brand-accent rounded-full">
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;