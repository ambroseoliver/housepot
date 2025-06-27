<div align="center">
  <img src="public/logo.svg" width="100" alt="Housepot Logo" />
  <h1>🏠 Housepot</h1>
  <p><i>Your Future Home, Unlocked — Seamless House Hunting Platform Built with Django + Next.js</i></p>
  <a href="https://housepot.vercel.app" target="_blank"><img src="https://img.shields.io/badge/Live Demo-blue?style=for-the-badge" /></a>
  <br/>
</div>

---

## 🚀 Project Overview

**Housepot** is a next-generation, full-stack house rental platform designed to transform how people search, discover, and rent homes across Kenya. Whether you're a tenant searching for your dream home or a landlord listing properties, Housepot makes the process smooth, smart, and secure.

---

## 🧠 Tech Stack

### 🖥 Frontend (Next.js + Tailwind)
- **Next.js App Router**
- **TypeScript**
- **TailwindCSS + Framer Motion**
- `lucide-react` for icons
- Fully responsive & optimized UI

### 🛠 Backend (Django + REST Framework)
- Django 5.x
- Django REST Framework
- JWT Authentication (SimpleJWT)
- Custom User Roles (Tenant & Landlord)
- CORS support & secure API integration

---

## 📂 Folder Structure

```bash
housespot/
│
├── backend/               # Django backend (API, models, auth)
├── frontend/              # Next.js frontend (pages, components, styles)
├── docs/                  # Project documentation
├── .env                   # Environment variables
└── README.md              # You're here 🚀
```

---

## ✨ Features

- 🔐 **User Authentication (JWT)** with custom user roles
- 🏠 **Landlord Property Listing System**
- 🔍 **AI-enhanced Search & Smart Filters**
- 🎥 **High-quality listing visuals** (Booked by Housepot Team)
- 📱 **Fully Responsive Frontend UI**
- 🧭 **Explore by Location, Hero Search, App Teasers**
- 📬 **Newsletter Signups + CTA Integration**
- ⚡ **Framer Motion Animations**

---

## 📸 Screenshots

| Hero & Smart Search | Featured Listings | Dashboard |
|:-------------------:|:----------------:|:---------:|
| ![Hero](public/screens/hero.png) | ![Featured](public/screens/featured.png) | ![Dashboard](public/screens/dashboard.png) |

> 💡 Add real screenshots inside `public/screens/` and update the image links above.

---

## 🔧 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/your-username/housepot.git && cd housepot

# BACKEND SETUP
cd backend
python -m venv env
source env/Scripts/activate   # Use `source env/bin/activate` on Mac/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# FRONTEND SETUP
cd ../frontend
npm install
npm run dev
```

---

## 🧪 API Testing

Use Postman or Thunder Client for:

- `POST /api/users/register/`
- `POST /api/users/login/`
- `GET /api/listings/`

---

## 📦 Deployment

- **Frontend:** Vercel
- **Backend:** Render, Railway, or Heroku
- **Database:** PostgreSQL / SQLite3 (Local)

---

## 👤 Author

**Oliver Ambrose**  

💻 [GitHub](https://github.com/ambroseoliver) •  
✉️ ishivaoliver@gmail.com

---

## 📄 License

Licensed under the MIT License.

<div align="center">
  <strong>💡 Built with love by Oliver | Designed to revolutionize rentals in Kenya 🇰🇪</strong>
</div>
