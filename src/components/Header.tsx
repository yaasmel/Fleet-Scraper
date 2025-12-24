import React from 'react';
import { Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCtaClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground text-lg">Fleet Scraper</span>
          </div>

          {/* CTA */}
          <Button variant="cta" size="sm" onClick={onCtaClick}>
            Start Targeting
          </Button>
        </div>
      </div>
    </header>
  );
};
