export function checkAria(html: string): boolean {
  const labelsCheck = checkAriaLabels(html);
  const requiredCheck = checkAriaRequired(html);
  const rolesCheck = checkAriaRoles(html);
  const propertiesCheck = checkAriaProperties(html);
  const errorsCheck = checkAriaErrors(html);
  const landmarksCheck = checkAriaLandmarks(html);

  return labelsCheck && requiredCheck && rolesCheck && propertiesCheck && errorsCheck && landmarksCheck;
}

export function checkAriaLabels(html: string): boolean {
  /**
   * ARIA Labeling
   * ARIA1, ARIA6, ARIA7, ARIA8, ARIA9, ARIA10, ARIA14, ARIA16:
   * These checks ensure the presence of aria-label, aria-labelledby, or aria-describedby.
   */
  const ariaLabelRegex = /\b(aria-label|aria-labelledby|aria-describedby)=["'][^"']+["']/gi;
  const interactiveElementsRegex = /<(button|input|select|a|img|iframe)\b([^>]*)>/gi;

  let match;
  let isValid = true;

  while ((match = interactiveElementsRegex.exec(html)) !== null) {
    const element = match[0];
    const attributes = match[2];

    if (!ariaLabelRegex.test(attributes)) {
      console.warn(`Element ${element} is missing aria-label or aria-labelledby or aria-describedby.`);
      isValid = false;
    }
  }

  return isValid;
}

function checkAriaRequired(html: string): boolean {
  /**
   * ARIA Required Fields
   * ARIA2:
   * Ensure aria-required is used on required form elements.
   */
  const requiredFieldRegex = /<input\b([^>]*)required\b([^>]*)>/gi;
  const ariaRequiredRegex = /\baria-required=["']true["']/i;

  let match;
  let isValid = true;

  while ((match = requiredFieldRegex.exec(html)) !== null) {
    const attributes = match[1] + match[2];

    if (!ariaRequiredRegex.test(attributes)) {
      console.warn(`Missing aria-required on required input field: ${match[0]}`);
      isValid = false;
    }
  }

  return isValid;
}

function checkAriaRoles(html: string): boolean {
  /**
   * ARIA Roles
   * ARIA4, ARIA12, ARIA20:
   * Ensure elements have appropriate roles like role=heading, role=region, etc.
   */
  const validRoles = ['button', 'heading', 'alert', 'log', 'region', 'status', 'img'];
  const roleRegex = /role=["']?([^"']*)["']?/gi;

  let match;
  let isValid = true;

  while ((match = roleRegex.exec(html)) !== null) {
    const role = match[1].trim();
    if (!validRoles.includes(role)) {
      console.warn(`Invalid ARIA role: ${role}`);
      isValid = false;
    }
  }

  return isValid;
}

function checkAriaProperties(html: string): boolean {
  /**
   * ARIA States and Properties
   * ARIA5, ARIA15:
   * Validate ARIA state attributes (aria-*) and properties like aria-describedby.
   */
  const ariaPropertiesRegex = /\b(aria-[a-z]+)=["'][^"']+["']/gi;

  let match;
  let isValid = true;

  while ((match = ariaPropertiesRegex.exec(html)) !== null) {
    const ariaProperty = match[0];
    if (!ariaProperty) {
      console.warn(`Invalid or missing ARIA property: ${ariaProperty}`);
      isValid = false;
    }
  }

  return isValid;
}

function checkAriaErrors(html: string): boolean {
  /**
   * ARIA Error Identification
   * ARIA18, ARIA19, ARIA21:
   * Ensure the use of aria-invalid and role=alert to identify errors.
   */
  const errorRegex = /aria-invalid=["']?true["']?/gi;
  const roleAlertRegex = /role=["']alert["']/gi;

  let match;
  let isValid = true;

  if (!errorRegex.test(html) && !roleAlertRegex.test(html)) {
    console.warn('Missing aria-invalid or role=alert for error identification.');
    isValid = false;
  }

  return isValid;
}

function checkAriaLandmarks(html: string): boolean {
  /**
   * ARIA Landmarks
   * ARIA11, ARIA20, ARIA13:
   * Check for the presence of ARIA landmarks like role=region, role=heading, etc.
   */
  const landmarkRoles = ['banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region'];
  const roleRegex = /role=["']?([^"']*)["']?/gi;

  let match;
  let isValid = true;

  while ((match = roleRegex.exec(html)) !== null) {
    const role = match[1].trim();
    if (!landmarkRoles.includes(role)) {
      console.warn(`Missing or invalid ARIA landmark role: ${role}`);
      isValid = false;
    }
  }

  return isValid;
}
