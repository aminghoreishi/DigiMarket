# 🛍️ DigiMarket

**Modern, full-featured e-commerce app built with Next.js 14, Tailwind CSS, Node.js & MongoDB**

*Shop smart, manage strong, build fast!*

---

## 📖 About

**DigiMarket** is a modern e-commerce web application built with **Next.js (App Router)**, **Tailwind CSS**, **Node.js**, and **MongoDB**. It provides a full shopping experience — including product browsing, carts, and admin management — with secure authentication powered by **NextAuth.js**.

---

## ✨ Key Features

<details>
<summary><strong>Click to see all features</strong></summary>

<br>

- 🌟 **Next.js 14 + App Router** architecture
- 🎨 **Tailwind CSS** design system for responsive UI
- 🔐 User authentication (NextAuth + JWT + custom roles)
- 🛒 Full cart and checkout flow
- 📦 Dynamic product listing and details
- 👑 Admin dashboard with role-based access
- 💾 MongoDB + Mongoose data models
- ⚙️ API routes for cart, product, and order management
- ⭐ Built-in rating system for user feedback
- 📊 Reward program for loyal users

</details>

---

## 🗂️ Project Structure

<details>
<summary><strong>Click to see full structure</strong></summary>

<br>

```bash
DigiMarket/
│
├── app/                    # Next.js App Router (routes & layouts)
│   ├── (client)/          # Client-side routes
│   ├── (server)/          # Server-side routes
│   ├── api/               # RESTful API endpoints
│   └── layout.tsx         # App root layout
│
├── components/            # UI & atomic React components
├── lib/                   # Auth, MongoDB config, utilities
├── models/                # Mongoose schemas (Product, User, Order)
├── public/                # Static files (images, icons, etc.)
├── types/                 # Custom TypeScript types & interfaces
└── package.json
```

</details>

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js / Next.js API Routes |
| **Auth** | NextAuth.js |
| **Database** | MongoDB + Mongoose |
| **Type Checking** | TypeScript |

---

## 💎 Reward Score Formula

**Loyalty matters!**

Every time a user purchases, a reward score is updated in their account:

$$
\text{Score} = \text{OrderAmount} \times \text{RewardRate}
$$

Earn more by shopping more. The system updates your score automatically after every successful order! ✨

---

## ⚡ Getting Started

Ready in four quick steps:

### 1️⃣ Clone the repo

```bash
git clone https://github.com/aminghoreishi/DigiMarket.git
cd DigiMarket
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env.local` at project root

```env
AUTH_SECRET=ldom9Kh9AU5eKwPyuwPJxaPLH5geSl0YF
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=959973183728-bjhnanr0ijrherlea7eas78hj9ogho1m.apps.googleusercontent.com
```

### 4️⃣ Launch the server

```bash
npm run dev
```

🎉 App will be running at **http://localhost:3000**

---

## 🧰 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Build for production |
| `npm start` | Run production server |
| `npm run lint` | ESLint code linting |

---

## 👑 Admin Access

Admins are defined by a role in the MongoDB User model:

```typescript
role: "USER" | "ADMIN"
```

**Only users with the `ADMIN` role can access `/admin` routes and dashboards.**

---

## 📸 Screenshots

<details>
<summary><strong>Click to view screenshots</strong></summary>

<br>

![Home Page](https://github.com/aminghoreishi/DigiMarket/blob/main/public/image/Screenshot_20251226_194437.png)

![Product Page](https://github.com/aminghoreishi/DigiMarket/blob/main/public/image/Screenshot_20251226_194843.png)

![Cart & Checkout](https://github.com/aminghoreishi/DigiMarket/blob/main/public/image/Screenshot_20251226_195031.png)

</details>

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss any major changes or ideas.

**Let's build this marketplace together!** 🚀

---

## 📜 License

**MIT License** - Free for personal & commercial projects.

---

<div align="center">

**Developed with ❤️ by [@aminghoreishi](https://github.com/aminghoreishi)**

*Built proudly with Next.js & TypeScript*

</div>

---

حالا README شما خیلی خوشگل‌تر و منظم‌تر شد! 😊 همه فاصله‌ها رعایت شده، جداول درست شدن، فرمول‌ها هم با LaTeX نوشته شدن، و یه ساختار تمیز و حرفه‌ای داره 🎨✨
