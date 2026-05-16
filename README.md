# 🌀 Zentra

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat-square&logo=razorpay&logoColor=white)](https://razorpay.com)
[![Live Demo](https://img.shields.io/badge/Live-zentra--commerce.vercel.app-0f3460?style=flat-square&logo=vercel&logoColor=white)](https://zentra-commerce.vercel.app)

Zentra is a full-stack e-commerce web application that allows users to browse products, place orders using online payment or cash on delivery (COD), and manage their profiles.

The application supports two types of users: **Customers** and **Admins**. Admins can manage products, view orders, and oversee users, while customers can shop, track orders, and manage their accounts.

It consists of two main parts:

- `frontend/` – built with React.js and Tailwind CSS
- `backend/` – built with Node.js, Express, MongoDB, and Redis

---

## 🚀 Features

### 👤 User Features

- 🛍️ Browse and search for products
- 🛒 Add items to cart and manage quantity
- 💳 Place orders with online payment (Razorpay) or cash on delivery (COD)
- 📦 View order history and track order status
- ✏️ Edit profile details

### 🛠️ Admin Features

- 📦 Manage products (add, edit, delete)
- 📊 View all orders and their status
- 🧑‍💼 Manage users and their roles
- 📈 View sales analytics dashboard

### 🔐 Authentication & Security

- Secure login/signup with JWT-based access and refresh tokens
- OTP email verification on registration
- Role-based access control (User & Admin)
- Redis-based caching for improved backend performance

---

## 📦 Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios
- Redux Toolkit

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis — response caching & session optimization
- JSON Web Tokens (JWT) — access & refresh token flow
- Razorpay — payment gateway integration
- Nodemailer — OTP email verification

---

## 🔌 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user + OTP email |
| POST | `/api/auth/login` | Login & receive access/refresh tokens |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/cart` | Add item to cart |
| POST | `/api/orders` | Place an order |
| POST | `/api/payment/verify` | Verify Razorpay payment |
| GET | `/api/admin/orders` | Admin — view all orders |
| PUT | `/api/admin/products/:id` | Admin — update product |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/aman-prasad1/zentra.git
cd zentra
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in your environment variables
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory. Refer to `.env.example`:

```env
PORT=

# Database
MONGO_URI=

# CORS
CORS_ORIGIN=

# JWT
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

# Email (Resend)
RESEND_API_KEY=

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Upstash Redis
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=
```
---

## 📬 Contact

If you have any questions, suggestions, or feedback, feel free to reach out:

- 📧 Email: [amanprasad048@gmail.com](mailto:amanprasad048@gmail.com)
- 🐙 GitHub: [@aman-prasad1](https://github.com/aman-prasad1)
- 💼 LinkedIn: [Aman Prasad](https://www.linkedin.com/in/amanprasad1/)
- 🌐 Portfolio: [aman-prasad.vercel.app](https://aman-prasad.vercel.app)

---

> ⭐ If you found this project useful, consider giving it a star!
