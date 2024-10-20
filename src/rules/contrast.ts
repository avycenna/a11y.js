// Check if contrast ratio adheres to WCAG 2.1 standards
export function checkContrastRatio(color1: string, color2: string): boolean {
  const rgb1 = convertToRgb(color1);
  const rgb2 = convertToRgb(color2);

  const contrastRatio = getContrastRatio(rgb1, rgb2);
  return contrastRatio >= 4.5;
}

function getContrastRatio(rgb1: number[], rgb2: number[]): number {
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function getLuminance(rgb: number[]): number {
  const a = rgb.map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

// Convert any color mode to RGB
function convertToRgb(color: string): number[] {
  const mode = detectColorMode(color);

  switch (mode) {
    case "hex":
      return hexToRgb(color);
    case "rgb":
      const rgbValues = color.match(/\d+/g)?.map(Number) || [];
      return [rgbValues[0], rgbValues[1], rgbValues[2]];
    case "hsl":
      const hslValues = color.match(/\d+/g)?.map(Number) || [];
      return hslToRgb(hslValues[0], hslValues[1], hslValues[2]);
    default:
      throw new Error("Unsupported color format");
  }
}

function hexToRgb(hex: string): number[] {
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function hslToRgb(h: number, s: number, l: number): number[] {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ];
}

// Detect the input color mode
function detectColorMode(input: string): "hex" | "rgb" | "hsl" | "unknown" {
  input = input.trim();

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(input)) {
    return "hex";
  }

  if (/^rgba?\(\s*(\d{1,3}\s*,\s*){2}\d{1,3}(\s*,\s*(\d*(\.\d+)?)\s*)?\)$/.test(input)) {
    return "rgb";
  }

  if (/^hsla?\(\s*(\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(\d*(\.\d+)?)\s*)?)?\)$/.test(input)) {
    return "hsl";
  }

  return "unknown";
}
