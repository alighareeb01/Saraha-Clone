# Saraha Clone Backend API

A RESTful backend API for an anonymous messaging platform inspired by Saraha.

The backend is responsible for authentication, email verification, password reset, user profile management, public profile resolution, anonymous message delivery, inbox retrieval, and message deletion.

---

## Live API

- Backend API: `https://alighareeb-saraha-clone.vercel.app`

Note: the repository contains more than one hardcoded deployment URL. Before production use, align all API and frontend URLs.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT
- bcrypt
- Joi
- Multer
- Nodemailer
- Morgan
- CORS

---

## Project Structure

```text
src/
|- common/
|  |- email/
|  |- middleware/
|  `- utils/
|- database/
|  |- connection.js
|  `- model/
|- modules/
|  |- authentication/
|  |- message/
|  `- user/
|- app.controller.js
`- main.js
```

---

## Core Features

### Authentication

- Register a new user
- Hash passwords before saving
- Verify account by email token
- Login verified users only
- Issue access and refresh tokens
- Generate a fresh access token for authenticated users

### Password Recovery

- Send OTP to email
- Reset password using email + OTP
- Resend OTP

### User Module

- Get authenticated user profile
- Update name, username, or password
- Delete authenticated user
- Generate a shareable public URL
- Resolve user data from a public URL

### Message Module

- Send anonymous messages
- Upload message images through Multer
- Retrieve inbox messages for the authenticated user
- Get one message by id
- Delete a message

---

## Data Models

### User Model

| Field | Type | Description |
|---|---|---|
| `name` | `String` | Required user display name |
| `email` | `String` | Required and unique |
| `password` | `String` | Required bcrypt-hashed password |
| `image` | `String` | Optional profile image |
| `userName` | `String` | Required and unique username |
| `role` | `String` | `admin` or `user`, default `user` |
| `isVerified` | `Boolean` | Account verification status |
| `otp` | `String` | Temporary OTP for password reset |

### Message Model

| Field | Type | Description |
|---|---|---|
| `recieverId` | `ObjectId` | Receiver user id |
| `content` | `String` | Required message content |
| `image` | `String[]` | Optional image URLs |

---

## Authentication Header Format

Protected routes use a custom header named `authentication`.

```http
authentication: user <token>
```

Supported role prefixes:

- `user`
- `admin`

The backend uses the role prefix as the JWT secret selector inside the auth middleware.

---

## Environment Variables

Example configuration:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_app_password
```

Variables expected by the code:

| Variable | Description |
|---|---|
| `PORT` | Server port |
| `MONGO_URI` | MongoDB connection string |
| `EMAIL_USER` | SMTP email username |
| `EMAIL_PASS` | SMTP email password or app password |

Important note: `src/app.controller.js` uses `dotenv.config({ path: "../.env" })`. If you run the server from `Back-End/`, dotenv looks for `.env` at the repository root, not inside `Back-End/`.

---

## Installation

```bash
cd Back-End
npm install
```

## Run Locally

```bash
node src/main.js
```

Current package scripts:

- `npm test` is still a placeholder and does not run real tests.

---

## API Endpoints

### Root Route

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Returns all users; currently behaves like a debug route |

### Authentication Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/authentication/register` | Register a new user |
| `POST` | `/authentication/login` | Login verified user |
| `GET` | `/authentication/token` | Generate a new access token |
| `PUT` | `/authentication/forget-password` | Send OTP to email |
| `PUT` | `/authentication/reset-password` | Reset password using OTP |
| `PUT` | `/authentication/resend-otp` | Resend OTP |
| `GET` | `/authentication/verify?token=...` | Verify account |

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

Example login response:

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

### User Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/user/profile` | Get authenticated user profile |
| `PUT` | `/user/update` | Update authenticated user |
| `DELETE` | `/user/delete` | Delete authenticated user |
| `GET` | `/user/url` | Generate public profile URL |
| `POST` | `/user/data-from-url` | Get user data from public URL |

Example public URL response:

```json
{
  "profileURL": "http://localhost:3000/user/ali-ghareeb"
}
```

### Message Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/message/add` | Send anonymous message |
| `GET` | `/message/all` | Get all inbox messages |
| `GET` | `/message/:id` | Get one message by id |
| `DELETE` | `/message/delete/:id` | Delete one message |

Example message payload:

```json
{
  "recieverId": "680000000000000000000000",
  "content": "Anonymous hello"
}
```

---

## Validation Rules

### Register Validation

- `name`: string, min 2, max 30
- `email`: valid email
- `password`: letters and numbers, minimum 4 characters
- `confrimPassword`: must match `password`
- `userName`: string, min 3, max 20
- `role`: optional, `user` or `admin`

### Login Validation

- `email`: valid email
- `password`: minimum 4 characters

### Update Validation

- `name`: optional
- `userName`: optional
- `password`: optional
- `oldPassword`: optional

### Message Validation

- `recieverId`: required string
- `content`: required string

---

## File Uploads

The backend accepts uploaded message images through Multer.

- Field name: `images`
- Storage folder: `Back-End/uploads/`
- Static route: `/uploads/<filename>`
- Filename strategy: original file name

Note: the current frontend does not expose a file-upload UI, even though the backend supports it.

---

## Deployment

The backend includes `Back-End/vercel.json` and is configured for deployment on Vercel using `src/main.js` as the entry point.

---

## Important Implementation Notes

- `sendEmail.js` currently hardcodes SMTP credentials instead of reading them from environment variables.
- `/user/url` currently returns a localhost-style URL.
- The auth middleware assumes the `authentication` header exists and does not wrap JWT verification in `try/catch`.
- The root route `/` exposes all users and should not be treated as a production-safe health check.
- There is no centralized error-handling middleware.
- There is no pagination for inbox messages.
