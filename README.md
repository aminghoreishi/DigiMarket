🛍️ DigiMarket

DigiMarket is a modern e-commerce web application built with Next.js (App Router), Tailwind CSS, Node.js, and MongoDB.
It provides a full shopping experience — including product browsing, carts, and admin management — with secure authentication powered by NextAuth.js.



🚀 Features





🌟 Next.js 14 + App Router architecture



🎨 Tailwind CSS design system for responsive UI



🔐 User authentication (NextAuth + JWT + custom roles)



🛒 Full cart and checkout flow



📦 Dynamic product listing and details



👑 Admin dashboard with role-based access



💾 MongoDB + Mongoose data models



⚙️ API routes for cart, product, and order management



📊 Built-in rating system for user feedback



📁 Project Structure

DigiMarket/
│
├── app/                    # Next.js App Router pages & layouts
│   ├── (client)/
│   ├── (server)/
│   ├── api/                # RESTful API routes
│   └── layout.tsx          # Root layout
│
├── components/             # Reusable UI components
│
├── lib/                    # DB config, NextAuth settings, utils
│
├── models/                 # MongoDB models (Product, User, Order)
│
├── public/                 # Static assets
│
├── types/                  # TypeScript types
│
└── package.json




⚙️ Tech Stack

TypeTechnologyFrontendNext.js 14 (App Router)StylingTailwind CSSBackendNode.js / Next.js API RoutesAuthNextAuth.jsDatabaseMongoDB + MongooseType CheckingTypeScript



🧮 Reward Score Formula

DigiMarket assigns a reward point for every user purchase using the formula:

[
\text{Score} = \text{OrderAmount} \times \text{RewardRate} ]

This value updates automatically in the user’s account after each order completion 🔁



🧑‍💻 Getting Started

1️⃣ Clone the repo

git clone https://github.com/aminghoreishi/DigiMarket.git
cd DigiMarket


2️⃣ Install dependencies

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



🧰 Scripts

CommandDescriptionnpm run devStarts the dev servernpm run buildBuilds the production bundlenpm startRuns the production servernpm run lintLints the codebase



👤 Admin Access

Admin users are determined by a role field in the MongoDB User model:

role: "USER" | "ADMIN"


Only users with the ADMIN role can access /admin routes and dashboards.



📷 Screenshots (optional)

Add screenshots or a demo link here for visual clarity.



🤝 Contributing

Pull requests are welcome!
Please open an issue first to discuss the change you’d like to make.



📜 License

This project is released under the MIT License.



Developed by @aminghoreishi
💻 Built with ❤️ using Next.js & TypeScript
