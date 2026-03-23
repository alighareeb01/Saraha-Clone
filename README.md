# Saraha Clone - Full Stack Anonymous Messaging App

A full-stack web application inspired by Saraha, allowing users to receive anonymous messages through a public profile link.

Users can register, verify their account, log in, generate a shareable link, receive anonymous messages, and manage their inbox.

---

## Live Demo

- Frontend: `https://saraha-clone-frontend.vercel.app`
- Backend API: `https://alighareeb-saraha-clone.vercel.app`

Note: the current codebase contains more than one hardcoded deployment URL. Before publishing, align the frontend and backend domains everywhere in the project.

---

## Concept

Each user gets a public profile link like:

```text
https://your-frontend.vercel.app/user/username
```

Anyone can open this link and send an anonymous message without logging in.

---

## Tech Stack

### Frontend

- React with Vite
- React Router DOM
- Axios
- React Hook Form + Zod
- Tailwind CSS v4
- Flowbite

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt
- Joi Validation
- Multer for file uploads
- Nodemailer
- Morgan
- CORS

---

## Features

### Authentication

- Register a new user
- Verify account by email
- Log in with JWT
- Protected routes for dashboard and inbox
- OTP-based password reset flow

### Public Profile

- Unique shareable URL per user
- No authentication required to send a message
- Username-based public profile route

### Messaging

- Send anonymous text messages
- View inbox messages
- Delete messages from inbox
- Backend supports image uploads for messages

### Dashboard

- Fetch logged-in user profile
- Generate and copy a public profile link
- Navigate to inbox

---

## Project Structure

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

---

## Quick Start

### 1. Install Backend Dependencies

```bash
cd Back-End
npm install
```

### 2. Install Frontend Dependencies

```bash
cd Front-End
npm install
```

### 3. Configure Environment Variables

Backend example:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_app_password
```

Frontend example:

```env
VITE_API_URL=http://localhost:8000
```

### 4. Run The Backend

```bash
cd Back-End
node src/main.js
```

### 5. Run The Frontend

```bash
cd Front-End
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/authentication/register` | Register a new user |
| `POST` | `/authentication/login` | Login user |
| `GET` | `/authentication/token` | Generate a new access token for an authenticated user |
| `PUT` | `/authentication/forget-password` | Send OTP to email |
| `PUT` | `/authentication/reset-password` | Reset password using OTP |
| `PUT` | `/authentication/resend-otp` | Resend OTP |
| `GET` | `/authentication/verify` | Verify account using token |

### User

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/user/profile` | Get logged-in user profile |
| `PUT` | `/user/update` | Update user profile |
| `DELETE` | `/user/delete` | Delete logged-in user |
| `GET` | `/user/url` | Generate public profile URL |
| `POST` | `/user/data-from-url` | Extract user data from a public URL |

### Message

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/message/add` | Send anonymous message |
| `GET` | `/message/all` | Get all messages for the logged-in user |
| `GET` | `/message/:id` | Get one message by id |
| `DELETE` | `/message/delete/:id` | Delete message |

---

## Frontend Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/login` | Login page |
| `/register` | Register page |
| `/forgetpassword` | Request password reset OTP |
| `/resetpassword` | Reset password with OTP |
| `/dashboard` | User dashboard |
| `/inbox` | User inbox |
| `/user/:userName` | Public profile page for anonymous messages |

---

## Important Notes

- The frontend sends the custom header format `authentication: <role> <token>` for protected backend routes.
- The backend currently returns a localhost-style URL from `/user/url`; the frontend rebuilds the final public link using the browser origin.
- The frontend stores `accessToken`, `refreshToken`, `currentRole`, and `canResetPassword` in `localStorage`.
- `Front-End/npm run build` succeeds, while `npm run lint` currently reports existing lint issues in the code.
- The backend currently has no real test suite and no `start` or `dev` script in `Back-End/package.json`.

---

## Documentation

- Full backend documentation: `Back-End/README.md`
- Full frontend documentation: `Front-End/README.md`
