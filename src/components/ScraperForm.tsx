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

const WEBHOOK_URL = 'https://n8n-dadycar-d9fscpavbve9c6ew.francecentral-01.azurewebsites.net/webhook-test/scraper';



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
  seniority: string;
  industry: string;
  companySize: string;
  companyType: string;
  countries: string[];
  regionCity: string;
  keywords: string[];
  expectedLeads: string;
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
    seniority: '',
    industry: '',
    companySize: '',
    companyType: '',
    countries: [],
    regionCity: '',
    keywords: [],
    expectedLeads: '',
  });



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
      jobTitle: formData.jobTitles.join(', '),
      industry: formData.industry,
      companySize: formData.companySize,
      seniority: formData.seniority,
      location: formData.countries.join(', ') + (formData.regionCity ? ' - ' + formData.regionCity : ''),
      keywords: formData.keywords.join(', '),
      expectedLeads: formData.expectedLeads ? parseInt(formData.expectedLeads, 10) : undefined
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        toast({
          title: "Critères Envoyés avec Succès !",
          description: "Vos critères de ciblage ont été soumis au système d'automatisation.",
        });
      } else {
        throw new Error('Webhook request failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Échec de la Soumission",
        description: "Une erreur s'est produite lors de l'envoi de vos critères. Veuillez réessayer.",
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
            <h2 className="section-title mb-4">Définissez votre Audience Cible</h2>
            <p className="section-subtitle mx-auto">
              Renseignez les critères ci-dessous pour cibler précisément les gestionnaires de flotte et les décideurs sur LinkedIn.
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
                <h3 className="text-xl font-semibold text-foreground">Filtres Personnels et Professionnels</h3>
              </div>

              <div className="grid gap-6">
                {/* Job Titles */}
                <div>
                  <Label className="input-label">Intitulés de Poste</Label>
                  <TagInput
                    tags={formData.jobTitles}
                    onTagsChange={(tags) => setFormData(prev => ({ ...prev, jobTitles: tags }))}
                    placeholder="Ex : Gestionnaire de Flotte, Directeur des Transports..."
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">Appuyez sur Entrée pour ajouter plusieurs intitulés</p>
                </div>

                {/* Seniority Level */}
                <div>
                  <Label className="input-label">Niveau d'Expérience</Label>
                  <Input
                    type="text"
                    value={formData.seniority}
                    onChange={(e) => setFormData(prev => ({ ...prev, seniority: e.target.value }))}
                    placeholder="Ex: Directeur IT, Head of Fleet, CEO..."
                    className="h-12"
                  />
                </div>

                {/* Industry */}
                <div>
                  <Label className="input-label">Secteur d'Activité</Label>
                  <Input
                    value={formData.industry}
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="Ex : Transport, Logistique, Camionnage..."
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
                <h3 className="text-xl font-semibold text-foreground">Filtres d'Entreprise</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Company Size */}
                <div>
                  <Label className="input-label">Taille de l'Entreprise</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionnez la taille de l'entreprise" />
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
                  <Label className="input-label">Type d'Entreprise</Label>
                  <Select
                    value={formData.companyType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, companyType: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionnez le type d'entreprise" />
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
                <h3 className="text-xl font-semibold text-foreground">Filtres de Localisation</h3>
              </div>

              <div className="grid gap-6">
                {/* Countries */}
                <div>
                  <Label className="input-label">Pays</Label>
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
                  <Label className="input-label">Région / Ville</Label>
                  <Input
                    value={formData.regionCity}
                    onChange={(e) => setFormData(prev => ({ ...prev, regionCity: e.target.value }))}
                    placeholder="Ex : Californie, Londres, Paris..."
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
                <h3 className="text-xl font-semibold text-foreground">Filtres Avancés</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Expected Leads */}
                <div>
                  <Label className="input-label">Nombre de leads approximatif <span className="text-red-500">*</span></Label>
                  <Input
                    type="number"
                    min="1"
                    required
                    value={formData.expectedLeads}
                    onChange={(e) => setFormData(prev => ({ ...prev, expectedLeads: e.target.value }))}
                    placeholder="Ex : 500"
                    className="h-12"
                  />
                </div>

                {/* Keywords */}
                <div>
                  <Label className="input-label">Mots-clés</Label>
                  <TagInput
                    tags={formData.keywords}
                    onTagsChange={(tags) => setFormData(prev => ({ ...prev, keywords: tags }))}
                    placeholder="Ex : VE, télématique, taille de la flotte, suivi GPS..."
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">Ajoutez des compétences, outils ou technologies pour affiner votre recherche</p>
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
                    Envoi des Critères...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Critères Envoyés !
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Réessayer l'Envoi
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer les Critères de Scraping
                  </>
                )}
              </Button>

              {submitStatus === 'success' && (
                <p className="mt-4 text-sm text-green-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Vos critères de ciblage ont été envoyés au système d'automatisation.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
