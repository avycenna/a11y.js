export function checkAlt(html: string): boolean {
  // Find tags that require the alt attribute
  const regex = /<(img|Image|area|input[^>]*type=["']?image["']?|video)[^>]*>/gi;

  // Remove comments from input string
  const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*$/gm;
  const cleanedHtml = html.replace(commentRegex, '');

  let match;
  let allValid = true;

  while ((match = regex.exec(cleanedHtml)) !== null) {
    const tag = match[0];
    const hasAlt = /alt=["']?[^"']*["']?/.test(tag);

    if (!hasAlt) {
      // console.warn(`Missing alt attribute in: ${tag}`);
      allValid = false;
    }
  }

  return allValid;
}
