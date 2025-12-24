import React from 'react';
import { Target, Zap, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: 'Define Your Audience',
    description: 'Specify your ideal fleet management audience using precise targeting criteria.',
    step: '01',
  },
  {
    icon: Zap,
    title: 'Instant Data Sync',
    description: 'Your criteria is sent instantly to our automation system via webhook.',
    step: '02',
  },
  {
    icon: Rocket,
    title: 'Launch Campaigns',
    description: 'Power your Fleet Management SaaS campaigns with targeted prospect data.',
    step: '03',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">How It Works</h2>
          <p className="section-subtitle mx-auto">
            Three simple steps to power your fleet management outreach
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {step.step}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>

              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
