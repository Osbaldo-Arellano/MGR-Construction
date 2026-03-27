"use client";

import { Button } from "@/components/ui/button";
import { useBrand, Language } from "@/contexts/brand-context";

const languageLabels: Record<Language, { short: string; next: Language }> = {
  en: { short: "EN", next: "es" },
  es: { short: "ES", next: "en" },
};

export function LanguageToggle() {
  const { language, setLanguage } = useBrand();

  const current = languageLabels[language];

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(current.next)}
      className="font-medium"
    >
      {current.short}
    </Button>
  );
}
