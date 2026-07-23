<h1 align="center">
  🧰 ToolNest Server API 🚀
</h1>

<p align="center">
  <strong>The powerful backend engine powering the ToolNest AI Tools Directory.</strong>
</p>

<p align="center">
  <a href="https://github.com/Atahar-Shihab/ToolNest_Server">GitHub Repo</a> •
  <a href="#">Live API (Render)</a> •
  <a href="#">Client (Vercel)</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
</p>

## ✨ Features

- **Robust Authentication**: Secure JWT-based authentication and Google OAuth integration.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for Users and Admins.
- **RESTful Architecture**: Clean and scalable API design for tools, reviews, and bookmarks.
- **Payment Processing**: Integrated Stripe payments for premium features/tools.
- **Data Validation & Error Handling**: Comprehensive request validation and centralized error management.
- **Type Safety**: Built entirely with TypeScript for maintainability and reliability.
- **Analytics Dashboard**: Admin endpoints for platform statistics and management.

---

## 📡 API Endpoints

### 🏥 System Health
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Check server status, uptime, and timestamp | Public |

### 🔐 Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login user | Public |
| `POST` | `/api/auth/google` | Google OAuth login/registration | Public |
| `GET` | `/api/auth/me` | Get current logged in user profile | User |

### 🛠️ Tools
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tools` | Get all published tools (with pagination & filters) | Public |
| `GET` | `/api/tools/featured` | Get featured tools | Public |
| `GET` | `/api/tools/:id` | Get tool details by ID | Public |
| `POST` | `/api/tools` | Submit a new tool | User |
| `PUT` | `/api/tools/:id` | Update tool details | Admin/Owner |
| `DELETE` | `/api/tools/:id` | Delete a tool | Admin/Owner |
| `PATCH` | `/api/tools/:id/status` | Approve/Reject a tool | Admin |
| `PATCH` | `/api/tools/:id/feature` | Toggle featured status | Admin |

### 💬 Reviews
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/reviews/:toolId` | Get reviews for a specific tool | Public |
| `POST` | `/api/reviews` | Add a review | User |
| `DELETE` | `/api/reviews/:id` | Delete a review | Admin/Owner |

### 🔖 Bookmarks
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/bookmarks` | Get user's bookmarked tools | User |
| `POST` | `/api/bookmarks/toggle` | Toggle bookmark status for a tool | User |
| `GET` | `/api/bookmarks/check/:toolId` | Check if tool is bookmarked | User |

### 💳 Payments
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/create-intent` | Create Stripe payment intent | User |
| `POST` | `/api/payments/confirm` | Confirm payment success | User |

### 🛡️ Admin
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/users` | Get all users | Admin |
| `PATCH` | `/api/admin/users/:id/role` | Change user role | Admin |
| `DELETE` | `/api/admin/users/:id` | Delete a user | Admin |
| `GET` | `/api/admin/analytics` | Get platform analytics | Admin |
| `GET` | `/api/admin/tools` | Get all tools (including pending) | Admin |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Application
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Atahar-Shihab/ToolNest_Server.git
   cd ToolNest_Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment:**
   - Copy `.env.example` to `.env` (or create a new `.env` file).
   - Fill in your specific configuration details (Database URI, JWT secret, etc.).

4. **Seed Database (Optional):**
   ```bash
   npm run seed
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

---

## 📂 Project Structure

```
server/
├── src/
│   ├── config/         # Database and third-party configuration
│   ├── controllers/    # Request handlers (logic)
│   ├── middlewares/    # Custom middlewares (auth, validation, errors)
│   ├── models/         # Mongoose schemas and models
│   ├── routes/         # Express API routes
│   ├── services/       # Business logic and external API integrations
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Helper functions and utilities
│   └── index.ts        # Application entry point
├── .env.example        # Example environment variables
├── package.json        # Project metadata and scripts
└── tsconfig.json       # TypeScript configuration
```

---

## 🗄️ Database Schema Overview

- **User Model:** `name`, `email`, `password`, `role` (user/admin), `profileImage`, `authProvider`.
- **Tool Model:** `name`, `description`, `category`, `websiteUrl`, `pricingType`, `developer`, `status` (pending/approved), `featured`.
- **Review Model:** `user`, `tool`, `rating`, `comment`.
- **Bookmark Model:** `user`, `tool`.
- **Payment Model:** `user`, `tool`, `amount`, `transactionId`, `status`.

---

## 🔑 Demo Credentials

To quickly test the application without registering, you can use the following demo accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **User** | `user@toolnest.com` | `User123!` |
| **Admin** | `admin@toolnest.com` | `Admin123!` |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<p align="center">
  <i>Developed with ❤️ for the AI community.</i>
</p>
