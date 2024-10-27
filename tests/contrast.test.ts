import {
  checkContrastRatio,
  convertToRgb,
  getContrastRatio,
  getLuminance,
  detectColorMode,
  hexToRgb,
  hslToRgb,
} from '../src/rules/contrast';

describe('Contrast Ratio Checker', () => {
  
  it('should pass for high contrast colors #FFFFFF and #000000', () => {
    expect(checkContrastRatio('#FFFFFF', '#000000')).toBe(true);  // White vs. Black
  });
  
  
  it('should fail for low contrast colors #777777 and #888888', () => {
    expect(checkContrastRatio('#777777', '#888888')).toBe(false); // Low contrast grays
  });

  
  it('should pass for RGB input rgb(255, 255, 255) and rgb(0, 0, 0)', () => {
    expect(checkContrastRatio('rgb(255, 255, 255)', 'rgb(0, 0, 0)')).toBe(true);  // White vs. Black in RGB
  });

  
  it('should pass for HSL input hsl(0, 0%, 100%) and hsl(0, 0%, 0%)', () => {
    expect(checkContrastRatio('hsl(0, 0%, 100%)', 'hsl(0, 0%, 0%)')).toBe(true);  // White vs. Black in HSL
  });

  
  it('should throw an error for unsupported color format', () => {
    expect(() => checkContrastRatio('invalidColor', '#000000')).toThrow('Unsupported color format');
  });


  it('should correctly convert hex color #FFFFFF to [255, 255, 255]', () => {
    expect(convertToRgb('#FFFFFF')).toEqual([255, 255, 255]);
  });

  
  it('should return the correct contrast ratio between #FFFFFF and #000000', () => {
    const rgb1 = convertToRgb('#FFFFFF');
    const rgb2 = convertToRgb('#000000');
    expect(getContrastRatio(rgb1, rgb2)).toBeCloseTo(21.0); // Maximum contrast ratio (21:1)
  });

  
  it('should fail for same color inputs #FFFFFF and #FFFFFF', () => {
    expect(checkContrastRatio('#FFFFFF', '#FFFFFF')).toBe(false); // Same colors (no contrast)
  });
  
});


describe('getLuminance', () => {
  test('calculates luminance for black (0, 0, 0)', () => {
    expect(getLuminance([0, 0, 0])).toBeCloseTo(0);
  });

  test('calculates luminance for white (255, 255, 255)', () => {
    expect(getLuminance([255, 255, 255])).toBeCloseTo(1);
  });

  test('calculates luminance for gray (128, 128, 128)', () => {
    expect(getLuminance([128, 128, 128])).toBeCloseTo(0.2159, 4);
  });

  test('calculates luminance for red (255, 0, 0)', () => {
    expect(getLuminance([255, 0, 0])).toBeCloseTo(0.2126, 4);
  });
});

describe('convertToRgb', () => {
  test('converts hex color #000000 to RGB [0, 0, 0]', () => {
    expect(convertToRgb('#000000')).toEqual([0, 0, 0]);
  });

  test('converts RGB color string "rgb(255, 0, 0)" to RGB array [255, 0, 0]', () => {
    expect(convertToRgb('rgb(255, 0, 0)')).toEqual([255, 0, 0]);
  });

  test('converts HSL color string "hsl(0, 100%, 50%)" to RGB array [255, 0, 0]', () => {
    expect(convertToRgb('hsl(0, 100%, 50%)')).toEqual([255, 0, 0]);
  });

  test('throws error for unsupported format', () => {
    expect(() => convertToRgb('cmyk(0, 0, 0, 0)')).toThrow('Unsupported color format');
  });
});

describe('detectColorMode', () => {
  test('detects hex color mode for #000000', () => {
    expect(detectColorMode('#000000')).toBe('hex');
  });

  test('detects RGB color mode for rgb(255, 0, 0)', () => {
    expect(detectColorMode('rgb(255, 0, 0)')).toBe('rgb');
  });

  test('detects HSL color mode for hsl(0, 100%, 50%)', () => {
    expect(detectColorMode('hsl(0, 100%, 50%)')).toBe('hsl');
  });

  test('returns "unknown" for an invalid format', () => {
    expect(detectColorMode('cmyk(0, 0, 0, 0)')).toBe('unknown');
  });
});

describe('hexToRgb', () => {
  test('converts #000000 to [0, 0, 0]', () => {
    expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
  });

  test('converts #FFFFFF to [255, 255, 255]', () => {
    expect(hexToRgb('#FFFFFF')).toEqual([255, 255, 255]);
  });

  test('converts #FF0000 to [255, 0, 0]', () => {
    expect(hexToRgb('#FF0000')).toEqual([255, 0, 0]);
  });
});

describe('hslToRgb', () => {
  test('converts HSL (0, 100, 50) to RGB [255, 0, 0]', () => {
    expect(hslToRgb(0, 100, 50)).toEqual([255, 0, 0]);
  });

  test('converts HSL (120, 100, 50) to RGB [0, 255, 0]', () => {
    expect(hslToRgb(120, 100, 50)).toEqual([0, 255, 0]);
  });

  test('converts HSL (240, 100, 50) to RGB [0, 0, 255]', () => {
    expect(hslToRgb(240, 100, 50)).toEqual([0, 0, 255]);
  });
});
