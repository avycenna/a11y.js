import { checkKeyboardAccess } from '../src/rules/keyboard';

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
