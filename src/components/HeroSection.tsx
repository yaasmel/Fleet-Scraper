import React from 'react';
import { Button } from '@/components/ui/button';
import { Target, Zap } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              Fleet Management SaaS Growth Tool
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Find the Right{' '}
            <span className="text-gradient">Fleet Managers</span>{' '}
            on LinkedIn
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Define your ideal audience and power your outreach automatically. 
            Target decision-makers in fleet management with precision.
          </p>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onCtaClick}
              className="group"
            >
              <Target className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Start Targeting
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Real-time sync</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Webhook ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>n8n compatible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
