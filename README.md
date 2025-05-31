# React Chat App

A simple chat application built with React.

## Live Demo

[https://spring-react-chatapp.netlify.app/](https://spring-react-chatapp.netlify.app/)

## Features

- Real-time messaging
- User-friendly interface
- Responsive design
- Switchable backend: Node.js or Spring Boot

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/react-dev-frontend.git
cd react-dev-frontend
npm install
```

### Running the App

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

### Switching Backend

By default, the app connects to a Node.js backend.  
To use a Spring Boot backend instead:

1. Sign in or sign up in the app.
2. Go to the **Settings** tab and choose your preferred backend (Node.js or Spring Boot).
3. If using Spring Boot:
    - Start your Spring Boot backend server.
    - Update the API endpoint URLs in the React app (e.g., in `src/config.js` or wherever your API base URL is set) to point to your Spring Boot server.
    - Restart the React app if needed.

## Folder Structure

```
react-dev-frontend/
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```
