export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
};

export function removeComments(html: string): string {
  const commentRegex = /\/\*[\s\S]*?\*\/|\/\/.*$|<!--[\s\S]*?-->/gm;
  return html.replace(commentRegex, '').replace(/\s+/g, ' ').trim();
}
