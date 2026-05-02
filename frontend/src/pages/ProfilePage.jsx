import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, CheckCircle } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => { setSelectedImg(reader.result); await updateProfile({ profilePic: reader.result }); };
  };

  return (
    <div style={{ minHeight:'100vh', paddingTop:80, background:'transparent' }}>
      <div style={{ maxWidth:560, margin:'0 auto', padding:'24px 20px' }}>
        <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:20, backdropFilter:'blur(32px)', overflow:'hidden' }}>
          {/* Header band */}
          <div style={{ height:100, background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.2))', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, background:'repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.02) 10px,rgba(255,255,255,0.02) 20px)' }}/>
          </div>

          <div style={{ padding:'0 32px 32px' }}>
            {/* Avatar */}
            <div style={{ display:'flex', justifyContent:'center', marginTop:-52, marginBottom:20 }}>
              <div style={{ position:'relative' }}>
                <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="Profile"
                  style={{ width:96, height:96, borderRadius:'50%', objectFit:'cover', border:'4px solid rgba(8,8,16,1)', boxShadow:'0 8px 24px rgba(0,0,0,0.4)' }}/>
                <label htmlFor="avatar-upload" style={{ position:'absolute', bottom:2, right:2, width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 8px rgba(99,102,241,0.5)', border:'2px solid #080810' }}>
                  <Camera size={13} color="white"/>
                  <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile} style={{ display:'none' }}/>
                </label>
              </div>
            </div>

            <div style={{ textAlign:'center', marginBottom:28 }}>
              <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:22, color:'white', marginBottom:4 }}>{authUser?.fullName}</h1>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>{isUpdatingProfile ? 'Uploading photo...' : 'Click camera to update photo'}</p>
            </div>

            {/* Info cards */}
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
              {[
                { icon:<User size={15}/>, label:'Full Name', value:authUser?.fullName },
                { icon:<Mail size={15}/>, label:'Email Address', value:authUser?.email },
              ].map(f => (
                <div key={f.label} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12 }}>
                  <div style={{ color:'#818cf8' }}>{f.icon}</div>
                  <div>
                    <div style={{ color:'rgba(255,255,255,0.4)', fontSize:11, fontWeight:500, marginBottom:2 }}>{f.label}</div>
                    <div style={{ color:'white', fontSize:14, fontWeight:500 }}>{f.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Account info */}
            <div style={{ padding:'16px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:12 }}>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'white', fontSize:13, marginBottom:12 }}>Account Details</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ color:'rgba(255,255,255,0.45)', fontSize:13, display:'flex', alignItems:'center', gap:6 }}><Calendar size={13}/> Member since</span>
                  <span style={{ color:'rgba(255,255,255,0.8)', fontSize:13 }}>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ color:'rgba(255,255,255,0.45)', fontSize:13, display:'flex', alignItems:'center', gap:6 }}><CheckCircle size={13}/> Status</span>
                  <span style={{ color:'#34d399', fontSize:13, fontWeight:600 }}>● Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
