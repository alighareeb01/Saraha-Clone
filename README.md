# 🚀 Saraha Clone — Full Stack Anonymous Messaging App

A full-stack web application inspired by **Saraha**, built to let users receive **anonymous messages** through a shareable public profile link.

The project includes a **React frontend** and an **Express / MongoDB backend**. Users can register, log in, access a dashboard, copy their public link, receive anonymous messages, and manage their inbox.

---

## 🌐 Live Demo

- **Frontend:** `https://saraha-clone-frontend.vercel.app`
- **Backend:** `https://alighareeb-saraha-clone.vercel.app`

> Update these links if your final deployed domains change.

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected routes for authenticated pages
- Public profile link generation
- Send anonymous messages without logging in
- Inbox page to view received messages
- Delete messages
- Update and manage user account
- Upload images with messages
- Separate frontend and backend deployments on Vercel

---

## 🏗️ Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS / Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- Multer
- Morgan
- CORS

---

## 📁 Project Structure

```bash
Saraha-Clone/
├── backend/
│   ├── src/
│   │   ├── common/
│   │   ├── database/
│   │   ├── modules/
│   │   │   ├── authentication/
│   │   │   ├── message/
│   │   │   └── user/
│   │   └── main.js
│   ├── package.json
│   └── vercel.json
│
├── Front-End/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── README.md
```

---

## 🔄 Application Flow

1. User registers or logs in.
2. Dashboard fetches profile data and generates a public link.
3. User shares the public link.
4. Anyone can open the public profile page and send an anonymous message.
5. Messages are stored in MongoDB.
6. The authenticated user views and manages messages from the inbox.

---

## 🔌 Main API Endpoints

### Authentication
- `POST /authentication/register`
- `POST /authentication/login`

### User
- `GET /user/profile`
- `PUT /user/update`
- `DELETE /user/delete`
- `GET /user/url`
- `POST /user/data-from-url`

### Message
- `POST /message/add`
- `GET /message/all`
- `GET /message/:id`
- `DELETE /message/delete/:id`

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/alighareeb01/Saraha-Clone.git
cd Saraha-Clone
```

### 2. Run the backend

```bash
cd backend
npm install
npm run dev
```

### 3. Run the frontend

```bash
cd ../Front-End
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Frontend

Create a `.env` file inside `Front-End/`:

```env
VITE_API_URL=https://alighareeb-saraha-clone.vercel.app
```

### Backend

You can later move secrets and config into environment variables such as:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
BASE_URL=https://alighareeb-saraha-clone.vercel.app
```

---

## 🚀 Deployment

This project uses **two separate Vercel deployments**:

- **Backend project** → Root Directory: `backend`
- **Frontend project** → Root Directory: `Front-End`

### Frontend Vercel rewrite

For React Router to work on refresh and direct links, add this to `Front-End/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📌 Notes

- The frontend uses a shared Axios instance configured with `VITE_API_URL`.
- The backend must allow the frontend origin in CORS.
- Anonymous message sending is public, while dashboard and inbox are protected.
- Image uploads are supported through Multer.

---

## 🔮 Future Improvements

- Better error handling and toasts
- Loading states and skeleton UI
- Profile customization
- Cloudinary integration for images
- Pagination for inbox messages
- Real-time notifications
- Better environment variable handling

---

## 👨‍💻 Author

**Ali Ghareeb**

---

## ⭐ Support

If you like the project, consider giving it a star on GitHub.
