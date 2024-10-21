import { removeComments, normalizeWhitespace } from '../src/utils/sanitizers';

describe('normalizeWhitespace with HTML/JSX/TSX input', () => {

  it('should normalize whitespace in simple HTML', () => {
    const html = '<div>    Some  text   inside   div   </div>';
    expect(normalizeWhitespace(html)).toBe('<div> Some text inside div </div>');
  });

  it('should handle JSX self-closing tags and whitespace between elements', () => {
    const jsx = '<img src="image.png"    alt="image" />    <br/>';
    expect(normalizeWhitespace(jsx)).toBe('<img src="image.png" alt="image" /> <br/>');
  });

  it('should normalize whitespace across multiple lines in JSX', () => {
    const jsx = `
      <div>
        <h1>   Title   </h1>
        <p>  Paragraph   with   extra   spaces   </p>
      </div>
    `;
    expect(normalizeWhitespace(jsx)).toBe('<div> <h1> Title </h1> <p> Paragraph with extra spaces </p> </div>');
  });

  it('should normalize whitespace inside JSX with expressions', () => {
    const jsx = `
      <div>
        { condition && <span>    Some    text    </span> }
      </div>
    `;
    expect(normalizeWhitespace(jsx)).toBe('<div> { condition && <span> Some text </span> } </div>');
  });

  it('should normalize whitespace in TSX with type annotations', () => {
    const tsx = `
      const Component: React.FC = () => (
        <div>   TSX   component   test   </div>
      );
    `;
    expect(normalizeWhitespace(tsx)).toBe('const Component: React.FC = () => ( <div> TSX component test </div> );');
  });

  it('should not alter valid HTML attributes with spaces', () => {
    const html = '<input type="text" placeholder="   Enter   text   here   " />';
    expect(normalizeWhitespace(html)).toBe('<input type="text" placeholder=" Enter text here " />');
  });

  it('should normalize whitespace within nested JSX elements', () => {
    const jsx = `
      <div>
        <section>
          <header>    Header   </header>
          <article>   Content   </article>
        </section>
      </div>
    `;
    expect(normalizeWhitespace(jsx)).toBe('<div> <section> <header> Header </header> <article> Content </article> </section> </div>');
  });

  it('should not remove comments but normalize surrounding whitespace in JSX', () => {
    const jsx = `
      <div>
        {/*   This is a   comment   */}
        <p>  Paragraph  </p>
      </div>
    `;
    expect(normalizeWhitespace(jsx)).toBe('<div> {/* This is a comment */} <p> Paragraph </p> </div>');
  });

});

describe('removeComments', () => {
  it('should remove single line JavaScript comments and excess whitespace', () => {
    const input = `const a = 5; // This is a comment\nconst b = 10;`;
    const expected = `const a = 5; const b = 10;`;
    expect(normalizeWhitespace(removeComments(input))).toEqual(normalizeWhitespace(expected));
  });

  it('should remove multi-line JavaScript comments and excess whitespace', () => {
    const input = `const a = 5; /* This is a comment \n that spans multiple lines */ const b = 10;`;
    const expected = `const a = 5; const b = 10;`;
    expect(normalizeWhitespace(removeComments(input))).toEqual(normalizeWhitespace(expected));
  });

  it('should remove HTML comments and excess whitespace', () => {
    const input = `<!-- This is an HTML comment --> <div>Hello World</div>`;
    const expected = `<div>Hello World</div>`;
    expect(normalizeWhitespace(removeComments(input))).toEqual(normalizeWhitespace(expected));
  });

  it('should remove both JavaScript and HTML comments while preserving non-comment content', () => {
    const input = `
      const a = 5; // JS comment
      <!-- HTML comment -->
      const b = 10; /* Multi-line 
      JS comment */`;
    const expected = `const a = 5; const b = 10;`;
    expect(normalizeWhitespace(removeComments(input))).toEqual(normalizeWhitespace(expected));
  });

  it('should handle nested comments correctly', () => {
    const input = `/* Outer comment // Inner comment */`;
    const expected = ``;
    expect(normalizeWhitespace(removeComments(input))).toEqual(normalizeWhitespace(expected));
  });

  it('should not remove content that is not a comment', () => {
    const input = `<div>Keep this content</div>`;
    const expected = `<div>Keep this content</div>`;
    expect(normalizeWhitespace(removeComments(input))).toEqual(normalizeWhitespace(expected));
  });

  it('should return an empty string when input is empty', () => {
    const input = ``;
    const expected = ``;
    expect(normalizeWhitespace(removeComments(input))).toEqual(normalizeWhitespace(expected));
  });

  it('should handle a mix of comments and code, preserving necessary whitespace', () => {
    const input = `
      const x = 1; // x is one
      <!-- Start of main -->
      const y = 2; /* y is two */
      <!-- End of main -->`;
    const expected = `const x = 1; const y = 2;`;
    expect(normalizeWhitespace(removeComments(input))).toEqual(normalizeWhitespace(expected));
  });
});
