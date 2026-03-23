# Saraha Clone Frontend

A React + Vite frontend for the Saraha Clone anonymous messaging platform.

The frontend handles registration, login, password reset, dashboard, inbox, and public profile messaging flows.

---

## Live Demo

- Frontend: `https://saraha-clone-frontend.vercel.app`

Note: the repository currently contains multiple hardcoded deployment URLs. Update them to a single consistent frontend/backend setup before production use.

---

## Tech Stack

- React 19
- Vite
- React Router DOM
- Axios
- React Hook Form
- Zod
- Tailwind CSS v4
- Flowbite
- ESLint

---

## Features

### Authentication

- Register a new account
- Login and store JWT tokens locally
- Protect dashboard and inbox routes
- Forgot password and reset password flow with OTP

### Dashboard

- Fetch current user profile
- Fetch public profile URL from backend
- Rebuild and display a shareable frontend link
- Copy public link to clipboard

### Inbox

- Fetch all received messages
- Render messages as cards
- Delete a message from inbox

### Public Profile

- Dynamic route using `userName`
- Resolve username to user id through the backend
- Send anonymous messages without login

---

## Project Structure

```text
src/
|- api/
|  `- axios.js
|- components/
|  |- Dashboard/
|  |- ForgetPassword/
|  |- GuestRoute/
|  |- Home/
|  |- Inbox/
|  |- Layout/
|  |- Login/
|  |- MessageCard/
|  |- Navbar/
|  |- ProtectedRoute/
|  |- PublicProfile/
|  |- Register/
|  |- ResetPassword/
|  `- ResetPasswordGuard/
|- App.css
|- App.jsx
|- index.css
`- main.jsx
```

---

## Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page |
| `/login` | Guest | Login page |
| `/register` | Guest | Register page |
| `/forgetpassword` | Guest | Send OTP to email |
| `/resetpassword` | Guest with guard | Reset password |
| `/dashboard` | Authenticated | User dashboard |
| `/inbox` | Authenticated | Inbox page |
| `/user/:userName` | Public | Anonymous message page |

---

## Environment Variables

Example:

```env
VITE_API_URL=http://localhost:8000
```

Used by:

- `src/api/axios.js`

---

## Installation

```bash
cd Front-End
npm install
```

## Run Locally

```bash
npm run dev
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Authentication Flow

### Login

After a successful login, the frontend stores:

- `accessToken`
- `refreshToken`
- `currentRole`

Protected requests then send:

```http
authentication: user <accessToken>
```

### Reset Password Guard

The forgot-password flow stores `canResetPassword=true` in `localStorage` before navigating to `/resetpassword`.

`ResetPasswordGuard` checks this flag and prevents direct access when it is missing.

---

## API Integration

### Axios Instance

The app uses a shared Axios client:

- File: `src/api/axios.js`
- Base URL: `import.meta.env.VITE_API_URL`

### Main Backend Calls

| Screen | Endpoint |
|---|---|
| Login | `POST /authentication/login` |
| Register | `POST /authentication/register` |
| Forget Password | `PUT /authentication/forget-password` |
| Reset Password | `PUT /authentication/reset-password` |
| Dashboard | `GET /user/profile` |
| Dashboard | `GET /user/url` |
| Inbox | `GET /message/all` |
| Inbox | `DELETE /message/delete/:id` |
| Public Profile | `POST /user/data-from-url` |
| Public Profile | `POST /message/add` |

---

## UI And Styling

- `src/index.css` imports Tailwind CSS v4 and Flowbite.
- `src/App.css` contains most of the visual system and component-level page styling.
- The navbar is fixed at the top.
- The inbox uses card-based layout.
- The home page is intentionally minimal.

---

## Build And Quality Status

- `npm run build` succeeds.
- `npm run lint` currently reports existing lint issues in the project.

---

## Deployment

The frontend includes `Front-End/vercel.json` with a rewrite rule that sends all requests to `index.html`, allowing React Router refreshes to work on Vercel.

---

## Important Implementation Notes

- `GuestRoute` currently checks `loginToken`, while the login flow stores `accessToken`.
- The reset-password success path navigates to `/dashboard`, but that flow does not create a login session.
- The resend button in `ResetPassword` calls `/authentication/forget-password` instead of `/authentication/resend-otp`.
- `PublicProfile` builds a hardcoded backend-style URL before calling `/user/data-from-url`.
- The backend supports image uploads, but the current frontend message form sends text only.
- `vite.config.js` contains a `/api` proxy, but the active Axios client uses `VITE_API_URL` directly.
