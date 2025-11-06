# Automation-Playwright

A Playwright test suite for LetCode and HerokuApp demo pages. This repository contains end-to-end smoke and assertion tests written in TypeScript using Playwright Test.

## Contents
- `tests/` - Playwright test files (organized by feature)
- `pdfprueba/TestingDoc.pdf` - sample PDF used for upload tests
- `playwright.config.ts` - Playwright configuration

## Prerequisites
- Node.js 16+ installed
- npm (or Yarn)
- Playwright installed in the project (see install step)

## Setup
Open a Windows command prompt (cmd.exe) at the repository root and run:

```cmd
npm install
npx playwright install
```

If you prefer to install Playwright browsers only once for all projects, run:

```cmd
npx playwright install --with-deps
```

## Run tests
Run all tests:

```cmd
npx playwright test
```

Run a single test file:

```cmd
npx playwright test tests\LetCodeSandbox-smoke.spec.ts
```

Run a single test by name:

```cmd
npx playwright test -g "Dynamic button and hidden element should work correctly"
```

Open the HTML report after a run:

```cmd
npx playwright show-report
```

## Notes & tips
- Tests use Playwright Test's fixtures (`page`) and `test.step` to structure scenarios.
- Avoid wrapping tests in an IIFE; tests should be top-level calls to `test()` (the repo currently contains an IIFE but Playwright still discovers tests when the file exports test blocks).
- File upload test uses `setInputFiles`. The assertion checks for a UI confirmation (`Selected File`). If your app shows the uploaded filename instead, assert on that text.
- Drag & drop: some apps use custom drag-and-drop logic (Angular CDK, etc.). If `locator.dragTo()` doesn't visibly move elements in the UI, try simulating mouse events using `page.mouse.move`, `page.mouse.down`, and `page.mouse.up` with bounding boxes.

## Common commands
Install packages:
```cmd
npm install
```

Install Playwright browsers:
```cmd
npx playwright install
```

Run tests headlessly:
```cmd
npx playwright test --reporter=list
```

Run tests headed (open browser windows):
```cmd
npx playwright test --headed
```

Run tests with trace for debugging:
```cmd
npx playwright test --trace on
```

## Troubleshooting
- "Cannot find name 'page'": Ensure you're using Playwright Test's fixtures by declaring `async ({ page }) => { ... }` in `test(...)` and don't use an IIFE for test registration.
- Drag-and-drop not working visually: use mouse events as a fallback.
- Locator not finding element: prefer role-based selectors (`getByRole`) or `locator('selector:has-text("text")')` to target elements within complex layouts.

## License
MIT
