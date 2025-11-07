
# 🧩 Automation Playwright Template

A starter template for Playwright end-to-end and API tests using the Page Object Model (POM). This repository contains example UI smoke tests, API lifecycle tests and a small POM (`TemplatePage`) that demonstrates common test actions.

## Contents

- `package.json` - project manifest (dev dependencies include `@playwright/test`).
- `playwright.config.ts` - Playwright configuration (projects for browsers and API tests).
- `Tests/` - test suites (Smoke, Api), page objects and constants.
- `playwright-report/` - generated HTML reports and traces (created after running tests).

## Quick overview

This project is designed to be a template you can adapt for your own Playwright-based test suites. It demonstrates:

- Playwright Test runner configuration with multiple projects (browser + API).
- Page Object Model pattern (`Tests/PageObjects/TemplatePage.ts`).
- Example Smoke UI tests (`Tests/Smoke/Template-Smoke-Test.spec.ts`).
- Example API tests that create/delete resources (`Tests/Api/createAndDeleteRepo.spec.ts`).

## Prerequisites

- Node.js (v16+ recommended).
- npm (or a compatible package manager).
- Optional: a GitHub token (for API tests) set in environment variables.

## Setup

1. Install dependencies:

```cmd
cd %USERPROFILE%\Documents\Automations\TemplatePlaywright
npm install
```

2. Install Playwright browsers (required to run browser tests):

```cmd
npx playwright install
```

3. Environment variables

Create a `.env` file in the project root (or export env vars) if you want to run API tests. Example variables used in tests/config:

```
GH_USER=<your-github-username>
GH_TEST_REPO=<repo-name-for-testing>
API_TEST_TOKEN=<personal-access-token-with-repo-scope>
```

Playwright's config reads `process.env.API_TEST_TOKEN` for the API project authorization header. The API test examples use the Playwright `request` fixture and the `GH_USER` / `GH_TEST_REPO` variables.

## Running tests

- Run all tests:

```cmd
npx playwright test
```

- Run only smoke (UI) tests:

```cmd
npx playwright test Tests\Smoke
```

- Run only API tests:

```cmd
npx playwright test --project=APITest
```

- Show an interactive HTML report after a run:

```cmd
npx playwright show-report
```

If you prefer, you can add npm scripts in `package.json` (for example `test`, `test:smoke`, `test:api`) to wrap the commands above.

## Test examples & what they cover

- `Tests/Smoke/Template-Smoke-Test.spec.ts` — Smoke tests using the `TemplatePage` POM. Examples include clicking a dynamic element, filling a text input and checking/unchecking a checkbox.
- `Tests/PageObjects/TemplatePage.ts` — Page Object Model implementation used by the smoke tests. The page's URL is set to `https://thefreerangetester.github.io/sandbox-automation-testing/` and exposes methods like `open()`, `clickOnDynamicButton()`, `fillTextInput()` and checkbox helpers.
- `Tests/Api/createAndDeleteRepo.spec.ts` — API example that creates a GitHub repository before tests and deletes it after. This test uses `GH_USER`, `GH_TEST_REPO`, and an API token from environment variables.

## Configuration notes

- `playwright.config.ts` contains multiple projects including a Chrome desktop project and an `APITest` project. The API project sets `baseURL` to `https://api.github.com` and reads `Authorization: token ${process.env.API_TEST_TOKEN}`.
- Traces and videos are enabled for debugging (`trace: 'on'`, `video: 'retain-on-failure'`). Reporter includes `list` and `html`.

## Folder structure

Example layout (top-level):

```
package.json
playwright.config.ts
README.md
playwright-report/    # generated test artifacts
Tests/
	├─ Api/
	├─ Smoke/
	├─ PageObjects/
	└─ Constants/
```

## Recommendations & next steps

- Add helpful npm scripts to `package.json` (e.g., `test`, `test:smoke`, `test:api`, `install:browsers`).
- Add CI configuration (GitHub Actions) to run tests on push/PR and to publish the Playwright report as an artifact.
- Add more POMs and shared fixtures/helpers as the test surface grows.

## Contributing

If you want to extend this template:

1. Create a branch and open a pull request.
2. Keep tests isolated and avoid hard-coded secrets — use environment variables.

## License

MIT



