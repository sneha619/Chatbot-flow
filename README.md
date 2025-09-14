# 🤖 Chatbot Flow Builder

A **React + TypeScript + Vite** project that implements a **drag-and-drop chatbot flow builder**.  
The system is designed to be **modular and extensible**, allowing new node types and features to be added easily in the future.

Deployed link - https://chatbot-flow-sand.vercel.app/

---

## ✅ Implemented Features

### 1. Text Node
- Implemented **Text Message Node** as the first node type.
- Multiple Text Nodes can be created and used within the same flow.
- Nodes can be **dragged from the Nodes Panel** and dropped into the flow builder canvas.

---

### 2. Nodes Panel
- Built a **Nodes Panel** that lists all supported node types.
- Currently supports only **Text Message Node**, but the panel is structured to easily support additional nodes in the future (e.g., Image, Options, Questions).

---

### 3. Edge
- Implemented **edges** to connect two nodes together.
- Visual representation of conversation flow between nodes.

---

### 4. Source Handle
- Each node contains a **Source Handle** for creating outgoing connections.
- A Source Handle is restricted to **only one outgoing edge**, ensuring clarity in the flow.

---

### 5. Target Handle
- Each node contains a **Target Handle** for receiving incoming connections.
- A Target Handle can support **multiple incoming edges**, enabling flexible flows.

---

### 6. Settings Panel
- Added a **Settings Panel** where node properties can be configured dynamically.
- Updates to the node in the settings panel are reflected immediately in the flow builder.

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

```
my-app/
├── public/ # Static assets (favicon, logos, redirects, etc.)
├── src/ # Source code
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
├── dist/ # Production build output (after npm run build)
├── package.json # Project dependencies & scripts
├── vite.config.ts # Vite configuration
├── tailwind.config.js # Tailwind setup
├── tsconfig.json # TypeScript configuration
├── .gitignore
└── README.md

```

## 🛠️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/<your-username>/Chatbot-flow.git
cd my-app
```

Install dependencies:
```
npm install
```

Start development server:
```
npm run dev
```



TypeScript support for better DX
