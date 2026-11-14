# NOVA Admin

NOVA Admin is an independent React and Vite management panel for the NOVA technical challenge.

## Prerequisites

- Node.js 24.19 or newer compatible LTS release
- npm

## Environment

Copy `.env.example` to `.env.local` and keep the local file out of Git.

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

The variable contains only the public FakeStoreAPI base URL. Do not place secrets, passwords, tokens, or private keys in Vite client environment variables.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Lint

```bash
npm run lint
```

## Type checking

```bash
npm run typecheck
```

## Production build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Architecture

The project follows the folder responsibilities required by the NOVA challenge. Directories are introduced when they acquire a concrete responsibility instead of being populated with placeholder modules.

- `src/assets`: Admin-owned fonts, icons, and images
- `src/components`: page-specific component compositions
- `src/dictionary`: Persian and English translations
- `src/modals`: reusable accessible dialogs
- `src/pages`: route-level pages
- `src/redux`: Redux Toolkit store, typed hooks, and slices
- `src/routes`: centralized routes and route protection
- `src/shared`: reusable cross-page UI
- `src/storage`: validated browser persistence
- `src/types/enums`: shared types and enums
- `src/utils/api`: shared Axios transport and error normalization
- `src/utils/services`: typed API request functions
- `src/validations`: Yup schemas

NOVA Store is a read-only design and primitive reference. NOVA Admin does not import Store source code and has independent dependencies, assets, configuration, and Git history.

## Current foundation

- React with Vite
- Strict TypeScript configuration
- ESLint for React and TypeScript
- `@/` alias mapped to `src/`
- Independent environment contract

Feature architecture, state management, API behavior, FakeStoreAPI limitations, and security decisions will be documented as their requested implementation steps are completed.

TypeScript 6.0.3 is used because the installed typescript-eslint release does not support TypeScript 7 yet. The minimatch override selects the patched dependency version used by lint tooling.

The requested folder tree exists locally. Empty responsibility folders are intentionally not represented by placeholder files in Git; they will enter version control when their implementation is introduced.

## Git workflow

## API and experimental authentication

Public FakeStoreAPI demo credentials:

```text
Username: mor_2314
Password: 83r5^_
```

These credentials belong to the public mock service and must not be reused for a real account.

All Admin endpoints use the Axios instance in `src/utils/api`, with an environment-provided URL, JSON headers, a 15-second timeout, and normalized errors. Endpoint payloads and responses are typed separately from presentation. TypeScript types do not constitute runtime response validation.

Authentication uses Formik/Yup, Redux Toolkit, and protected React Router routes. A session is restored synchronously before protected content renders. Tokens are held in sessionStorage for the current tab and checked for a valid JWT expiration. This check does not verify signatures or replace backend authorization. Passwords are not persisted.

FakeStoreAPI cannot issue application-controlled HttpOnly cookies here. sessionStorage remains readable by JavaScript and vulnerable to XSS. Production authentication should use a supporting backend and secure HttpOnly/Secure/SameSite cookies. No browser encryption key is embedded.

FakeStoreAPI POST responses do not guarantee persistence or synchronization with Store. Future create screens must append successful responses to their current in-memory dataset. Frontend pagination operates on that dataset, including temporary records, and search changes must reset the current page. The shared pagination utility clamps page bounds.

## Admin shell and products

Authenticated routes include the dashboard, product list, and Create Product form. The fixed navy Sidebar owns navigation, language, theme, and logout. The users routes currently show an explicit pending state until their implementation step.

Products are loaded through the shared service, searched locally by title, and paginated in groups of six. Successfully created products are prepended from the Redux temporary collection; they disappear on reload or logout and are not synchronized with NOVA Store. Search resets pagination; page bounds are clamped after dataset changes. Prices retain the API's USD contract.

The product form validates title, description, positive price, an available category, and an HTTP/HTTPS image URL with Formik/Yup. Category loading and failures are independent from product loading, and submission is disabled until categories are available. Submission success returns to the list with feedback. Image selection uses URLs, not an upload backend.

The repository starts on an unborn `develop` branch. No baseline commit has been created. Part branches can be created from the baseline after its explicit approval and commit. Each Major uses `part<number>-<english-title>` and commit scope `p<number>`. Each commit, merge, and push requires separate explicit approval. The previous part must be merged into develop before the next part branch is created. Branches are retained after merges.

The local instruction file is ignored and must never be staged or committed.
