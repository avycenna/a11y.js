# A11y.js

This package provides an accessibility (a11y) audit tool to analyze web content for compliance with accessibility standards. It applies various accessibility rules to ensure that web applications are usable for people with disabilities. This project is part of the Avycenna ecosystem.

## Project Structure
```
/a11y.js
├── /src
│   ├── /rules              # Individual a11y rules
│   ├── /utils              # Helper functions for rule checks
│   └── index.ts            # Main entry point
├── /tests
│   ├── rules.test.ts       # Unit tests for a11y rules
│   └── sanitizers.test.ts  # Unit tests for utils
├── .eslintrc.json          # ESLint configuration file
├── .prettierrc             # Prettier configuration file
├── jest.config.js          # Jest configuration file
├── package.json            # Project metadata and dependencies
└── tsconfig.json           # TypeScript configuration file
```
