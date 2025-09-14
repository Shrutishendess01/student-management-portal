🎓 Student Management Portal

A React + TypeScript + Vite application for secure student registration, login, and management.
Sensitive data is encrypted (SHA256) before being stored to ensure privacy.

🚀 Setup Instructions
1. Clone the repository

git clone https://github.com/
<your-username>/<your-repo-name>.git
cd FORM

2. Install dependencies

npm install

3. Start frontend & backend

npm run dev

Frontend → http://localhost:5173

Backend (json-server) → http://localhost:4000

🛠️ Tech Stack

React

TypeScript

Vite

React Router DOM

Axios

CryptoJS (SHA256)

json-server

CSS

🔐 Data Encryption

Sensitive fields such as email, password, and phone number are hashed using SHA256 before saving to db.json.

Example:

import CryptoJS from "crypto-js";

export const hashData = (data: string): string => {
return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

Registration → hashes inputs before saving.

Login → hashes inputs before comparing with stored values.

✨ Features

🔑 Login with email & password (with password toggle)

📝 Student registration form (all fields required, password toggle)

📋 Student list with full CRUD operations

🔗 Navigation header (Login, Register, Student List)

🎉 Welcome page after login (header hidden, student list visible)

📂 File Structure

.
├── components/ # React components (Login, Register, StudentList, etc.)
├── crypto.ts # SHA256 hashing utility
├── db.json # Database (json-server)
├── package.json # Project configuration
└── README.md # Documentation

📝 Notes

All sensitive data is hashed for security.

To reset data, clear db.json and restart the server.

