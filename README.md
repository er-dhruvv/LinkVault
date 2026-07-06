# 🔗 LinkVault

LinkVault is a sleek, modern, and highly responsive bookmark manager built with React and Firebase. It provides users with a central, secure workspace to save, categorize, search, and access their favorite links from anywhere in real-time.

---

## ✨ Features

- **🔐 Secure User Authentication**
  - Sign up and log in securely using Firebase Authentication (Email/Password).
  - Robust client-side validation and clear error messaging (e.g., weak password, email already in use, invalid credentials).

- **⚡ Real-time Synchronization**
  - Instant updates across devices with Cloud Firestore's live listeners (`onSnapshot`).
  - Seamlessly save and delete links without manual page refreshes.

- **📂 Smart Categorization**
  - Categorize saved bookmarks (e.g., *Work*, *Education*, *Entertainment*, *Resources*, *Personal*, *Other*) to keep your workspace structured.

- **🔍 Instant Search & Filtering**
  - Search links by title or URL in real-time with case-insensitive filtering.
  - Filter bookmarks instantly by category using a clean dropdown interface.

- **🛡️ Protected Dashboard Route**
  - Route guards prevent unauthenticated users from accessing personal links.
  - Custom "Access Denied" page with quick redirection.

- **🎨 Premium Dark UI & Micro-interactions**
  - Stunning modern dark-theme user interface designed with Tailwind CSS v4.
  - Glassmorphic navigation bar, gradient buttons, interactive hover states, and smooth responsive design suited for all screen sizes.

---

## 🛠️ Tech Stack

- **Frontend Core:** [React 19](https://react.dev/) & [Vite](https://vite.dev/) (lightning-fast builds and hot module replacement)
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (utilizing the new `@tailwindcss/vite` plugin)
- **Backend & Database:** [Firebase v12](https://firebase.google.com/) (Authentication & Cloud Firestore)

---

## 📁 Project Structure

```text
LinkVault/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and design resources
│   ├── components/         # Shared layouts
│   │   └── Navbar.jsx      # Glassmorphic, responsive navigation bar
│   ├── context/
│   │   └── firebase.jsx    # Firebase initialization & context provider (Auth + DB)
│   ├── pages/              # Main view screens
│   │   ├── Home.jsx        # Links dashboard (add, view, delete, search, filter)
│   │   ├── login.jsx       # Login form & authentication error handling
│   │   └── signup.jsx      # Sign up form & registration logic
│   ├── App.jsx             # Main application entry point & route definitions
│   ├── index.css           # Global stylesheets & Tailwind imports
│   └── main.jsx            # React DOM mounting & context wrapping
├── eslint.config.js        # ESLint configuration
├── vite.config.js          # Vite bundler configuration
└── package.json            # Project dependencies and script scripts
```

---

## 🚀 Getting Started

Follow these steps to run LinkVault locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 1. Clone the Repository
```bash
git clone https://github.com/er-dhruvv/LinkVault.git
cd LinkVault
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase
The application is pre-configured with a default Firebase environment in [firebase.jsx](file:///f:/Coding/LinkVault/src/context/firebase.jsx). 

If you wish to use your own Firebase project, replace the `firebaseConfig` object in `src/context/firebase.jsx` with your credentials:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
  databaseURL: "YOUR_DATABASE_URL"
};
```

### 4. Firestore Security Rules
For security, configure your Firestore database to isolate user data. Go to **Firebase Console** -> **Firestore Database** -> **Rules** and apply:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/links/{linkId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Run Locally
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🛠️ Production Build

To create an optimized production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open a Pull Request or report bugs via the Issues page.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

Created with ❤️ by Sankaliya Dhruv
