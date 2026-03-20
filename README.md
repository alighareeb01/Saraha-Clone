# Saraha Clone Backend API

A RESTful backend API for an anonymous messaging platform inspired by **Saraha**. Users can create an account, log in, generate a public profile URL, receive anonymous messages, and manage their inbox.

## Live Demo

Deployed on Vercel: [saraha-clone.vercel.app](https://saraha-clone.vercel.app)

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB / Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Joi** for request validation
- **Multer** for file uploads
- **Morgan** for request logging
- **CORS** enabled

## Project Structure

```bash
src/
├── common/
├── database/
├── modules/
│   ├── authentication/
│   ├── message/
│   └── user/
├── app.controller.js
└── main.js
```

## Features

- User registration and login
- JWT-protected routes
- Generate a public profile URL for receiving anonymous messages
- View profile data from a public URL
- Send anonymous messages
- Upload message images
- View all received messages
- Get a single message by ID
- Delete a message
- Update user profile
- Delete user account

## Available Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/authentication/register` | Register a new user |
| POST | `/authentication/login` | Login user |
| GET | `/authentication/token` | Generate/access token for authenticated user |

### User

| Method | Endpoint | Description |
|---|---|---|
| GET | `/user/profile` | Get authenticated user profile |
| PUT | `/user/update` | Update authenticated user |
| DELETE | `/user/delete` | Delete authenticated user |
| GET | `/user/url` | Generate public profile URL |
| GET | `/user/data-from-url` | Get user data through public URL |

### Message

| Method | Endpoint | Description |
|---|---|---|
| POST | `/message/add` | Send anonymous message |
| GET | `/message/all` | Get all messages for authenticated user |
| GET | `/message/:id` | Get one message by ID |
| DELETE | `/message/delete/:id` | Delete message by ID |

## Installation

```bash
git clone https://github.com/alighareeb01/Saraha-Clone.git
cd Saraha-Clone
npm install
```

## Run Locally

Since the project currently listens on port `3000`, start it with your preferred entry command after installing dependencies.

Example:

```bash
node src/main.js
```

Or if you later add a start script in `package.json`:

```bash
npm run start
```

## Environment Variables

The project should ideally use environment variables for values like:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Note: If you are still hardcoding values in the project, you can keep this section for future improvement.

## API Testing

You can test the API using:

- Postman
- Thunder Client
- Insomnia

## Deployment

The project includes a `vercel.json` file and is configured for deployment on **Vercel**.

## Notes

- The backend is written using ES Modules (`"type": "module"`).
- Request validation is implemented with Joi.
- File upload support is present through Multer.
- CORS is enabled to allow frontend integration.

## Future Improvements

- Add proper environment variable support
- Add refresh token flow
- Add Swagger / Postman documentation
- Add better error handling middleware
- Add pagination for messages
- Add role-based access enhancements

## Author

**Ali Ghareeb**

---

If you want a more polished GitHub-style version, you can replace this README later with badges, API examples, and screenshots.
