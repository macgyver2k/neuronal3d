export const DAISYUI_THEME_STORAGE_KEY = "neuronal3d-daisyui-theme";

export const DAISYUI_DEFAULT_THEME = "dark";

export const DAISYUI_THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
] as const;

export type DaisyUiThemeName = (typeof DAISYUI_THEMES)[number];

export function isDaisyUiThemeName(v: string): v is DaisyUiThemeName {
  return (DAISYUI_THEMES as readonly string[]).includes(v);
}

export function hydrateDaisyThemeFromStorage(win: Window & typeof globalThis): void {
  const doc = win.document;
  try {
    const raw = win.localStorage.getItem(DAISYUI_THEME_STORAGE_KEY);
    if (raw && isDaisyUiThemeName(raw)) {
      doc.documentElement.setAttribute("data-theme", raw);
      return;
    }
  } catch {
    void 0;
  }
  doc.documentElement.setAttribute("data-theme", DAISYUI_DEFAULT_THEME);
}
