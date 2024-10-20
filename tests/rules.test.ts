import { checkContrastRatio } from '../src/rules/contrast';

test('should return true for valid contrast ratio', () => {
  expect(checkContrastRatio('#000000', 'hsl(0, 100%, 100%)')).toBe(true);
});

test('should return false for invalid contrast ratio', () => {
  expect(checkContrastRatio('#000000', 'rgba(1, 1, 1)')).toBe(false);
});
