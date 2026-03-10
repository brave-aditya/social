import Login from './pages/login/login.jsx'
import Register from './pages/register/register.jsx'
import Home from './pages/home/home.jsx'
import Profile from './pages/profile/profile.jsx'
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Leftbar from './components/leftbar/leftbar.jsx'
import Navbar from './components/navbar/navbar.jsx';
import Rightbar from './components/rightbar/rightbar.jsx';
import './style.scss';
import useAuthStore from './stores/useAuthStore.js';
import useDarkModeStore from './stores/useDarkModeStore.js';

// Move Sub-components outside the main App component. 
// This prevents them from being re-declared on every render of App. 
// When they were inside, every render of App would create a NEW type for Layout. 
// React then unmounts and remounts the whole tree when a type changes.
const Layout = () => {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Leftbar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <Rightbar />
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
