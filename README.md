# 🚀 Saraha Clone — Full Stack Anonymous Messaging App

A full-stack web application inspired by **Saraha**, allowing users to receive **anonymous messages** through a public profile link.

Users can register, log in, generate a shareable link, receive anonymous messages, and manage their inbox.

---

## 🌐 Live Demo

- **Frontend:** https://your-frontend.vercel.app  
- **Backend API:** https://saraha-clone.vercel.app  

> Replace the frontend link with your deployed app.

---

## 🧠 Concept

Each user gets a **public profile link** like:

https://your-frontend.vercel.app/user/username

Anyone can open this link and send an anonymous message — no login required.

---

## 🏗️ Tech Stack

### 🔹 Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS / Custom CSS

### 🔹 Backend
- Node.js
- Express.js
- MongoDB / Mongoose
- JWT Authentication
- bcrypt
- Joi Validation
- Multer (file uploads)
- Morgan
- CORS

---

## ✨ Features

### 🔐 Authentication
- Register new user
- Login with JWT
- Protected routes (Dashboard, Inbox)


### 🔗 Public Profile
- Unique shareable URL per user
- No authentication required to send messages
- Anonymous message submission

### 💬 Messaging
- Send anonymous messages
- Upload images with messages
- View inbox
- Delete messages

### 📊 Dashboard
- Display user info
- Copy public profile link
- Navigate to inbox

---

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/authentication/register` | Register user |
| POST | `/authentication/login` | Login user |

---

### User

| Method | Endpoint | Description |
|---|---|---|
| GET | `/user/profile` | Get logged-in user |
| PUT | `/user/update` | Update user |
| DELETE | `/user/delete` | Delete user |
| GET | `/user/url` | Generate public profile URL |
| POST | `/user/data-from-url` | Extract user data from URL |

---

### Message

| Method | Endpoint | Description |
|---|---|---|
| POST | `/message/add` | Send anonymous message |
| GET | `/message/all` | Get all messages |
| DELETE | `/message/delete/:id` | Delete message |

