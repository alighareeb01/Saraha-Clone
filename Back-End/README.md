# Saraha Clone Backend

This backend is an Express + MongoDB API for the Saraha Clone project. It handles registration, email verification, login, OTP-based password reset, profile lookup, public profile resolution, anonymous message delivery, inbox retrieval, and message deletion.

The documentation below reflects the code currently in `Back-End/src/`, including the current request shapes, auth header format, file upload behavior, and a few implementation details that matter when you run the project locally.

## Responsibilities

- Register users and hash passwords
- Send account verification emails
- Log in verified users and issue JWT tokens
- Generate a profile URL for the logged-in user
- Resolve a public profile URL into user data
- Accept anonymous messages for a target user
- Return inbox messages for the authenticated user
- Delete inbox messages owned by the authenticated user
- Send OTP emails for password reset
- Serve uploaded files from `/uploads`

## Folder Structure

```text
Back-End/
|- src/
|  |- app.controller.js
|  |- main.js
|  |- common/
|  |  |- email/sendEmail.js
|  |  |- middleware/auth.js
|  |  |- middleware/multer.js
|  |  `- utils/validation.js
|  |- database/
|  |  |- connection.js
|  |  `- model/
|  |     |- message.model.js
|  |     `- user.model.js
|  `- modules/
|     |- authentication/
|     |  |- authentication.controller.js
|     |  |- authentication.service.js
|     |  `- authentication.validation.js
|     |- message/
|     |  |- message.controller.js
|     |  |- message.service.js
|     |  `- message.validation.js
|     `- user/
|        |- user.controller.js
|        |- user.service.js
|        `- user.validation.js
|- uploads/
|- package.json
|- vercel.json
`- README.md
```

## Runtime Flow

1. `src/main.js` imports and executes `bootstrap()` from `src/app.controller.js`.
2. `bootstrap()` creates the Express app, connects to MongoDB, enables JSON and URL-encoded parsing, enables CORS, mounts routers, exposes `/uploads`, and starts listening on `process.env.PORT`.
3. Routers delegate each request to a service file inside `src/modules/*`.
4. Mongoose models in `src/database/model/` persist users and messages.

## Data Models

### User

| Field | Type | Notes |
|---|---|---|
| `name` | `String` | Required |
| `email` | `String` | Required and unique |
| `password` | `String` | Required, stored as bcrypt hash |
| `image` | `String` | Optional, not currently populated by the active register flow |
| `userName` | `String` | Required and unique |
| `role` | `String` | `admin` or `user`, default `user` |
| `isVerified` | `Boolean` | Defaults to `false` |
| `otp` | `String` | Temporary OTP for password reset |

### Message

| Field | Type | Notes |
|---|---|---|
| `recieverId` | `ObjectId` | References the `users` collection |
| `content` | `String` | Required message body |
| `image` | `String[]` | Optional uploaded image URLs |

Note: neither schema enables timestamps, so created/updated metadata is not stored automatically.

## Authentication Model

Protected routes use a custom header named `authentication` instead of the more common `Authorization` header.

Header format:

```http
authentication: user <access_or_refresh_token>
```

Notes:

- The header prefix is role-based: `user` or `admin`.
- The middleware chooses the JWT secret from that prefix.
- Access and refresh tokens are both signed with the same role string.
- Verification emails use a separate JWT signed with the literal secret `verify`.

## Environment Variables

| Variable | Required | Purpose | Current behavior |
|---|---|---|---|
| `PORT` | Yes | Express listen port | The bundled local `.env` uses `8000`, but the console log still prints `3000` |
| `MONGO_URI` | Yes | MongoDB connection string | Used by `src/database/connection.js` |
| `EMAIL_USER` | Expected | SMTP username | Logged in `src/app.controller.js`, but not actually consumed by `sendEmail.js` |
| `EMAIL_PASS` | Expected | SMTP password or app password | Logged in `src/app.controller.js`, but not actually consumed by `sendEmail.js` |

Example:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_app_password
```

Important local note: `src/app.controller.js` calls `dotenv.config({ path: "../.env" })`. If you run `node src/main.js` from `Back-End/`, dotenv looks for `.env` at the repository root. Either place the backend env file there, export the variables in your shell, or change the path to `.env` inside `Back-End`.

## Install And Run

Install dependencies:

```bash
cd Back-End
npm install
```

Start the API:

```bash
node src/main.js
```

Current package scripts:

- `npm test` is still the default placeholder and does not run real tests.

## API Documentation

### Miscellaneous Route

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/` | No | Returns all users; currently acts like a debug route rather than a production-safe health check |

### Authentication Routes

| Method | Route | Auth | Request body or query | What it does |
|---|---|---|---|---|
| `POST` | `/authentication/register` | No | `name`, `email`, `password`, `confrimPassword`, `userName` | Validates the body with Joi, checks unique email and `userName`, hashes the password, creates the user, sends a verification email, and returns the created user |
| `POST` | `/authentication/login` | No | `email`, `password` | Requires a verified account, compares the bcrypt hash, and returns `user`, `accessToken`, and `refreshToken` |
| `GET` | `/authentication/token` | Yes | Header only | Reads `req.user` from the auth middleware and mints a new access token with a `7d` lifetime |
| `PUT` | `/authentication/forget-password` | No | `email` | Generates a 6-digit OTP, stores it on the user document, and sends it by email |
| `PUT` | `/authentication/reset-password` | No | `email`, `otp`, `password`, `confrimPassword` | Verifies the OTP, hashes the new password, clears `otp`, and updates the user |
| `PUT` | `/authentication/resend-otp` | No | `email` | Generates a new OTP, saves it, emails it, and returns confirmation |
| `GET` | `/authentication/verify` | No | Query string: `token` | Verifies the signed token from the email link and flips `isVerified` to `true` |

Example register payload:

```json
{
  "name": "Ali",
  "email": "ali@example.com",
  "password": "pass1234",
  "confrimPassword": "pass1234",
  "userName": "ali-ghareeb"
}
```

Example login response shape:

```json
{
  "Message": "user info",
  "user": {
    "_id": "...",
    "name": "Ali",
    "email": "ali@example.com",
    "userName": "ali-ghareeb",
    "role": "user",
    "isVerified": true
  },
  "accessToken": "...",
  "refreshToken": "..."
}
```

### User Routes

| Method | Route | Auth | Request body | What it does |
|---|---|---|---|---|
| `GET` | `/user/profile` | Yes | None | Returns the authenticated user without `password` and `__v` |
| `PUT` | `/user/update` | Yes | `name?`, `userName?`, `password?`, `oldPassword?` | Updates profile fields; if changing the password, `oldPassword` must match |
| `DELETE` | `/user/delete` | Yes | None | Deletes the authenticated user |
| `GET` | `/user/url` | Yes | None | Returns a profile URL string in the form `http://localhost:3000/user/:userName` |
| `POST` | `/user/data-from-url` | No | `url` | Splits the provided URL, extracts the username segment, and returns the matching user without sensitive fields |

Example profile URL response:

```json
{
  "profileURL": "http://localhost:3000/user/ali-ghareeb"
}
```

Example public-profile lookup request:

```json
{
  "url": "http://saraha-clone.vercel.app/user/ali-ghareeb"
}
```

### Message Routes

| Method | Route | Auth | Request body | What it does |
|---|---|---|---|---|
| `POST` | `/message/add` | No | `recieverId`, `content` | Validates the text fields, optionally accepts uploaded files under the `images` field, stores the message, and returns the saved document |
| `GET` | `/message/all` | Yes | None | Returns all messages where `recieverId` matches the authenticated user |
| `GET` | `/message/:id` | Yes | Route param `id` | Returns one message owned by the authenticated user |
| `DELETE` | `/message/delete/:id` | Yes | Route param `id` | Deletes one message owned by the authenticated user |

Example text-only message payload:

```json
{
  "recieverId": "680000000000000000000000",
  "content": "Anonymous hello"
}
```

File upload details:

- Multipart field name: `images`
- Storage location: `Back-End/uploads/`
- Public file route: `/uploads/<filename>`
- Current filename strategy: original filename, which means collisions are possible
- Current URL generation inside the service: `http://localhost:8000/uploads/<originalname>`

## Validation Rules

- Registration validates `name`, `email`, `password`, `confrimPassword`, `userName`, and optionally `role`.
- Login validates `email` and `password`.
- User update validates optional `name`, `userName`, `password`, and `oldPassword`.
- Message creation validates `recieverId` and `content`.
- Password reset and forgot-password routes do not currently use Joi validation middleware.

## CORS And Frontend Integration

CORS currently allows these origins:

- `http://localhost:5173`
- `https://saraha-clone-frontend.vercel.app`

That matches local Vite development and one deployed frontend domain, but the codebase also contains other hardcoded deployment URLs in different files.

## Deployment

`Back-End/vercel.json` is configured to deploy `src/main.js` with `@vercel/node` and route all requests to that entry file.

## Current Implementation Notes

- `src/common/email/sendEmail.js` currently hardcodes the Gmail SMTP credentials instead of reading from environment variables.
- `src/app.controller.js` logs `EMAIL_USER` and whether `EMAIL_PASS` exists, but those values are not wired into the mail transporter.
- `/user/url` always returns a localhost URL, so the frontend rebuilds the final shareable link client-side.
- The auth middleware assumes the `authentication` header exists and does not wrap JWT verification in `try/catch`.
- `GET /` exposes all users and should be treated as a debug route.
- The current code contains no centralized error-handling middleware.
- There is no pagination for inbox messages.
- The frontend does not currently use the backend image-upload capability.
