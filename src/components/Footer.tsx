import React from 'react';
import { Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & tagline */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Fleet Scraper</p>
              <p className="text-sm text-muted-foreground">Conçu pour les Équipes de Gestion de Flotte</p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fleet Scraper. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
