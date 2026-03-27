export interface LayoutPresetConfig {
  order: string[];
  sections: Record<string, boolean>;
  variants: Record<string, string>;
  widgets?: string[];
}

export interface ThemePresetConfig {
  primaryColor?: string;
  secondaryColor?: string;  // injected as --brand-secondary
  accentColor?: string;     // injected as --brand-accent
  radius?: "sharp" | "rounded" | "pill";
  density?: "compact" | "comfortable" | "spacious";
  font?: { heading: string; body: string };
  mode?: "light" | "dark" | "system";
}

export interface LayoutPreset {
  name: string;
  layout: LayoutPresetConfig;
  theme: ThemePresetConfig;
}
