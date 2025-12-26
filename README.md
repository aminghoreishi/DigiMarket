# DigiMarket

Modern, full-featured e-commerce app built with Next.js 14, Tailwind CSS, Node.js & MongoDB
Shop smart, manage strong, build fast!

 **DigiMarket** is a modern e-commerce web application built with **Next.js (App Router)**, **Tailwind CSS**, **Node.js**, and **MongoDB**. It provides a full shopping experience — including product browsing, carts, and admin management — with secure authentication powered by **NextAuth.js**.



✨ Key Features (click to expand)






🌟 App directory & Client/Server components



🎨 Responsive UI powered by Tailwind CSS



🔐 Secure authentication (NextAuth, Google, JWT)



🛒 Cart, checkout, full shopping experience



🗂️ Dynamic catalog & product management



👑 Admin dashboard & role-based permissions



💾 Scalable data: MongoDB + Mongoose



✉️ API routes for seamless commerce (cart/products/orders)



⭐ User rating & feedback system



📊 Reward program for loyal users

 - 🌟 **Next.js 14 + App Router** architecture - 🎨 **Tailwind CSS** design system for responsive UI - 🔐 User authentication (NextAuth + JWT + custom roles) - 🛒 Full cart and checkout flow - 📦 Dynamic product listing and details - 👑 Admin dashboard with role-based access - 💾 MongoDB + Mongoose data models - ⚙️ API routes for cart, product, and order management - 📊 Built-in rating system for user feedback



🗂️ Project Structure

Click to see full structure 

DigiMarket/
│
├── app/                    # Next.js App Router (routes & layouts)
│   ├── (client)/
│   ├── (server)/
│   ├── api/                # RESTful API endpoints
│   └── layout.tsx          # App root layout
│
├── components/             # UI & atomic React components
├── lib/                    # Auth, MongoDB config, utilities
├── models/                 # Mongoose schemas (Product, User, Order)
├── public/                 # Static files (images, icons, etc.)
├── types/                  # Custom TypeScript types & interfaces
└── package.json


 ```bash DigiMarket/ │ ├── app/ # Next.js App Router pages & layouts │ ├── (client)/ │ ├── (server)/ │ ├── api/ # RESTful API routes │ └── layout.tsx # Root layout │ ├── components/ # Reusable UI components │ ├── lib/ # DB config, NextAuth settings, utils │ ├── models/ # MongoDB models (Product, User, Order) │ ├── public/ # Static assets │ ├── types/ # TypeScript types │ └── package.json ```



⚙️ Tech Stack At a Glance



LayerTech stackFrontendNext.js 14 (App Router)StylingTailwind CSSBackendNode.js / Next.js APIAuthNextAuth.jsDatabaseMongoDB + MongooseType SafetyTypeScriptTypeTechnology-------------------FrontendNext.js 14 (App Router)StylingTailwind CSSBackendNode.js / Next.js API RoutesAuthNextAuth.jsDatabaseMongoDB + MongooseType CheckingTypeScript



💎 Reward Score Formula



Loyalty matters!
Every time a user purchases, a reward score is updated in their account:

[
\text{Score} = \text{OrderAmount} \times \text{RewardRate} ]

Earn more by shopping more. The system updates your score automatically after every successful order! ✨
DigiMarket assigns a reward point for every user purchase using the formula:

[
\text{Score} = \text{OrderAmount} \times \text{RewardRate} ]

This value updates automatically in the user’s account after each order completion 🔁



⚡ Getting Started

Ready in four quick steps:

1️⃣ Clone the repo

git clone https://github.com/aminghoreishi/DigiMarket.git
cd DigiMarket


2️⃣ Install dependencies

npm install


3️⃣ Create a .env.local at project root:

NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


4️⃣ Launch the server

npm run dev


App will be running at http://localhost:3000

npm install


3️⃣ Add environment variables

Create a .env.local file at the root with:

NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


4️⃣ Run the development server

npm run dev


Open http://localhost:3000.



🧰 NPM Scripts

CommandDescriptionnpm run devStart dev server (hot reload)npm run buildBuild for productionnpm startRun production servernpm run lintESLint code linting



👑 Admin Access

Admins are defined by a role in the MongoDB User model:

role: "USER" | "ADMIN"


Only users with the ADMIN role gain access to /admin routes & dashboards.
Only users with the ADMIN role can access /admin routes and dashboards.



📸 Screenshots / Demo

_Add some screenshots or a short GIF demo here for maximum wow effect!_

 _Add screenshots or a demo link here for visual clarity._



🤝 Contributing

Pull requests are welcome. Please open an issue first to discuss any major changes or ideas!

Let’s build this marketplace together!

📜 License

MIT License. Free for personal & commercial projects.





Developed with ❤️ by @aminghoreishi
Built proudly with Next.js & TypeScript

