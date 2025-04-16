
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border mt-8">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Powered by Natural Language Processing and Machine Learning
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Created by Ahamed H, Aashif | {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
