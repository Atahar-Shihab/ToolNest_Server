# ⚡ ToolNest Server — Express & MongoDB REST API

<div align="center">

### High-Performance Backend API for ToolNest Platform

[![Live API](https://img.shields.io/badge/⚡_Live_API-toolnest--server.onrender.com-46E3B7?style=for-the-badge&logo=render)](https://toolnest-server.onrender.com/api)
[![Frontend Web App](https://img.shields.io/badge/🌐_Live_Website-tool--nest--client.vercel.app-00D4FF?style=for-the-badge&logo=vercel)](https://tool-nest-client.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe_API-6772E5?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

---

### 👨‍💻 Connect with Developer (Atahar Shihab)

[![Email](https://img.shields.io/badge/-Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:shihabatahar@gmail.com)
[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Atahar-Shihab)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/atahar-shihab)
[![Facebook](https://img.shields.io/badge/-Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/atahar.shihab.740192/)

</div>

---

## 📡 API Endpoints Reference

### 🏥 System Health & Status
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Root API welcome message and status index | Public |
| `GET` | `/api/health` | Uptime check, server timestamp, and status | Public |

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new local account | Public |
| `POST` | `/api/auth/login` | Authenticate email/password & return JWT | Public |
| `POST` | `/api/auth/google` | Verify Google OAuth 2.0 credential | Public |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | User |

### 🛠️ AI Tools (`/api/tools`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tools` | Fetch approved tools (supports `search`, `category`, `pricing`, `sort`, `page`, `limit`) | Public |
| `GET` | `/api/tools/featured` | Fetch top featured tools for home page | Public |
| `GET` | `/api/tools/:id` | Fetch tool details by ObjectId | Public |
| `POST` | `/api/tools` | Submit a new AI tool (defaults to `pending`) | User |
| `PUT` | `/api/tools/:id` | Update tool parameters | Admin / Owner |
| `DELETE` | `/api/tools/:id` | Remove a tool from database | Admin / Owner |
| `PATCH` | `/api/tools/:id/status` | Approve or reject a submitted tool | Admin |
| `PATCH` | `/api/tools/:id/feature` | Toggle tool featured badge | Admin |

### 💬 Reviews (`/api/reviews`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/reviews/:toolId` | Fetch all reviews for a tool | Public |
| `POST` | `/api/reviews` | Submit a star rating & review comment | User |
| `DELETE` | `/api/reviews/:id` | Delete a review | Admin |

### 🔖 Bookmarks (`/api/bookmarks`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/bookmarks` | Fetch user's saved tools | User |
| `POST` | `/api/bookmarks/toggle` | Toggle bookmark status for a tool | User |
| `GET` | `/api/bookmarks/check/:toolId` | Check if tool is bookmarked | User |

### 💳 Payments (`/api/payments`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/create-intent` | Initialize Stripe $5.00 PaymentIntent clientSecret | User |
| `POST` | `/api/payments/confirm` | Confirm payment transaction & upgrade user to `isPro: true` | User |

### 📊 Admin Management (`/api/users`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Fetch all platform users | Admin |
| `PATCH` | `/api/users/:id/role` | Update user role (`user` ↔ `admin`) | Admin |
| `DELETE` | `/api/users/:id` | Remove user account | Admin |
| `GET` | `/api/users/analytics` | Aggregate platform category metrics & counts | Admin |

---

## 🗄️ Database Schemas

### 1. Tool Model (`src/models/Tool.ts`)
```typescript
{
  title: String,             // Required
  shortDescription: String,  // Required
  fullDescription: String,   // Required
  category: String,          // Writing, Coding, Design, Marketing, Productivity, Research, Video, Music
  pricing: String,           // Free Plan, Free Trial, Paid
  website: String,           // External URL
  thumbnail: String,         // Image URL
  tags: [String],
  features: [String],
  aiModel: String,           // e.g. "GPT-4o", "Claude 3.5 Sonnet"
  company: String,           // e.g. "OpenAI", "Anthropic"
  foundedYear: Number,       // e.g. 2022
  history: String,           // Historical background
  avgRating: Number,         // Default: 0
  totalReviews: Number,      // Default: 0
  bookmarkCount: Number,     // Default: 0
  isFeatured: Boolean,       // Default: false
  status: String,            // 'pending' | 'approved' | 'rejected'
  submittedBy: ObjectId,     // Ref: 'User'
  createdAt: Date
}
```

### 2. User Model (`src/models/User.ts`)
```typescript
{
  name: String,              // Required
  email: String,             // Required, Unique
  password: String,          // Optional (Bcrypt hash)
  photoURL: String,          // Avatar URL
  role: String,              // 'user' | 'admin' (Default: 'user')
  isPro: Boolean,            // Default: false
  authProvider: String,      // 'local' | 'google'
  createdAt: Date
}
```

---

## 🚀 Environment Variables Template (.env.example)

Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/toolnest
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
CLIENT_URL=https://tool-nest-client.vercel.app
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Standard User** | `user@toolnest.com` | `User123!` | Submit tools, write reviews, bookmark tools, upgrade to Pro |
| **Admin User** | `admin@toolnest.com` | `Admin123!` | Full access + approve/reject tools, manage users, delete reviews, analytics |

---

## 📬 Contact & Support

Developed with ❤️ by **Atahar Shihab**:
- 📧 Email: [![Email](https://img.shields.io/badge/-Email-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:shihabatahar@gmail.com)
- 🐙 GitHub: [![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/Atahar-Shihab)
- 💼 LinkedIn: [![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/atahar-shihab)
- 📘 Facebook: [![Facebook](https://img.shields.io/badge/-Facebook-1877F2?style=flat&logo=facebook&logoColor=white)](https://www.facebook.com/atahar.shihab.740192/)

License: [MIT](LICENSE)
