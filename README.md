# Saraha Clone

Saraha Clone is a full-stack anonymous messaging project split into two standalone apps inside one repository:

- `Back-End/`: an Express + MongoDB API
- `Front-End/`: a React + Vite client

This documentation is based on the code that currently exists in the repository, including the current implementation details, integration choices, and a few quirks worth knowing before you run or extend the project.

## Repository Layout

```text
Saraha-Clone/
|- Back-End/
|  |- src/
|  |- uploads/
|  |- package.json
|  |- vercel.json
|  `- README.md
|- Front-End/
|  |- src/
|  |- public/
|  |- package.json
|  |- vercel.json
|  `- README.md
`- README.md
```

## What The Project Does

- Users register with `name`, `email`, `password`, and `userName`.
- The backend sends an account verification email before login is allowed.
- Verified users can log in and receive JWT access and refresh tokens.
- Logged-in users can open a dashboard and copy a public profile link.
- Anyone can open `/user/:userName` and send an anonymous message.
- Logged-in users can view and delete received messages from their inbox.
- Users can trigger an OTP-based password reset flow.

## Architecture Overview

1. The frontend reads `VITE_API_URL` and uses it as the Axios base URL.
2. The backend exposes three module groups: authentication, user, and message.
3. MongoDB stores users and anonymous messages.
4. Login returns both an access token and a refresh token.
5. Protected API routes expect a custom header format: `authentication: <role> <token>`.
6. The dashboard fetches profile data and a public URL from the backend, then rebuilds that public URL against the current browser origin.
7. The public profile page resolves a `userName` into a user id by posting a URL string to `/user/data-from-url`, then sends the anonymous message to `/message/add`.

## Stack

### Frontend

- React 19
- React Router DOM 7
- Axios
- React Hook Form + Zod
- Tailwind CSS v4
- Flowbite
- Vite

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT
- bcrypt
- Joi
- Multer
- Nodemailer
- Morgan
- CORS

## Local Setup

The repository is not configured as a workspace, so each side is installed and run separately.

1. Install backend dependencies.

```bash
cd Back-End
npm install
```

2. Install frontend dependencies.

```bash
cd Front-End
npm install
```

3. Configure backend environment variables.
4. Configure frontend environment variables.
5. Start the backend.

```bash
cd Back-End
node src/main.js
```

6. Start the frontend.

```bash
cd Front-End
npm run dev
```

## Environment Variables

### Backend

The backend code reads or expects these values:

- `PORT`
- `MONGO_URI`
- `EMAIL_USER`
- `EMAIL_PASS`

Example:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_app_password
```

Important: `Back-End/src/app.controller.js` currently calls `dotenv.config({ path: "../.env" })`. If you start the backend from `Back-End/`, dotenv resolves that path to a repo-root `.env`, not `Back-End/.env`. For local development, either:

- place the backend env file at the repository root, or
- update the dotenv path to `.env` inside `Back-End`.

### Frontend

The frontend needs one environment variable:

- `VITE_API_URL`

Example:

```env
VITE_API_URL=http://localhost:8000
```

## Project Docs

- Backend documentation: `Back-End/README.md`
- Frontend documentation: `Front-End/README.md`

## Frontend Route Summary

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Minimal landing page |
| `/login` | Guest | Log in and store tokens in `localStorage` |
| `/register` | Guest | Create a new account |
| `/forgetpassword` | Guest | Request an OTP |
| `/resetpassword` | Guest + reset guard | Submit OTP and new password |
| `/dashboard` | Authenticated | Show `userName` and a shareable public link |
| `/inbox` | Authenticated | List and delete received messages |
| `/user/:userName` | Public | Send an anonymous message |

## Backend API Summary

### Authentication

| Method | Route |
|---|---|
| `POST` | `/authentication/register` |
| `POST` | `/authentication/login` |
| `GET` | `/authentication/token` |
| `PUT` | `/authentication/forget-password` |
| `PUT` | `/authentication/reset-password` |
| `PUT` | `/authentication/resend-otp` |
| `GET` | `/authentication/verify?token=...` |

### User

| Method | Route |
|---|---|
| `GET` | `/user/profile` |
| `PUT` | `/user/update` |
| `DELETE` | `/user/delete` |
| `GET` | `/user/url` |
| `POST` | `/user/data-from-url` |

### Message

| Method | Route |
|---|---|
| `POST` | `/message/add` |
| `GET` | `/message/all` |
| `GET` | `/message/:id` |
| `DELETE` | `/message/delete/:id` |

## Deployment Notes

- `Back-End/vercel.json` routes API traffic to `src/main.js`.
- `Front-End/vercel.json` rewrites all routes to `index.html` so client-side routing works on refresh.
- The codebase currently contains multiple hardcoded deployment domains across backend and frontend files. Align them before using the project as a production template.

## Security And Implementation Notes

- The backend supports uploaded message images, but the current frontend only sends text messages.
- The backend returns a localhost-style public URL from `/user/url`; the frontend converts it into a browser-origin URL before showing it to the user.
- The frontend stores `accessToken`, `refreshToken`, `currentRole`, and `canResetPassword` in `localStorage`.
- `npm run build` succeeds in `Front-End/`.
- `npm run lint` currently reports existing frontend lint issues.
- The backend currently has no real test suite and no `start` or `dev` script in `Back-End/package.json`.
- `Back-End/src/common/email/sendEmail.js` currently hardcodes the SMTP credentials instead of reading them from environment variables. Replace that before sharing or deploying the project.
