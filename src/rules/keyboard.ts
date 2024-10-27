import { removeComments } from "../utils/sanitizers";

export function checkKeyboardAccess(html: string): boolean {
  const interactiveElements = [
    'button',
    'a',
    'input',
    'select',
    'textarea',
    'video',
    'div[role="button"]',
  ];

  const regex = new RegExp(`<(${interactiveElements.join('|')})([^>]*?)>`, 'gi');
  const cleanedHtml = removeComments(html); 

  let match;
  let allAccessible = true;

  while ((match = regex.exec(cleanedHtml)) !== null) {
    const tag = match[0];
    console.log('Evaluating tag:', tag);

    const hasTabindex = /tabindex=["']?\d*["']?/.test(tag) || /tabindex=["']?[-1]["']?/.test(tag);
    const hasFocus = /onfocus=|onclick=|onkeydown=|onkeyup=/i.test(tag);

    const isInherentlyFocusable = /<button|<input|<a/.test(tag);

    if (isInherentlyFocusable) {
      if (!hasTabindex && !hasFocus) {
        console.warn(`Non-focusable interactive element detected: ${tag}`);
        allAccessible = false;
      }
    } else {
      if (!hasTabindex && !hasFocus) {
        console.warn(`Non-focusable interactive element detected: ${tag}`);
        allAccessible = false;
      }
    }
  }

  console.log('Final accessibility result:', allAccessible);
  return allAccessible;
}
