import { checkContrastRatio,  convertToRgb, getContrastRatio } from '../src/rules/contrast';

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
