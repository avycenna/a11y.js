import {
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
} from 'src/rules/aria';

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
