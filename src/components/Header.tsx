
import React from 'react';

const Header = () => {
  return (
    <header className="py-6 border-b border-border">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-nlp-blue">
            Automated Text Summarizer
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl">
            Transform lengthy content into concise summaries using advanced NLP techniques
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
