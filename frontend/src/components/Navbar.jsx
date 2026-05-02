import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, Zap } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header style={{ position:'fixed', width:'100%', top:0, zIndex:50, background:'rgba(8,8,16,0.8)', borderBottom:'1px solid rgba(255,255,255,0.07)', backdropFilter:'blur(28px)', WebkitBackdropFilter:'blur(28px)' }}>
      <div style={{ maxWidth:1400, margin:'0 auto', padding:'0 24px', height:64, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 14px rgba(99,102,241,0.45)' }}>
            <Zap size={18} color="white" fill="white"/>
          </div>
          <div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:16, color:'white', lineHeight:1.1 }}>ChatSphere</div>
            <div style={{ fontSize:9, color:'rgba(255,255,255,0.3)', letterSpacing:'0.08em' }}>REAL-TIME PLATFORM</div>
          </div>
        </Link>

        <nav style={{ display:'flex', alignItems:'center', gap:4 }}>
          <Link to="/settings" className="btn-ghost" style={{ textDecoration:'none', padding:'8px 14px', fontSize:13 }}>
            <Settings size={14}/> Settings
          </Link>
          {authUser && <>
            <Link to="/profile" className="btn-ghost" style={{ textDecoration:'none', padding:'8px 14px', fontSize:13 }}>
              <User size={14}/> Profile
            </Link>
            <button onClick={logout} className="btn-ghost" style={{ padding:'8px 14px', fontSize:13, color:'rgba(239,100,100,0.8)', borderColor:'rgba(239,68,68,0.2)' }}
              onMouseEnter={e=>{e.currentTarget.style.background='rgba(239,68,68,0.1)';e.currentTarget.style.color='#f87171';}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(239,100,100,0.8)';}}>
              <LogOut size={14}/> Logout
            </button>
          </>}
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
