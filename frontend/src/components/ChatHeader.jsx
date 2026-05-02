import { X, Phone, Video, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div style={{ padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:14, background:'rgba(255,255,255,0.02)', flexShrink:0 }}>
      <div style={{ position:'relative' }}>
        <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName}
          style={{ width:44, height:44, borderRadius:'50%', objectFit:'cover', border:'2px solid rgba(99,102,241,0.4)' }} />
        {isOnline && <span className="online-dot" style={{ position:'absolute', bottom:1, right:1 }} />}
      </div>

      <div style={{ flex:1 }}>
        <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'white', fontSize:15 }}>{selectedUser.fullName}</div>
        <div style={{ fontSize:12, color: isOnline ? '#34d399' : 'rgba(255,255,255,0.4)', marginTop:1 }}>
          {isOnline ? '● Active now' : 'Offline'}
        </div>
      </div>

      <div style={{ display:'flex', gap:6 }}>
        <button className="icon-btn" title="Voice call"><Phone size={16}/></button>
        <button className="icon-btn" title="Video call"><Video size={16}/></button>
        <button className="icon-btn" onClick={() => setSelectedUser(null)} title="Close"><X size={16}/></button>
      </div>
    </div>
  );
};
export default ChatHeader;
