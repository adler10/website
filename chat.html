import React, { useState, useEffect, useRef, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged
  // REMOVED: signInWithCustomToken is not needed for your custom project
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  doc, 
  updateDoc, 
  serverTimestamp,
  deleteDoc 
} from 'firebase/firestore';
import { 
  MessageSquare, 
  Move, 
  Maximize2, 
  LogOut, 
  Plus,
  Trash2,
  Smile,
  X,
  Scaling
} from 'lucide-react';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyD0bYsfuu1EipFJ_i-2WAikHQ9ycP1jye0",
  authDomain: "game-8e351.firebaseapp.com",
  projectId: "game-8e351",
  storageBucket: "game-8e351.firebasestorage.app",
  messagingSenderId: "713515393193",
  appId: "1:713515393193:web:534d68c9f0d223f6e149b8",
  measurementId: "G-F21SP6RW0B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
// Using a static identifier for your personal database
const appId = 'canvas-connect-production'; 

// --- Main Component ---
export default function CanvasConnect() {
  // --- PWA & Meta Tag Injection ---
  useEffect(() => {
    const metas = [
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover' },
      { name: 'theme-color', content: '#0f172a' }
    ];
    
    metas.forEach(m => {
      let tag = document.querySelector(`meta[name="${m.name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = m.name;
        document.head.appendChild(tag);
      }
      tag.content = m.content;
    });
  }, []);

  // --- State ---
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(localStorage.getItem('cc_username') || '');
  const [roomCode, setRoomCode] = useState(localStorage.getItem('cc_last_room') || '');
  const [activeRoom, setActiveRoom] = useState(null);
  const [viewMode, setViewMode] = useState('chat');
  const [isLoading, setIsLoading] = useState(true);
  
  // Data
  const [messages, setMessages] = useState([]);
  const [canvasItems, setCanvasItems] = useState([]);

  // UI
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);

  // Canvas Interaction
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [interactionMode, setInteractionMode] = useState(null); // 'move' or 'resize'
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialItemState, setInitialItemState] = useState(null);
  
  const canvasContainerRef = useRef(null);
  const canvasContentRef = useRef(null);

  // --- Auth ---
  useEffect(() => {
    const initAuth = async () => {
      // FIXED: Removed __initial_auth_token check because it causes mismatch with your custom project keys.
      // We now strictly use Anonymous Auth for your specific Firebase project.
      try {
        await signInAnonymously(auth);
      } catch (err) {
        console.error("Anonymous auth failed:", err);
      }
    };
    initAuth();
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsLoading(false);
    });
  }, []);

  // --- Sync ---
  useEffect(() => {
    if (!user || !activeRoom) return;

    const msgRef = collection(db, 'artifacts', appId, 'public', 'data', `cc_msg_${activeRoom}`);
    const unsubMsg = onSnapshot(msgRef, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      msgs.sort((a, b) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0));
      setMessages(msgs);
    });

    const canvasRef = collection(db, 'artifacts', appId, 'public', 'data', `cc_canvas_${activeRoom}`);
    const unsubCanvas = onSnapshot(canvasRef, (snap) => {
      setCanvasItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubMsg(); unsubCanvas(); };
  }, [user, activeRoom]);

  // --- Actions ---
  const handleJoin = () => {
    if (!displayName.trim() || !roomCode.trim()) return;
    localStorage.setItem('cc_username', displayName);
    localStorage.setItem('cc_last_room', roomCode);
    setActiveRoom(roomCode);
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', `cc_msg_${activeRoom}`), {
        text: inputText,
        sender: displayName,
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      setInputText('');
    } catch (err) { console.error(err); }
  };

  // --- Canvas Logic ---
  const addCanvasItem = async (type, content) => {
    if (!activeRoom) return;
    
    // Place item near current scroll center
    const container = canvasContainerRef.current;
    const scrollTop = container ? container.scrollTop : 0;
    const viewportHeight = container ? container.clientHeight : 800;
    const y = scrollTop + (viewportHeight / 2) - 50;
    
    // Random X between 10% and 80%
    const x = 10 + Math.random() * 60;

    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', `cc_canvas_${activeRoom}`), {
        type,
        content,
        x, // percentage
        y, // pixels (absolute vertical position)
        scale: 1,
        sender: displayName,
        uid: user.uid,
        color: ['bg-rose-400', 'bg-indigo-400', 'bg-emerald-400', 'bg-amber-400', 'bg-sky-400'][Math.floor(Math.random()*5)]
      });
      setInputText('');
      setIsEmojiModalOpen(false);
    } catch (err) { console.error(err); }
  };

  const updateItem = async (id, data) => {
    try {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', `cc_canvas_${activeRoom}`, id), data);
    } catch (err) { console.error(err); }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', `cc_canvas_${activeRoom}`, id));
      setSelectedItemId(null);
    } catch (err) { console.error(err); }
  };

  // --- Touch/Pointer Interaction ---
  
  const handlePointerDown = (e, item, mode) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    
    setSelectedItemId(item.id);
    setInteractionMode(mode);
    setDragStart({ x: e.clientX, y: e.clientY });
    
    // Normalize Y: if item is from old version (percent), convert to approx px
    let safeY = item.y;
    if (item.y < 100 && item.y > 0 && !item.isPx) { 
       safeY = (item.y / 100) * 1000; // rough conversion for legacy data
    }

    setInitialItemState({ ...item, y: safeY });
  };

  const handlePointerMove = (e) => {
    if (!interactionMode || !initialItemState) return;
    
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    if (interactionMode === 'move') {
        const containerWidth = canvasContentRef.current?.clientWidth || window.innerWidth;
        
        // X is percentage based on container width
        const newX = Math.min(Math.max(initialItemState.x + (dx / containerWidth * 100), 0), 90);
        
        // Y is absolute pixels
        const newY = Math.max(initialItemState.y + dy, 0);

        // Optimistic Update
        setCanvasItems(prev => prev.map(it => 
            it.id === initialItemState.id ? { ...it, x: newX, y: newY } : it
        ));
    } else if (interactionMode === 'resize') {
        // Scale sensitivity
        const scaleDelta = dx * 0.005; 
        const newScale = Math.min(Math.max(initialItemState.scale + scaleDelta, 0.5), 5);
        
        setCanvasItems(prev => prev.map(it => 
            it.id === initialItemState.id ? { ...it, scale: newScale } : it
        ));
    }
  };

  const handlePointerUp = async (e) => {
    if (interactionMode && initialItemState) {
       const currentItem = canvasItems.find(i => i.id === initialItemState.id);
       if (currentItem) {
         await updateItem(currentItem.id, { 
           x: currentItem.x, 
           y: currentItem.y, 
           scale: currentItem.scale,
           isPx: true // Mark as using new pixel coordinate system
         });
       }
    }
    setInteractionMode(null);
    setInitialItemState(null);
  };

  // --- Render Helpers ---
  const COMMON_EMOJIS = [
    "😀","😂","😍","🥰","😎","😭","😱","😡","🥳","🤔",
    "👍","👎","👋","🙏","💪","💅","🤳","🧠","👀","💋",
    "❤️","💔","🔥","✨","💩","👻","💀","👽","🤖","🎃",
    "🐶","🐱","🦄","🦋","🐙","🐸","🍎","🍕","🍺","🚀",
    "💡","🎉","🎈","🎁","🏆","💰","💎","💣","🔪","💊",
    "💯","✅","❌","❓","❗️","🏳️‍🌈","🇺🇸","🌍","🪐","🌙"
  ];

  // --- Components ---

  if (isLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;

  if (!activeRoom) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-sm bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-500 p-4 rounded-2xl shadow-lg shadow-indigo-500/20">
              <Maximize2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">CanvasConnect</h1>
          <p className="text-slate-400 text-center mb-8 text-sm">Spatial Chat Messenger</p>
          
          <div className="space-y-4">
            <input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Your Name"
            />
            <input
              value={roomCode}
              onChange={e => setRoomCode(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Room Code (e.g. 'chill')"
            />
            <button
              onClick={handleJoin}
              disabled={!displayName || !roomCode}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
            >
              Enter Space
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden safe-area-inset-bottom">
      
      {/* Header */}
      <header className="flex-none bg-slate-900/80 backdrop-blur-md border-b border-slate-800 pt-safe-top px-4 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${viewMode === 'chat' ? 'bg-indigo-500' : 'bg-emerald-400'} animate-pulse`} />
            <span className="font-bold text-lg tracking-tight">{roomCode}</span>
        </div>
        
        <div className="flex bg-slate-800/50 p-1 rounded-full">
            <button 
                onClick={() => setViewMode('chat')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'chat' ? 'bg-white text-black shadow-sm' : 'text-slate-400'}`}
            >
                Chat
            </button>
            <button 
                onClick={() => setViewMode('canvas')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'canvas' ? 'bg-white text-black shadow-sm' : 'text-slate-400'}`}
            >
                Canvas
            </button>
        </div>

        <button onClick={() => setActiveRoom(null)} className="text-slate-500 hover:text-white">
            <LogOut size={20} />
        </button>
      </header>

      {/* --- CHAT MODE --- */}
      {viewMode === 'chat' && (
        <div className="flex-1 flex flex-col relative overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => {
                    const isMe = msg.uid === user.uid;
                    return (
                        <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <span className="text-[10px] text-slate-500 px-2 mb-0.5">{msg.sender}</span>
                            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${isMe ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                                {msg.text}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="p-3 bg-slate-900 border-t border-slate-800 safe-area-pb">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input 
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        className="flex-1 bg-slate-800 rounded-full px-4 py-3 text-sm focus:outline-none text-white"
                        placeholder="iMessage..."
                    />
                    <button type="submit" disabled={!inputText.trim()} className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-50">
                        <Plus size={20} />
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* --- CANVAS MODE (VERTICAL SCROLL) --- */}
      {viewMode === 'canvas' && (
        <div 
            ref={canvasContainerRef}
            className="flex-1 relative overflow-y-auto overflow-x-hidden bg-slate-950 touch-pan-y"
            style={{ WebkitOverflowScrolling: 'touch' }}
        >
            {/* Infinite Vertical Board */}
            <div 
                ref={canvasContentRef}
                className="w-full min-h-[200vh] relative" // Tall container for scrolling
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

                {/* Start Marker */}
                <div className="absolute top-4 left-0 right-0 text-center text-slate-700 text-xs font-mono">
                    -- TOP OF THREAD --
                </div>

                {canvasItems.map(item => {
                    // If legacy Y (percentage), convert roughly to pixels for display
                    const displayY = (item.y < 100 && !item.isPx) ? (item.y * 10) : item.y;
                    
                    return (
                        <div
                            key={item.id}
                            onPointerDown={(e) => handlePointerDown(e, item, 'move')}
                            style={{
                                left: `${item.x}%`,
                                top: `${displayY}px`,
                                transform: `scale(${item.scale || 1})`,
                                transformOrigin: 'top left',
                                touchAction: 'none', // Critical for custom drag
                            }}
                            className={`absolute cursor-move select-none group ${selectedItemId === item.id ? 'z-50' : 'z-10'}`}
                        >
                            {item.type === 'text' ? (
                                <div className={`px-4 py-3 rounded-2xl shadow-xl min-w-[120px] max-w-[250px] ${item.color || 'bg-slate-700'} text-slate-900`}>
                                    <p className="text-[10px] opacity-60 uppercase font-bold mb-1 tracking-wider">{item.sender}</p>
                                    <p className="text-sm font-medium leading-snug">{item.content}</p>
                                </div>
                            ) : (
                                <div className="text-6xl relative">
                                    {item.content}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[9px] px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                        {item.sender}
                                    </div>
                                </div>
                            )}

                            {/* Active State Controls (Only when selected) */}
                            {selectedItemId === item.id && (
                                <>
                                    {/* Selection Border */}
                                    <div className="absolute -inset-2 border-2 border-indigo-500 rounded-xl pointer-events-none opacity-50"></div>
                                    
                                    {/* Delete Button (Top Right) */}
                                    <button 
                                        onPointerDown={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                                        className="absolute -top-4 -right-4 bg-rose-500 text-white p-1.5 rounded-full shadow-md hover:scale-110 transition-transform"
                                    >
                                        <X size={12} />
                                    </button>

                                    {/* RESIZE HANDLE (Bottom Right) - Touch Enabled */}
                                    <div 
                                        onPointerDown={(e) => handlePointerDown(e, item, 'resize')}
                                        className="absolute -bottom-4 -right-4 w-8 h-8 bg-indigo-500 rounded-full shadow-lg flex items-center justify-center cursor-nwse-resize touch-none active:scale-125 transition-transform"
                                    >
                                        <Scaling size={14} className="text-white" />
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
                
                {/* Bottom Padding for scroll */}
                <div className="h-[50vh] w-full"></div>
            </div>

            {/* Canvas Toolbar (Fixed at bottom) */}
            <div className="fixed bottom-6 left-4 right-4 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-2 shadow-2xl z-40 flex items-center gap-2 pb-safe">
                <button 
                    onClick={() => setIsEmojiModalOpen(true)}
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-yellow-400 transition-colors"
                >
                    <Smile size={20} />
                </button>

                <input 
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCanvasItem('text', inputText)}
                    className="flex-1 bg-slate-950/50 border border-slate-800 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
                    placeholder="Type text..."
                />

                <button 
                    disabled={!inputText.trim()}
                    onClick={() => addCanvasItem('text', inputText)}
                    className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Full Emoji Finder Modal (iPhone Style) */}
            {isEmojiModalOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-sm animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between p-4 border-b border-slate-800">
                        <h3 className="text-white font-bold">Emoji Finder</h3>
                        <button onClick={() => setIsEmojiModalOpen(false)} className="p-2 bg-slate-800 rounded-full text-slate-300">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        <div className="grid grid-cols-6 gap-2 pb-20">
                            {COMMON_EMOJIS.map(char => (
                                <button
                                    key={char}
                                    onClick={() => addCanvasItem('emoji', char)}
                                    className="aspect-square flex items-center justify-center text-3xl hover:bg-slate-800 rounded-xl transition-colors active:scale-90"
                                >
                                    {char}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  );
}
