# Saraha Clone Frontend

This frontend is a React + Vite client for the Saraha Clone project. It provides the login, registration, password reset, dashboard, inbox, and public profile flows that sit on top of the backend API.

The documentation below is based on the current implementation in `Front-End/src/`, including the present route guards, local storage strategy, API usage, styling setup, and the current behavior of each screen.

## Responsibilities

- Render public and protected routes
- Register new users
- Log in verified users and store returned tokens locally
- Start the forgot-password flow and submit OTP resets
- Show the logged-in user's public link on the dashboard
- Show inbox messages and allow deletion
- Render a public profile page that lets anyone send an anonymous message

## Stack

- React 19
- React Router DOM 7
- Axios
- React Hook Form
- Zod
- Tailwind CSS v4
- Flowbite
- Vite
- ESLint

## Folder Structure

```text
Front-End/
|- public/
|- src/
|  |- api/axios.js
|  |- assets/
|  |- components/
|  |  |- Dashboard/
|  |  |- ForgetPassword/
|  |  |- GuestRoute/
|  |  |- Home/
|  |  |- Inbox/
|  |  |- Layout/
|  |  |- Login/
|  |  |- MessageCard/
|  |  |- Navbar/
|  |  |- ProtectedRoute/
|  |  |- PublicProfile/
|  |  |- Register/
|  |  |- ResetPassword/
|  |  `- ResetPasswordGuard/
|  |- App.css
|  |- App.jsx
|  |- index.css
|  `- main.jsx
|- index.html
|- package.json
|- vite.config.js
|- vercel.json
`- README.md
```

## Route Map

| Route | Component | Guard | API usage | Notes |
|---|---|---|---|---|
| `/` | `Home` | None | None | Minimal landing page with a styled hero section |
| `/login` | `Login` | `GuestRoute` | `POST /authentication/login` | Stores `accessToken`, `refreshToken`, and `currentRole` in `localStorage` |
| `/register` | `Register` | `GuestRoute` | `POST /authentication/register` | Shows a success message and redirects to login |
| `/forgetpassword` | `ForgetPassword` | `GuestRoute` | `PUT /authentication/forget-password` | Sets `canResetPassword=true` in `localStorage` before redirecting |
| `/resetpassword` | `ResetPassword` | `GuestRoute` + `ResetPasswordGuard` | `PUT /authentication/reset-password` | Also exposes a resend action |
| `/dashboard` | `Dashboard` | `ProtectedRoute` | `GET /user/profile`, `GET /user/url` | Rebuilds the shareable URL using `window.location.origin` |
| `/inbox` | `Inbox` | `ProtectedRoute` | `GET /message/all`, `DELETE /message/delete/:id` | Displays received messages in cards |
| `/user/:userName` | `PublicProfile` | None | `POST /user/data-from-url`, `POST /message/add` | Public message-sending page |

## Component Notes

- `Layout` renders the navbar and exposes a React context that stores the generated share URL.
- `Navbar` checks `localStorage.accessToken` to decide whether to show guest links or authenticated links.
- `ProtectedRoute` redirects unauthenticated users to `/login`.
- `ResetPasswordGuard` only allows entry to `/resetpassword` when `canResetPassword` is set to `true` in `localStorage`.
- `MessageCard` is a simple presentational component for inbox items.

## Local Storage Strategy

The app currently uses `localStorage` for session-related state.

| Key | Written by | Purpose |
|---|---|---|
| `accessToken` | `Login` | Token used for protected API calls |
| `refreshToken` | `Login` | Stored after login, but not actively used by the frontend |
| `currentRole` | `Login` | Used to build the custom `authentication` header |
| `canResetPassword` | `ForgetPassword` | Allows navigation to the reset password form |

Protected API requests send this header shape:

```http
authentication: user <accessToken>
```

The `user` prefix is swapped to `admin` when `currentRole` is `admin`.

## Environment Variables

The frontend uses one runtime variable through Vite:

| Variable | Required | Purpose |
|---|---|---|
| `VITE_API_URL` | Yes | Base URL for the Axios instance in `src/api/axios.js` |

Example:

```env
VITE_API_URL=http://localhost:8000
```

## Install And Run

Install dependencies:

```bash
cd Front-End
npm install
```

Start the development server:

```bash
npm run dev
```

Available scripts:

- `npm run dev`: start Vite dev server
- `npm run build`: build the production bundle
- `npm run preview`: preview the built app locally
- `npm run lint`: run ESLint

## Styling And UI Structure

- `src/index.css` imports Tailwind CSS v4 and Flowbite.
- `src/App.css` holds most of the visual system, including gradients, typography, card styling, navbar styling, inbox cards, and responsive adjustments.
- The navbar is fixed to the top of the viewport.
- The home page uses a single large hero panel rather than a multi-section marketing page.

## API Integration Details

- `src/api/axios.js` creates a shared Axios instance with `baseURL: import.meta.env.VITE_API_URL`.
- `Dashboard` fetches both the current user profile and the backend-generated public URL.
- `PublicProfile` first resolves `userName` to a user id, then posts the anonymous message.
- `Inbox` treats a failed `/message/all` request as an empty inbox from a UI point of view.
- `vite.config.js` also defines a `/api` proxy to a deployed backend, but the current Axios client does not use the `/api` prefix, so that proxy is effectively unused by the active code path.

## Build And Lint Status

- `npm run build` succeeds.
- `npm run lint` currently reports existing issues, including unused imports and stricter React hook rule violations.

## Deployment

`Front-End/vercel.json` rewrites all requests to `index.html`, which supports React Router refreshes on Vercel.

## Current Implementation Notes

- `GuestRoute` currently checks `localStorage.getItem("loginToken")`, while the login flow stores `accessToken`. In practice, logged-in users can still visit guest pages unless this is aligned.
- The reset-password success path navigates to `/dashboard`, but no new login token is written during that flow, so the protected route sends the user back to `/login`.
- The "Resend OTP" button in `ResetPassword` calls `/authentication/forget-password` instead of `/authentication/resend-otp`.
- `PublicProfile` constructs a hardcoded backend-style URL using `http://saraha-clone.vercel.app/user/${userName}` before calling `/user/data-from-url`.
- The backend can accept uploaded message images, but the current frontend does not expose file-upload UI.
- The route names are currently lowercase and use the exact paths `/forgetpassword` and `/resetpassword`.
