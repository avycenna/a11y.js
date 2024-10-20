import { checkContrastRatio } from '../src/rules/contrast';
import { checkAlt } from '../src/rules/alt';

describe('checkContrastRatio', () => {
  it('should return true for valid contrast ratio', () => {
    expect(checkContrastRatio('#000000', 'hsl(0, 100%, 100%)')).toBe(true);
  });

  it('should return false for invalid contrast ratio', () => {
    expect(checkContrastRatio('#000000', 'rgba(1, 1, 1)')).toBe(false);
  });
});

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
