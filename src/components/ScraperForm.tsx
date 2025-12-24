import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TagInput } from '@/components/TagInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  User,
  Building2,
  MapPin,
  Settings2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WEBHOOK_URL = 'https://serveur.mercusai.ovh/webhook-test/scraper';

const SENIORITY_LEVELS = [
  { id: 'entry', label: 'Entry Level' },
  { id: 'manager', label: 'Manager' },
  { id: 'director', label: 'Director' },
  { id: 'vp', label: 'VP' },
  { id: 'c-level', label: 'C-Level' },
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1001-5000 employees',
  '5001-10000 employees',
  '10001+ employees',
];

const COMPANY_TYPES = [
  'Public Company',
  'Private Company',
  'Self-Employed',
  'Government Agency',
  'Nonprofit',
  'Partnership',
  'Sole Proprietorship',
];

const YEARS_OF_EXPERIENCE = [
  '0-1 years',
  '1-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years',
];

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'Australia',
  'Netherlands',
  'Spain',
  'Italy',
  'Sweden',
  'Norway',
  'Denmark',
  'Belgium',
  'Switzerland',
  'Austria',
];

interface FormData {
  jobTitles: string[];
  seniorityLevels: string[];
  industry: string;
  companySize: string;
  companyType: string;
  countries: string[];
  regionCity: string;
  yearsOfExperience: string;
  keywords: string[];
  customSearchLogic: string;
}

interface ScraperFormProps {
  formRef: React.RefObject<HTMLDivElement>;
}

export const ScraperForm: React.FC<ScraperFormProps> = ({ formRef }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState<FormData>({
    jobTitles: [],
    seniorityLevels: [],
    industry: '',
    companySize: '',
    companyType: '',
    countries: [],
    regionCity: '',
    yearsOfExperience: '',
    keywords: [],
    customSearchLogic: '',
  });

  const handleSeniorityChange = (levelId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      seniorityLevels: checked
        ? [...prev.seniorityLevels, levelId]
        : prev.seniorityLevels.filter(l => l !== levelId),
    }));
  };

  const handleCountryChange = (country: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      countries: checked
        ? [...prev.countries, country]
        : prev.countries.filter(c => c !== country),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const payload = {
      jobTitles: formData.jobTitles.join(','),
      seniorityLevels: formData.seniorityLevels.join(','),
      industry: formData.industry,
      companySize: formData.companySize,
      companyType: formData.companyType,
      countries: formData.countries.join(','),
      regionCity: formData.regionCity,
      yearsOfExperience: formData.yearsOfExperience,
      keywords: formData.keywords.join(','),
      customSearchLogic: formData.customSearchLogic,
      timestamp: new Date().toISOString(),
    };

    // Build query string from payload
    const queryParams = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    try {
      const response = await fetch(`${WEBHOOK_URL}?${queryParams.toString()}`, {
        method: 'GET',
      });

      if (response.ok) {
        setSubmitStatus('success');
        toast({
          title: "Criteria Sent Successfully!",
          description: "Your targeting criteria has been submitted to the automation system.",
        });
      } else {
        throw new Error('Webhook request failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Submission Failed",
        description: "There was an error sending your criteria. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={formRef} className="py-16 md:py-24" id="scraper-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Define Your Target Audience</h2>
            <p className="section-subtitle mx-auto">
              Fill in the criteria below to precisely target fleet managers and decision-makers on LinkedIn.
            </p>
          </div>

          {/* Form Card */}
          <form onSubmit={handleSubmit} className="form-card">
            {/* Personal & Professional Filters */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Personal & Professional Filters</h3>
              </div>

              <div className="grid gap-6">
                {/* Job Titles */}
                <div>
                  <Label className="input-label">Job Titles</Label>
                  <TagInput
                    tags={formData.jobTitles}
                    onTagsChange={(tags) => setFormData(prev => ({ ...prev, jobTitles: tags }))}
                    placeholder="e.g., Fleet Manager, Transportation Director..."
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">Press Enter to add multiple titles</p>
                </div>

                {/* Seniority Level */}
                <div>
                  <Label className="input-label">Seniority Level</Label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {SENIORITY_LEVELS.map((level) => (
                      <label
                        key={level.id}
                        className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.seniorityLevels.includes(level.id)
                            ? 'border-primary bg-accent text-accent-foreground'
                            : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                        }`}
                      >
                        <Checkbox
                          checked={formData.seniorityLevels.includes(level.id)}
                          onCheckedChange={(checked) => handleSeniorityChange(level.id, checked as boolean)}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">{level.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <Label className="input-label">Industry</Label>
                  <Input
                    value={formData.industry}
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="e.g., Transportation, Logistics, Trucking..."
                    className="h-12"
                  />
                </div>
              </div>
            </div>

            {/* Company Filters */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent rounded-lg">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Company Filters</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Company Size */}
                <div>
                  <Label className="input-label">Company Size</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {COMPANY_SIZES.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Type */}
                <div>
                  <Label className="input-label">Company Type</Label>
                  <Select
                    value={formData.companyType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, companyType: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {COMPANY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Location Filters */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Location Filters</h3>
              </div>

              <div className="grid gap-6">
                {/* Countries */}
                <div>
                  <Label className="input-label">Countries</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-4 border border-input rounded-lg bg-background max-h-48 overflow-y-auto">
                    {COUNTRIES.map((country) => (
                      <label
                        key={country}
                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                      >
                        <Checkbox
                          checked={formData.countries.includes(country)}
                          onCheckedChange={(checked) => handleCountryChange(country, checked as boolean)}
                        />
                        <span className="text-sm">{country}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Region / City */}
                <div>
                  <Label className="input-label">Region / City</Label>
                  <Input
                    value={formData.regionCity}
                    onChange={(e) => setFormData(prev => ({ ...prev, regionCity: e.target.value }))}
                    placeholder="e.g., California, London, Ontario..."
                    className="h-12"
                  />
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent rounded-lg">
                  <Settings2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Advanced Filters</h3>
              </div>

              <div className="grid gap-6">
                {/* Years of Experience */}
                <div>
                  <Label className="input-label">Years of Experience</Label>
                  <Select
                    value={formData.yearsOfExperience}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, yearsOfExperience: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select experience range" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {YEARS_OF_EXPERIENCE.map((exp) => (
                        <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Keywords */}
                <div>
                  <Label className="input-label">Keywords</Label>
                  <TagInput
                    tags={formData.keywords}
                    onTagsChange={(tags) => setFormData(prev => ({ ...prev, keywords: tags }))}
                    placeholder="e.g., EV, telematics, fleet size, GPS tracking..."
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">Add skills, tools, or technologies to refine your search</p>
                </div>

                {/* Custom LinkedIn Search Logic */}
                <div>
                  <Label className="input-label">Custom LinkedIn Search Logic</Label>
                  <Textarea
                    value={formData.customSearchLogic}
                    onChange={(e) => setFormData(prev => ({ ...prev, customSearchLogic: e.target.value }))}
                    placeholder='e.g., ("fleet manager" OR "fleet director") AND (telematics OR "vehicle tracking") NOT "recruitment"'
                    className="min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">Use Boolean operators for advanced search queries</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-border">
              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Criteria...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Criteria Sent!
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Retry Sending
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Scraping Criteria
                  </>
                )}
              </Button>

              {submitStatus === 'success' && (
                <p className="mt-4 text-sm text-green-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Your targeting criteria has been sent to the automation system.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
