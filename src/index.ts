import { checkAlt } from './rules/alt';

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
} from './rules/aria';

import {
  checkContrastRatio,
  getContrastRatio,
  getLuminance,
  convertToRgb,
  detectColorMode,
  hexToRgb,
  hslToRgb,
} from './rules/contrast';

import { checkKeyboardAccess } from './rules/keyboard';

export {
  checkAlt,

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

  checkContrastRatio,
  getContrastRatio,
  getLuminance,
  convertToRgb,
  detectColorMode,
  hexToRgb,
  hslToRgb,

  checkKeyboardAccess,
};
