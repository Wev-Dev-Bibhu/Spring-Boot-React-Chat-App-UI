import './App.css';
import SignIn from './Components/SignIn';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import ChatScreen from './Components/ChatScreen';
import SignUp from './Components/SignUp';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';
import Profile from './Components/Profile';


function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const shouldShowSidebar = () =>
    location.pathname !== '/' && location.pathname !== '/signup';



  useEffect(() => {
    const cookie = new Cookies();

    if (!cookie.get('token') && location.pathname !== '/' && location.pathname !== '/signup') {
      navigate("/");
    }

    if (cookie.get('token') && (location.pathname === '/' || location.pathname === '/signup')) {
      enqueueSnackbar("User already logged in", { variant: "info" });
      navigate("/dashboard")
    }
  }, [location.pathname, enqueueSnackbar, navigate]);

  return (
    <>
      {shouldShowSidebar() && <Sidebar />}

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Header />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<ChatScreen />} />
      </Routes>
    </>
  );
}

export default App;
