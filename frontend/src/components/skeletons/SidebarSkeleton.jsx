const SidebarSkeleton = () => (
  <div style={{ width:290, minWidth:290, height:'100%', borderRight:'1px solid rgba(255,255,255,0.07)', padding:'20px 16px' }}>
    <div style={{ display:'flex', gap:10, marginBottom:20 }}>
      <div className="skeleton" style={{ width:32, height:32, borderRadius:8 }}/>
      <div className="skeleton" style={{ flex:1, height:32, borderRadius:8 }}/>
    </div>
    {[...Array(7)].map((_,i) => (
      <div key={i} style={{ display:'flex', gap:12, alignItems:'center', padding:'10px 0', marginBottom:4 }}>
        <div className="skeleton" style={{ width:44, height:44, borderRadius:'50%', flexShrink:0 }}/>
        <div style={{ flex:1 }}>
          <div className="skeleton" style={{ height:13, borderRadius:6, marginBottom:6, width:'70%' }}/>
          <div className="skeleton" style={{ height:11, borderRadius:6, width:'40%' }}/>
        </div>
      </div>
    ))}
  </div>
);
export default SidebarSkeleton;
