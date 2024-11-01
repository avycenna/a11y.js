export function checkAria(html: string): boolean {
  const ariaRules = [
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
  ];

  return ariaRules.every(check => check(html));
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
      // console.warn(`Element ${element} is missing aria-label or aria-labelledby or aria-describedby.`);
      isValid = false;
    }
  }

  return isValid;
}

export function checkAriaRequired(html: string): boolean {
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
      // console.warn(`Missing aria-required on required input field: ${match[0]}`);
      isValid = false;
    }
  }

  return isValid;
}

export function checkAriaFocusMgmt(html: string): boolean {
  /**
   * ARIA Focus Management
   * ARIA4:
   * Ensure proper focus management for modal dialogs or dynamic elements using aria-hidden or tabindex="-1".
   */
  const focusableElementsRegex = /<(input|button|select|textarea|a|div|span)\b([^>]*)>/gi;
  const ariaHiddenRegex = /\baria-hidden=["']true["']/i;
  const tabIndexRegex = /\btabindex=["']-1["']/i;

  let match;
  let isValid = true;

  while ((match = focusableElementsRegex.exec(html)) !== null) {
    const attributes = match[2];
    
    if (ariaHiddenRegex.test(attributes) || tabIndexRegex.test(attributes)) {
      // console.warn(`Focusable element ${match[0]} should manage focus properly with aria-hidden or tabindex.`);
      isValid = false;
    }
  }

  return isValid;
}

export function checkAriaRoles(html: string): boolean {
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
      // console.warn(`Invalid ARIA role: ${role}`);
      isValid = false;
    }
  }

  return isValid;
}

export function checkAriaProperties(html: string): boolean {
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
      // console.warn(`Invalid or missing ARIA property: ${ariaProperty}`);
      isValid = false;
    }
  }

  return isValid;
}

export function checkAriaErrors(html: string): boolean {
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
    // console.warn('Missing aria-invalid or role=alert for error identification.');
    isValid = false;
  }

  return isValid;
}

export function checkAriaLandmarks(html: string): boolean {
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
      // console.warn(`Missing or invalid ARIA landmark role: ${role}`);
      isValid = false;
    }
  }

  return isValid;
}

export function checkAriaLiveRegions(html: string): boolean {
  /**
   * ARIA Live Regions
   * ARIA22:
   * Ensure the use of aria-live for dynamic content updates like notifications or status messages.
   */
  const liveRegionRegex = /\baria-live=["'](polite|assertive)["']/i;

  if (!liveRegionRegex.test(html)) {
    // console.warn('Missing aria-live attribute for live region updates.');
    return false;
  }

  return true;
}

export function checkAriaKeyboardNavigation(html: string): boolean {
  /**
   * ARIA Keyboard Navigation
   * ARIA9:
   * Ensure that interactive elements are keyboard accessible using tabindex and focus management.
   */
  const focusableElementsRegex = /<(button|a|input|select|textarea)\b([^>]*)>/gi;
  const tabIndexRegex = /\btabindex=["'][0-9]+["']/i;

  let match;
  let isValid = true;

  while ((match = focusableElementsRegex.exec(html)) !== null) {
    const attributes = match[2];
    
    if (!tabIndexRegex.test(attributes)) {
      // console.warn(`Missing tabindex on interactive element ${match[0]} for keyboard accessibility.`);
      isValid = false;
    }
  }

  return isValid;
}

export function checkAriaRelationships(html: string): boolean {
  /**
   * ARIA Relationships
   * ARIA6, ARIA7:
   * Validate that aria-owns, aria-controls, and aria-activedescendant point to existing elements.
   */
  const relationshipAttributes = ['aria-owns', 'aria-controls', 'aria-activedescendant'];
  const relationshipRegex = new RegExp(`\\b(${relationshipAttributes.join('|')})=["'][^"']+["']`, 'gi');

  let match;
  let isValid = true;

  while ((match = relationshipRegex.exec(html)) !== null) {
    const relationship = match[0];
    const targetId = relationship.split('=')[1].replace(/["']/g, '');

    if (!new RegExp(`id=["']${targetId}["']`).test(html)) {
      // console.warn(`ARIA relationship attribute ${relationship} references non-existing element ID: ${targetId}`);
      isValid = false;
    }
  }

  return isValid;
}

export function checkAriaRoleDuplications(html: string): boolean {
  /**
   * ARIA Role Duplications
   * ARIA5:
   * Ensure no element has conflicting ARIA roles, such as combining button and link roles.
   */
  const conflictingRoles = [
    { role: 'button', conflictingRole: 'link' },
    { role: 'heading', conflictingRole: 'banner' }
  ];
  const roleRegex = /role=["']?([^"']*)["']?/gi;

  let match;
  let isValid = true;

  while ((match = roleRegex.exec(html)) !== null) {
    const role = match[1].trim();
    conflictingRoles.forEach(({ role: primaryRole, conflictingRole }) => {
      if (role === primaryRole && new RegExp(`role=["']${conflictingRole}["']`).test(html)) {
        // console.warn(`Element has conflicting roles: ${primaryRole} and ${conflictingRole}.`);
        isValid = false;
      }
    });
  }

  return isValid;
}
