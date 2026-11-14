# NOVA Admin

An independent, bilingual management panel for the NOVA frontend challenge. Built with React, Vite, strict TypeScript, Redux Toolkit, React Router, styled-components, Axios, Formik, Yup, and Lucide icons.

## Requirements and installation

Use Node.js 24.19 or a newer compatible LTS release and npm. The repository uses `package-lock.json`; do not mix package managers.

```bash
npm ci
```

Copy `.env.example` to `.env.local`:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

Vite client environment values are public. Keep passwords, tokens, private keys, and local environment files out of source control.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run lint` | Check React and TypeScript code with ESLint |
| `npm run typecheck` | Check TypeScript project references |
| `npm run build` | Typecheck and build production assets into `dist` |
| `npm run preview` | Serve the production build locally |

For deployment, configure the host to serve `index.html` for client-side routes. Vite preview is intended for local build inspection.

## Demo login

Public FakeStoreAPI credentials:

```text
Username: mor_2314
Password: 83r5^_
```

These belong to a public mock service and must not be reused for real accounts. Login accepts successful HTTP responses containing a usable token; the remote service controls the exact status code.

## Routes and features

| Route | Purpose |
| --- | --- |
| `/login` | Formik/Yup login with localized validation and request feedback |
| `/` | Minimal authenticated dashboard |
| `/products` | Product table, title search and six-item frontend pagination |
| `/products/create` | Product creation with category retrieval and image URL preview |
| `/users` | User table, search and six-item frontend pagination |
| `/users/create` | User creation with an independent Yup schema |

Management routes require a local session. Guests are redirected to login; authenticated visitors to login are redirected home. Unknown routes redirect home and then pass through the authentication guard.

The fixed Sidebar contains navigation, separate language/theme controls, administrator identity, and logout. Header controls toggle the Sidebar and display localized sample notifications. Those notifications are demonstration content, not backend events.

Persian uses RTL and English uses LTR. Language and Light/Dark theme are persisted independently. Technical values such as emails and phone numbers retain their own direction. The desktop target is 1280px and above; user tables support internal horizontal scrolling. Full mobile/tablet layout is outside the required Admin scope.

## Products and users

Lists load through the shared Axios service and provide loading, retryable error, and empty states. Search updates the input immediately and filters after a 300 ms debounce. Product search matches titles; user search matches first name, family name, username, and email. Search resets pagination and the pagination utility clamps page bounds.

The product form requires title, description, positive price, an available API category, and an HTTP/HTTPS image URL. Category loading is independent and submission is disabled until categories are available. Image previews use a local placeholder for empty or failed URLs; no upload backend is implemented. Prices retain the API's USD contract.

The user form requires first name, family name, username, email, password, and phone. The client policy requires at least eight password characters and a 7–20 character phone representation using Latin digits, an optional leading plus, spaces, parentheses, or hyphens. These are demo validation choices, not production backend guarantees. Submission is disabled while pending; success returns to the list with localized feedback.

Product status badges and disabled edit/delete icons are presentation examples. The disabled user delete icon is also display-only. They do not represent real inventory state or supported mutation operations.

## State, API, and security

Redux Toolkit owns authentication and temporary created-product/user collections. Formik owns form values. Search, pagination, Sidebar state, and dropdown state remain local. Language/theme preferences use localStorage; the authentication token uses sessionStorage for the current tab. Passwords are not persisted or included in user collections.

All requests use `src/utils/api` with the environment-provided base URL, JSON headers, a 15-second timeout, and centralized error normalization. A request interceptor adds the token to management requests; a management `401` clears the local session and temporary collections. Typed services expose:

```text
GET  /products
GET  /products/{id}
GET  /products/categories
POST /products
GET  /users
POST /users
POST /auth/login
```

TypeScript response types are compile-time contracts, not full runtime response validation. Token restoration checks the token's structure and expiration when provided; it does not verify its signature or replace backend authorization.

FakeStoreAPI cannot issue application-controlled HttpOnly cookies here. sessionStorage is accessible to JavaScript and remains vulnerable to XSS. Production authentication should use a supporting backend with HttpOnly/Secure/SameSite cookies. No browser encryption key is embedded.

FakeStoreAPI is a mock service: successful POSTs do not guarantee persistence. New records are appended to in-memory Redux collections and included in the current list and pagination. They disappear on reload or logout, and are not synchronized with NOVA Store. Temporary IDs are local presentation identities rather than durable backend identifiers. Network failures and service availability can affect the demo.

## Source organization

| Path | Responsibility |
| --- | --- |
| `src/assets`, `public/fonts`, `public/images` | Independently owned fonts and media |
| `src/components/atoms` | Reusable native UI primitives |
| `src/components/organisms` | Sidebar and Header sections |
| `src/context/providers` | Redux, theme and router composition |
| `src/dictionary` | Persian and English authored UI strings |
| `src/pages` | Dashboard, products, users, creation and login components |
| `src/redux` | Global session and temporary collections |
| `src/routes` | Central route paths and authentication guards |
| `src/shared` | Shared controls, theme tokens and preferences |
| `src/storage` | Session storage access and validation |
| `src/types` | API and theme contracts |
| `src/utils/api`, `src/utils/services` | Transport and endpoint services |
| `src/validations` | Yup validation schemas |

The challenge's folder responsibilities are preserved with lowercase paths and a small atomic UI structure. Empty responsibility folders are not represented with placeholder files. NOVA Store supplied reusable visual assets and primitive patterns, copied into this repository; Admin has no runtime dependency on the Store repository. `src/DesignSystem.tsx` is a development showcase and is not the authenticated landing page.

TypeScript 6.0.3 is pinned for compatibility with the selected typescript-eslint release. The minimatch override selects a patched lint-tool dependency.

## Verification and scope

Lint, TypeScript checking and production builds have passed during implementation. A Chrome check verified guest redirection to login, all six required user-form errors, no document overflow for that form at 1280px, and no JavaScript page errors in that check. The protected-form check used a synthetic local session; it did not establish successful live API authentication.

Full live API creation, all search/pagination interactions, all keyboard flows, visual reference matching, and every locale/theme combination have not yet been comprehensively verified. Compile success is not a substitute for those browser checks.

Payment, orders, inventory, advanced roles/permissions, password recovery, editing/deleting records, and a custom backend are outside scope. SEO requirements for the public Next.js Store do not apply to this private Vite panel. Actual development time has not been measured precisely; no duration estimate is claimed.

Local instructions, environment files, logs, reference screenshots, node_modules, and build output are excluded from delivery. Commit, merge, and push are separate actions requiring explicit approval.
