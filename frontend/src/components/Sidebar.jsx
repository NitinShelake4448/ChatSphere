import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users, Radio } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { getUsers(); }, [getUsers]);

  const filtered = users
    .filter(u => showOnlineOnly ? onlineUsers.includes(u._id) : true)
    .filter(u => u.fullName.toLowerCase().includes(search.toLowerCase()));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside style={{ width:290, minWidth:290, height:'100%', display:'flex', flexDirection:'column', borderRight:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.015)' }}>
      {/* Header */}
      <div style={{ padding:'20px 16px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:'rgba(99,102,241,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Users size={15} color="#818cf8" />
          </div>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'white', fontSize:15 }}>Contacts</span>
          <span style={{ marginLeft:'auto', background:'rgba(16,185,129,0.12)', color:'#34d399', fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:99, display:'flex', alignItems:'center', gap:4 }}>
            <Radio size={9}/> {Math.max(0, onlineUsers.length - 1)} online
          </span>
        </div>

        {/* Search */}
        <div style={{ position:'relative', marginBottom:10 }}>
          <Search style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', width:13, height:13, color:'rgba(255,255,255,0.3)' }} />
          <input type="text" placeholder="Search..." value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width:'100%', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'8px 12px 8px 32px', color:'white', fontSize:13, outline:'none', boxSizing:'border-box' }}
          />
        </div>

        {/* Toggle */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div className={`toggle-track ${showOnlineOnly ? 'on' : ''}`} onClick={() => setShowOnlineOnly(!showOnlineOnly)}>
            <div className="toggle-thumb" />
          </div>
          <span style={{ color:'rgba(255,255,255,0.45)', fontSize:12 }}>Online only</span>
        </div>
      </div>

      {/* Users */}
      <div style={{ flex:1, overflowY:'auto', padding:'8px 8px' }}>
        {filtered.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isActive = selectedUser?._id === user._id;
          return (
            <button key={user._id} onClick={() => setSelectedUser(user)}
              className={`user-item ${isActive ? 'active' : ''}`}
              style={{ marginBottom:2 }}>
              <div style={{ position:'relative', flexShrink:0 }}>
                <img src={user.profilePic || "/avatar.png"} alt={user.fullName}
                  style={{ width:44, height:44, borderRadius:'50%', objectFit:'cover', border: isActive ? '2px solid rgba(99,102,241,0.6)' : '2px solid rgba(255,255,255,0.07)' }}
                />
                {isOnline && <span className="online-dot" style={{ position:'absolute', bottom:1, right:1 }} />}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ color:'white', fontWeight:600, fontSize:14, fontFamily:'Syne,sans-serif', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user.fullName}</div>
                <div style={{ color: isOnline ? '#34d399' : 'rgba(255,255,255,0.3)', fontSize:12, marginTop:2 }}>{isOnline ? '● Online' : 'Offline'}</div>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', color:'rgba(255,255,255,0.25)', padding:'48px 20px', fontSize:13 }}>
            No users found
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
