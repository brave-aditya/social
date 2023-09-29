import { useContext, useState } from 'react'
import Login from './pages/login/login.jsx'
import Register from './pages/register/register.jsx'
import Home from './pages/home/home.jsx'
import Profile from './pages/profile/profile.jsx'
import { BrowserRouter as Router, Route, Link, Routes, Outlet, Navigate } from "react-router-dom";
import Leftbar from './components/leftbar/leftbar.jsx'
import Navbar from './components/navbar/navbar.jsx';
import Rightbar from './components/rightbar/rightbar.jsx';
import './style.scss';
import { DarkModeContext } from './context/darkModeContext.jsx'
import { AuthContext } from './context/authContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {

  const {currentUser} = useContext(AuthContext);

  const {darkMode} = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout =()=>{
    return(
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{display:"flex"}}>
          <Leftbar />
          <div style={{flex:6}}>
            <Outlet />
          </div>
          
          <Rightbar />
        </div>
      </div>
      </QueryClientProvider>
    )
  }
const ProtectedRoute = ({children}) =>{
  if(!currentUser){
    return <Navigate to="/login"/>
  }
  return children
}

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
  )
}

export default App
