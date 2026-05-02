import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText(""); setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ padding:'14px 20px', borderTop:'1px solid rgba(255,255,255,0.07)', background:'rgba(255,255,255,0.02)', flexShrink:0 }}>
      {imagePreview && (
        <div style={{ marginBottom:10 }}>
          <div style={{ position:'relative', display:'inline-block' }}>
            <img src={imagePreview} alt="Preview" style={{ width:80, height:80, objectFit:'cover', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)' }} />
            <button onClick={removeImage} style={{ position:'absolute', top:-6, right:-6, width:20, height:20, borderRadius:'50%', background:'rgba(239,68,68,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'white' }}>
              <X size={11}/>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSend} style={{ display:'flex', gap:8, alignItems:'center' }}>
        <button type="button" className="icon-btn" onClick={() => fileInputRef.current?.click()} title="Attach image">
          <Image size={16} color={imagePreview ? '#818cf8' : undefined}/>
        </button>
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} style={{ display:'none' }}/>
        <input
          type="text"
          className="chat-field"
          placeholder="Type a message..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
        />
        <button type="submit" className="send-btn" disabled={!text.trim() && !imagePreview} title="Send">
          <Send size={17}/>
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
