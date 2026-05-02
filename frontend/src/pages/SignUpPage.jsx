import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Lock, Mail, User, Zap, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName:"", email:"", password:"" });
  const { signup, isSigningUp } = useAuthStore();

  const validate = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate() === true) signup(formData); };

  return (
    <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', paddingTop:64 }}>
      {/* Left — Form */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 60px' }}>
        <div style={{ width:'100%', maxWidth:400 }} className="fade-up">
          <div style={{ marginBottom:32, textAlign:'center' }}>
            <div style={{ width:56, height:56, borderRadius:16, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:'0 8px 28px rgba(99,102,241,0.4)' }}>
              <Zap size={24} color="white" fill="white"/>
            </div>
            <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:26, color:'white', marginBottom:6 }}>Create account</h1>
            <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Join ChatSphere — it's free</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { label:'Full Name', key:'fullName', type:'text', icon:<User size={16}/>, placeholder:'John Doe' },
              { label:'Email address', key:'email', type:'email', icon:<Mail size={16}/>, placeholder:'you@example.com' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display:'block', color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:500, marginBottom:6 }}>{f.label}</label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'rgba(255,255,255,0.3)', display:'flex' }}>{f.icon}</span>
                  <input type={f.type} className="auth-field" placeholder={f.placeholder}
                    value={formData[f.key]} onChange={e => setFormData({...formData, [f.key]:e.target.value})}/>
                </div>
              </div>
            ))}
            <div>
              <label style={{ display:'block', color:'rgba(255,255,255,0.6)', fontSize:13, fontWeight:500, marginBottom:6 }}>Password</label>
              <div style={{ position:'relative' }}>
                <Lock style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', width:16, height:16, color:'rgba(255,255,255,0.3)' }}/>
                <input type={showPassword?"text":"password"} className="auth-field" placeholder="Min. 6 characters"
                  value={formData.password} onChange={e => setFormData({...formData, password:e.target.value})}/>
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.35)', display:'flex' }}>
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isSigningUp} style={{ marginTop:6 }}>
              {isSigningUp ? <><span className="spin" style={{ width:16,height:16,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'white',borderRadius:'50%',display:'inline-block' }}/> Creating...</> : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:22, color:'rgba(255,255,255,0.4)', fontSize:14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'#818cf8', fontWeight:600, textDecoration:'none' }}>Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right — Visual */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:40, borderLeft:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth:380, textAlign:'center' }} className="fade-up delay-1">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:36 }}>
            {[...Array(9)].map((_,i) => (
              <div key={i} style={{ aspectRatio:'1', borderRadius:14, background:'rgba(99,102,241,0.06)', border:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {i===4 && <MessageCircle size={24} color="#818cf8"/>}
              </div>
            ))}
          </div>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:22, color:'white', marginBottom:10 }}>Join our community</h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13, lineHeight:1.7 }}>
            Connect with friends, share moments, and stay in touch. Powered by a scalable microservices architecture on AWS.
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
