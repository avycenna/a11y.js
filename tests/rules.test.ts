import {
  checkAlt,

  checkAria,
  checkAriaLabels,
  checkAriaRequired,
  checkAriaFocusMgmt,
  checkAriaRoles,
  checkAriaProperties,
  checkAriaErrors,
  checkAriaLandmarks,
  checkAriaLiveRegions,
  checkAriaKeyboardNavigation,
  checkAriaRelationships,
  checkAriaRoleDuplications,

  checkContrastRatio,
  getContrastRatio,
  getLuminance,
  convertToRgb,
  detectColorMode,
  hexToRgb,
  hslToRgb,

  checkKeyboardAccess,
} from '../src';

// @Alt check tests
describe('checkAlt', () => {
  it('should return true for tags that don\'t require alt', () => {
    const html = `
      <main>
        <div>
          <h1>Page Heading</h1>
          <p>Some paragraph text.</p>
        </div>
      </main>
    `;
    const result = checkAlt(html);
    expect(result).toBe(true);
  });

  it('should return true for valid alt attributes', () => {
    const html = `
      <img src="image.jpg" alt="Description">
      <input type="image" src="button.png" alt="Submit">
      <area shape="rect" coords="34,44,270,350" href="#" alt="Area description">
      <video src="video.mp4" alt="Video description"></video>
    `;
    const result = checkAlt(html);
    expect(result).toBe(true);
  });

  it('should return false for missing alt attributes', () => {
    const html = `
      <img src="image.jpg">
      <input type="image" src="button.png">
      <area shape="rect" coords="34,44,270,350" href="#">
      <video src="video.mp4"></video>
    `;
    const result = checkAlt(html);
    expect(result).toBe(false);
  });

  it('should return false for commented-out alt attributes', () => {
    const html = `
      <Image
        width={500}
        height={500}
        // alt="Descriptive alternative text"
        src="/some-image.jpg"
      />
    `;
    const result = checkAlt(html);
    expect(result).toBe(false);
  });

  it('should return false for inline commented-out alt attributes', () => {
    const html = `<Image width={500} height={500} {/* alt="Descriptive alternative text" */} src="/some-image.jpg" />`;
    const result = checkAlt(html);
    expect(result).toBe(false);
  });
});

// @ARIA check tests
describe('ARIA Accessibility Tests', () => {
  let validHtml = '';
  let invalidHtml = '';

  beforeEach(() => {
    validHtml = `
      <button aria-label="Submit">Submit</button>
      <input required aria-required="true" />
      <div aria-hidden="true" tabindex="-1"></div>
      <h1 role="heading">Title</h1>
      <img aria-describedby="description" />
      <div role="alert">Error!</div>
      <main role="main"></main>
      <div aria-live="polite">Live content</div>
      <a href="#" tabindex="0">Link</a>
      <div aria-controls="dropdown" id="dropdown"></div>
      <button role="button">Click me</button>
    `;

    invalidHtml = `
      <button>Submit</button>
      <input required />
      <div tabindex="-1"></div>
      <h1>Title</h1>
      <img />
      <div>Error!</div>
      <main></main>
      <div>Live content</div>
      <a href="#">Link</a>
      <div aria-controls="dropdown"></div>
      <button role="button" role="link">Click me</button>
    `;
  });

  test('checkAriaLabels - Valid HTML', () => {
    expect(checkAriaLabels(validHtml)).toBe(true);
  });

  test('checkAriaLabels - Invalid HTML', () => {
    expect(checkAriaLabels(invalidHtml)).toBe(false);
  });

  test('checkAriaRequired - Valid HTML', () => {
    expect(checkAriaRequired(validHtml)).toBe(true);
  });

  test('checkAriaRequired - Invalid HTML', () => {
    expect(checkAriaRequired(invalidHtml)).toBe(false);
  });

  test('checkAriaFocusMgmt - Valid HTML', () => {
    expect(checkAriaFocusMgmt(validHtml)).toBe(true);
  });

  test('checkAriaFocusMgmt - Invalid HTML', () => {
    expect(checkAriaFocusMgmt(invalidHtml)).toBe(false);
  });

  test('checkAriaRoles - Valid HTML', () => {
    expect(checkAriaRoles(validHtml)).toBe(true);
  });

  test('checkAriaRoles - Invalid HTML', () => {
    expect(checkAriaRoles(invalidHtml)).toBe(false);
  });

  test('checkAriaProperties - Valid HTML', () => {
    expect(checkAriaProperties(validHtml)).toBe(true);
  });

  test('checkAriaProperties - Invalid HTML', () => {
    expect(checkAriaProperties(invalidHtml)).toBe(false);
  });

  test('checkAriaErrors - Valid HTML', () => {
    expect(checkAriaErrors(validHtml)).toBe(true);
  });

  test('checkAriaErrors - Invalid HTML', () => {
    expect(checkAriaErrors(invalidHtml)).toBe(false);
  });

  test('checkAriaLandmarks - Valid HTML', () => {
    expect(checkAriaLandmarks(validHtml)).toBe(true);
  });

  test('checkAriaLandmarks - Invalid HTML', () => {
    expect(checkAriaLandmarks(invalidHtml)).toBe(false);
  });

  test('checkAriaLiveRegions - Valid HTML', () => {
    expect(checkAriaLiveRegions(validHtml)).toBe(true);
  });

  test('checkAriaLiveRegions - Invalid HTML', () => {
    expect(checkAriaLiveRegions(invalidHtml)).toBe(false);
  });

  test('checkAriaKeyboardNavigation - Valid HTML', () => {
    expect(checkAriaKeyboardNavigation(validHtml)).toBe(true);
  });

  test('checkAriaKeyboardNavigation - Invalid HTML', () => {
    expect(checkAriaKeyboardNavigation(invalidHtml)).toBe(false);
  });

  test('checkAriaRelationships - Valid HTML', () => {
    expect(checkAriaRelationships(validHtml)).toBe(true);
  });

  test('checkAriaRelationships - Invalid HTML', () => {
    expect(checkAriaRelationships(invalidHtml)).toBe(false);
  });

  test('checkAriaRoleDuplications - Valid HTML', () => {
    expect(checkAriaRoleDuplications(validHtml)).toBe(true);
  });

  test('checkAriaRoleDuplications - Invalid HTML', () => {
    expect(checkAriaRoleDuplications(invalidHtml)).toBe(false);
  });

  test('checkAria - Valid HTML', () => {
    expect(checkAria(validHtml)).toBe(true);
  });

  test('checkAria - Invalid HTML', () => {
    expect(checkAria(invalidHtml)).toBe(false);
  });
});


// @Contrast check tests
describe('checkContrastRatio', () => {
  it('should return true for valid contrast ratio', () => {
    expect(checkContrastRatio('#000000', 'hsl(0, 100%, 100%)')).toBe(true);
  });

  it('should return false for invalid contrast ratio', () => {
    expect(checkContrastRatio('#000000', 'rgba(1, 1, 1)')).toBe(false);
  });
});


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

// @Keyboard check tests
describe('checkKeyboardAccess', () => {
  it("should return true for non-interactive elements", () => {
    const html = `
      <main>
        <div>
          <h1>Page Heading</h1>
          <p>Some paragraph text.</p>
        </div>
      </main>
    `;
    const result = checkKeyboardAccess(html);
    expect(result).toBe(true);
  });

  it('should return true for elements with tabindex', () => {
    const html = `
      <button tabindex="0">Click Me</button>
      <a href="#" tabindex="0">Link</a>
      <input type="text" tabindex="0">
    `;
    const result = checkKeyboardAccess(html);
    expect(result).toBe(true);
  });

  it('should return true for elements with onfocus', () => {
    const html = `
      <button onfocus="console.log('focused')">Click Me</button>
      <a href="#" onfocus="console.log('focused')">Link</a>
    `;
    const result = checkKeyboardAccess(html);
    expect(result).toBe(true);
  });

  it('should return false for interactive elements without tabindex or onfocus', () => {
    const html = `
      <button>Click Me</button>
      <a href="#">Link</a>
      <input type="text">
    `;
    const result = checkKeyboardAccess(html);
    expect(result).toBe(false);
  });

  it('should return true for elements with negative tabindex', () => {
    const html = `
      <button tabindex="-1">Click Me</button>
      <a href="#" tabindex="-1">Link</a>
    `;
    const result = checkKeyboardAccess(html);
    expect(result).toBe(true);
  });
});
