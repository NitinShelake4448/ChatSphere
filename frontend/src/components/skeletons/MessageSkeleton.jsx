const MessageSkeleton = () => (
  <div style={{ flex:1, padding:20, display:'flex', flexDirection:'column', gap:16 }}>
    {[false,true,false,true,false].map((isMine,i) => (
      <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
        <div style={{ display:'flex', gap:10, flexDirection: isMine ? 'row-reverse' : 'row', alignItems:'flex-end' }}>
          <div className="skeleton" style={{ width:32, height:32, borderRadius:'50%', flexShrink:0 }}/>
          <div className="skeleton" style={{ width: isMine ? 180 : 220, height:44, borderRadius: isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px' }}/>
        </div>
      </div>
    ))}
  </div>
);
export default MessageSkeleton;
