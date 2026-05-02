import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => { checkAuth(); }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#080810' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ width:48, height:48, border:'3px solid rgba(99,102,241,0.2)', borderTopColor:'#6366f1', borderRadius:'50%', margin:'0 auto 16px', animation:'spin 0.8s linear infinite' }} />
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Loading ChatSphere...</p>
        </div>
      </div>
    );

  return (
    <div style={{ minHeight:'100vh', background:'#080810' }}>
      <div className="app-bg" />
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background:'rgba(20,20,35,0.95)', color:'white', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(20px)', borderRadius:12, fontSize:14 },
        }}
      />
    </div>
  );
};
export default App;
