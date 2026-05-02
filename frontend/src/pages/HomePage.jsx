import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div style={{ height:'100vh', paddingTop:64, background:'transparent' }}>
      <div style={{ height:'100%', display:'flex', maxWidth:1400, margin:'0 auto', padding:'16px', boxSizing:'border-box' }}>
        <div style={{ flex:1, display:'flex', borderRadius:18, overflow:'hidden', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.025)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', boxShadow:'0 24px 80px rgba(0,0,0,0.5)' }}>
          <Sidebar/>
          {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
