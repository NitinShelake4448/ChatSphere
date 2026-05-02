import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (bottomRef.current && messages) bottomRef.current.scrollIntoView({ behavior:"smooth" });
  }, [messages]);

  if (isMessagesLoading) return (
    <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
      <ChatHeader/><MessageSkeleton/><MessageInput/>
    </div>
  );

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <ChatHeader/>

      {/* Messages area */}
      <div style={{ flex:1, overflowY:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:16 }}>
        {messages.map((msg) => {
          const isMine = msg.senderId === authUser._id;
          return (
            <div key={msg._id} style={{ display:'flex', flexDirection:'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
              <div style={{ display:'flex', alignItems:'flex-end', gap:8, flexDirection: isMine ? 'row-reverse' : 'row' }}>
                <img
                  src={isMine ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                  alt="avatar"
                  style={{ width:32, height:32, borderRadius:'50%', objectFit:'cover', flexShrink:0, border:'2px solid rgba(255,255,255,0.08)' }}
                />
                <div>
                  {msg.image && (
                    <img src={msg.image} alt="Attachment"
                      style={{ maxWidth:220, borderRadius:12, marginBottom: msg.text ? 6 : 0, display:'block', border:'1px solid rgba(255,255,255,0.1)' }} />
                  )}
                  {msg.text && (
                    <div className={isMine ? 'bubble-sent' : 'bubble-received'}>
                      <p style={{ fontSize:14, lineHeight:1.5 }}>{msg.text}</p>
                    </div>
                  )}
                  <div style={{ fontSize:11, color:'rgba(255,255,255,0.3)', marginTop:4, textAlign: isMine ? 'right' : 'left' }}>
                    {formatMessageTime(msg.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}/>
      </div>

      <MessageInput/>
    </div>
  );
};
export default ChatContainer;
