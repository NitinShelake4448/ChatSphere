import { Zap, Shield, Globe, MessageCircle } from "lucide-react";

const features = [
  { icon: <Zap size={18} color="#818cf8"/>, label:"Real-Time Messaging", desc:"WebSocket powered instant delivery" },
  { icon: <Shield size={18} color="#34d399"/>, label:"Secure & Encrypted", desc:"End-to-end secure communication" },
  { icon: <Globe size={18} color="#38bdf8"/>, label:"Cloud Deployed", desc:"Hosted on AWS with CI/CD pipelines" },
];

const NoChatSelected = () => (
  <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:40, background:'rgba(255,255,255,0.01)' }}>
    <div style={{ textAlign:'center', maxWidth:420 }} className="fade-up">
      {/* Logo mark */}
      <div style={{ width:72, height:72, borderRadius:20, background:'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))', border:'1px solid rgba(99,102,241,0.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', boxShadow:'0 8px 32px rgba(99,102,241,0.2)' }}>
        <MessageCircle size={32} color="#818cf8"/>
      </div>

      <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:24, color:'white', marginBottom:8 }}>
        Welcome to <span className="gradient-text">ChatSphere</span>
      </h2>
      <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14, lineHeight:1.6, marginBottom:32 }}>
        A scalable real-time messaging platform powered by microservices and WebSockets. Select a contact to start chatting.
      </p>

      {/* Feature pills */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {features.map((f, i) => (
          <div key={i} className={`fade-up delay-${i+1}`} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, textAlign:'left' }}>
            <div style={{ width:36, height:36, borderRadius:9, background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{f.icon}</div>
            <div>
              <div style={{ color:'white', fontWeight:600, fontSize:13 }}>{f.label}</div>
              <div style={{ color:'rgba(255,255,255,0.35)', fontSize:12 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default NoChatSelected;
