import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, Zap, MessageCircle, Shield, Globe } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email:"", password:"" });
  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = async (e) => { e.preventDefault(); login(formData); };

  return (
    <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', paddingTop:64 }}>
      {/* Left — Form */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 60px' }}>
        <div style={{ width:'100%', maxWidth:400 }} className="fade-up">
          {/* Brand */}
          <div style={{ marginBottom:36, textAlign:'center' }}>
            <div style={{ width:56, height:56, borderRadius:16, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:'0 8px 28px rgba(99,102,241,0.4)' }}>
              <Zap size={24} color="white" fill="white"/>
            </div>
            <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:26, color:'white', marginBottom:6 }}>Welcome back</h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Sign in to your ChatSphere account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div>
              <label style={{ display:'block', color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:500, marginBottom:6 }}>Email address</label>
              <div style={{ position:'relative' }}>
                <Mail style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', width:16, height:16, color:'rgba(255,255,255,0.3)' }}/>
                <input type="email" className="auth-field" placeholder="you@example.com"
                  value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})}/>
              </div>
            </div>
            <div>
              <label style={{ display:'block', color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:500, marginBottom:6 }}>Password</label>
              <div style={{ position:'relative' }}>
                <Lock style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', width:16, height:16, color:'rgba(255,255,255,0.3)' }}/>
                <input type={showPassword?"text":"password"} className="auth-field" placeholder="••••••••"
                  value={formData.password} onChange={e => setFormData({...formData, password:e.target.value})}/>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', display:'flex' }}>
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoggingIn} style={{ marginTop:4 }}>
              {isLoggingIn ? <><span className="spin" style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', display:'inline-block' }}/> Signing in...</> : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:24, color:'rgba(255,255,255,0.4)', fontSize:14 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color:'#818cf8', fontWeight:600, textDecoration:'none' }}>Create account</Link>
          </p>
        </div>
      </div>

      {/* Right — Visual */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:40, borderLeft:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth:380, textAlign:'center' }} className="fade-up delay-1">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:40 }}>
            {[...Array(9)].map((_,i) => (
              <div key={i} style={{ aspectRatio:'1', borderRadius:14, background:`rgba(${[99,102,241,0.06+i*0.02].join(',')})`, border:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {i===4 && <MessageCircle size={24} color="#818cf8"/>}
              </div>
            ))}
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:22, color:'white', marginBottom:10 }}>ChatSphere</h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, lineHeight:1.7, marginBottom:28 }}>
            Real-Time Chat Application with Microservices. Built with WebSockets, deployed on AWS with CI/CD pipelines.
          </p>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            {['WebSockets','AWS','Microservices','MongoDB','CI/CD'].map(tag => (
              <span key={tag} style={{ background:'rgba(99,102,241,0.12)', border:'1px solid rgba(99,102,241,0.2)', color:'#a5b4fc', fontSize:11, fontWeight:600, padding:'4px 10px', borderRadius:99 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
