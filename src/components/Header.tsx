
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="py-6 border-b border-border">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl md:text-4xl font-bold text-nlp-blue">
              textrizer
            </h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-5 w-5 text-muted-foreground cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-80">Transform lengthy content into concise summaries using advanced NLP techniques</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground text-center max-w-2xl">
            Transform lengthy content into concise summaries using advanced NLP techniques
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
