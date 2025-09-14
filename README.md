# Chatbot Flow

A **React + TypeScript** project for building and managing chatbot flows visually.  
This project uses **Tailwind CSS**, **Radix UI**, and **Lucide Icons** for styling and components.

Deployed link - https://chatbot-flow-sand.vercel.app/

---

## 🚀 Tech Stack
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) – fast build tool
- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) – accessible UI primitives
- [Lucide React](https://lucide.dev/) – icons
- ESLint + TypeScript ESLint – linting and code quality

---

## 📂 Project Structure

my-app/
│── public/ # Static assets (favicon, logos, redirects, etc.)
│── src/ # Source code
│ ├── assets/ # Images, fonts, other assets
│ ├── components/ # Reusable UI components
│ │ ├── nodes/ # Node components for chatbot flow
│ │ │ └── TextNode.tsx
│ │ └── ui/ # UI elements
│ │ ├── FlowBuilder.tsx
│ │ ├── NodesPanel.tsx
│ │ ├── SaveButton.tsx
│ │ └── SettingsPanel.tsx
│ ├── lib/ # Helper libraries
│ ├── utils/ # Utility functions (e.g. flowValidation.ts)
│ ├── App.tsx # Root component
│ ├── main.tsx # Entry point
│ ├── index.css # Global styles
│ └── App.css # Component-specific styles
│── dist/ # Production build output (after npm run build)
│── package.json # Project dependencies & scripts
│── vite.config.ts # Vite configuration
│── tailwind.config.js # Tailwind setup
│── tsconfig.json # TypeScript configuration
│── .gitignore
│── README.md


---

## 🛠️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/<your-username>/Chatbot-flow.git
cd my-app

Install dependencies:
npm install

Start development server:
npm run dev

✨ Features

Visual chatbot flow builder

Drag-and-drop node system

Tailwind + Radix UI styling

TypeScript support for better DX
