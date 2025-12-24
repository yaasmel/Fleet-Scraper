import React from 'react';
import { Sparkles, TrendingUp, Workflow, Shield } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Automated LinkedIn Targeting',
    description: 'Set your criteria once and let automation handle the prospecting work.',
  },
  {
    icon: TrendingUp,
    title: 'Built for Fleet SaaS Growth',
    description: 'Specifically designed for fleet management software companies.',
  },
  {
    icon: Workflow,
    title: 'n8n & CRM Ready',
    description: 'Seamlessly integrates with your existing workflow automation tools.',
  },
  {
    icon: Shield,
    title: 'Precise Targeting',
    description: 'Reach the exact decision-makers you need with advanced filters.',
  },
];

export const ValuePropositionSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Why Choose Our Platform</h2>
          <p className="section-subtitle mx-auto">
            Purpose-built tools for fleet management SaaS companies
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
