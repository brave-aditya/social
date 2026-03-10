import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Clean up legacy localStorage keys written by the old Context API approach.
// The Zustand persist store now uses 'auth-storage' instead.
localStorage.removeItem("user");
localStorage.removeItem("token");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
