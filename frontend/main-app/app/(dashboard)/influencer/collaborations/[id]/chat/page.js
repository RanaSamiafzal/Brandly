"use client";
import { useState, useEffect, useRef } from "react";
import {
    Send,
    ArrowLeft,
    MoreVertical,
    Phone,
    Video,
    Image as ImageIcon,
    Paperclip,
    Smile,
    CheckCircle2,
    Calendar,
    ClipboardList,
    Box
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CollaborationChatPage() {
    const params = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        // Fetch current user (simplified for this context)
        const fetchUser = async () => {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUserId(data.user.id);
            }
        };
        fetchUser();
        fetchMessages();
    }, []);

    useEffect(() => {
        if (!params.id) return;

        import("socket.io-client").then(({ io }) => {
            const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");
            setSocket(newSocket);

            newSocket.emit('join_collab', params.id);

            newSocket.on('receive_message', (message) => {
                setMessages((prev) => {
                    // Deduplicate: don't add if a message with the same id already exists
                    if (prev.some((m) => m.id === message.id)) return prev;
                    return [...prev, {
                        id: message.id,
                        sender: message.senderId === userId ? "me" : "brand",
                        text: message.content,
                        time: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }];
                });
            });

            return () => newSocket.close();
        });
    }, [params.id, userId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/influencer/collaborations/${params.id}/chat`);
            if (response.ok) {
                const data = await response.json();
                const formatted = data.messages.map(m => ({
                    id: m.id,
                    sender: m.senderId === userId ? "me" : "brand",
                    text: m.content,
                    time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));
                setMessages(formatted);
            }
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        const messageData = {
            requestId: params.id,
            senderId: userId,
            content: newMessage
        };

        socket.emit('send_message', messageData);
        setNewMessage("");
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-500">
            {/* Nav Header */}
            <div className="flex items-center justify-between py-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-6">
                    <Link href="/influencer/collaborations" className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-lg shadow-blue-100">
                            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop" alt="Brand" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase leading-none">FashionHub</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand Support • Online</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                        <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                        <Video className="w-5 h-5" />
                    </button>
                    <div className="w-px h-8 bg-gray-100 mx-2" />
                    <Link href={`/influencer/collaborations/${params.id}/tasks`}>
                        <button className="px-6 py-4 bg-white border border-gray-100 rounded-3xl font-black text-[10px] text-gray-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm flex items-center gap-2">
                            <ClipboardList className="w-4 h-4" /> Deliverables
                        </button>
                    </Link>
                </div>
            </div>

            {/* Chat Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
            >
                <div className="text-center">
                    <span className="px-4 py-1.5 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full border border-gray-100">Yesterday</span>
                </div>

                {isLoading ? (
                    <div className="text-center font-black text-gray-300 uppercase tracking-widest py-10">Initializing secure chat...</div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
                        >
                            <div className={`max-w-[70%] p-6 rounded-[32px] font-medium text-sm leading-relaxed shadow-sm transition-all hover:shadow-md ${msg.sender === "me"
                                ? "bg-gray-900 text-white rounded-br-none"
                                : "bg-white border border-gray-100 text-gray-700 rounded-bl-none"
                                }`}>
                                {msg.text}
                            </div>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2 mx-2">{msg.time}</span>
                        </div>
                    ))
                )}
            </div>

            {/* Input Area */}
            <div className="p-8 bg-white/80 backdrop-blur-xl border-t border-gray-100">
                <form
                    onSubmit={handleSendMessage}
                    className="flex flex-col md:flex-row items-center gap-4 bg-gray-50/50 p-3 rounded-[32px] border border-gray-100 focus-within:border-blue-200 focus-within:ring-4 focus-within:ring-blue-50 transition-all"
                >
                    <div className="flex items-center gap-1 pl-2">
                        <button type="button" className="p-3 text-gray-400 hover:text-blue-600 rounded-2xl transition-all">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button type="button" className="p-3 text-gray-400 hover:text-blue-600 rounded-2xl transition-all">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <button type="button" className="p-3 text-gray-400 hover:text-blue-600 rounded-2xl transition-all">
                            <Smile className="w-5 h-5" />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message to FashionHub..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-900 placeholder:text-gray-400 px-4"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-10 py-4 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                    >
                        Send <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
