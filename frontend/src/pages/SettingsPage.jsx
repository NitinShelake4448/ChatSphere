import { Palette, Send, Monitor } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id:1, content:"Hey! How's it going with ChatSphere?", isSent:false },
  { id:2, content:"It's amazing! Real-time messaging powered by WebSockets 🚀", isSent:true },
];

const SettingsPage = () => {
  return (
    <div style={{ minHeight:'100vh', paddingTop:80, background:'transparent' }}>
      <div style={{ maxWidth:700, margin:'0 auto', padding:'24px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom:28 }}>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:24, color:'white', marginBottom:6 }}>Settings</h1>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:14 }}>Customize your ChatSphere experience</p>
        </div>

        {/* App Info card */}
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:16, padding:24, marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <Monitor size={16} color="#818cf8"/>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'white', fontSize:15 }}>Application Info</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { label:'Project', value:'ChatSphere' },
              { label:'Architecture', value:'Microservices' },
              { label:'Real-time', value:'WebSockets' },
              { label:'Database', value:'MongoDB Atlas' },
              { label:'Cloud', value:'AWS' },
              { label:'CI/CD', value:'Jenkins + GitHub Actions' },
              { label:'Containers', value:'Docker + Kubernetes' },
              { label:'IaC', value:'Terraform + Ansible' },
            ].map(item => (
              <div key={item.label} style={{ padding:'12px 14px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10 }}>
                <div style={{ color:'rgba(255,255,255,0.4)', fontSize:11, marginBottom:4 }}>{item.label}</div>
                <div style={{ color:'white', fontSize:13, fontWeight:600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:16, padding:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <Palette size={16} color="#818cf8"/>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'white', fontSize:15 }}>Chat Preview</h2>
          </div>
          <div style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, overflow:'hidden' }}>
            {/* Mock header */}
            <div style={{ padding:'12px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700, fontSize:13 }}>J</div>
              <div>
                <div style={{ color:'white', fontWeight:600, fontSize:13 }}>John Doe</div>
                <div style={{ color:'#34d399', fontSize:11 }}>● Online</div>
              </div>
            </div>
            {/* Mock messages */}
            <div style={{ padding:16, display:'flex', flexDirection:'column', gap:12, minHeight:140 }}>
              {PREVIEW_MESSAGES.map(msg => (
                <div key={msg.id} style={{ display:'flex', justifyContent: msg.isSent ? 'flex-end' : 'flex-start' }}>
                  <div className={msg.isSent ? 'bubble-sent' : 'bubble-received'} style={{ fontSize:13, maxWidth:260 }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            {/* Mock input */}
            <div style={{ padding:'10px 16px', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', gap:8 }}>
              <div style={{ flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:10, padding:'8px 14px', color:'rgba(255,255,255,0.3)', fontSize:13 }}>Type a message...</div>
              <div className="send-btn" style={{ width:36, height:36 }}><Send size={14}/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
