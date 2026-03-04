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
    const scrollRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        fetchMessages();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchMessages = async () => {
        setIsLoading(true);
        // Mock data for collaboration chat
        setTimeout(() => {
            setMessages([
                { id: 1, sender: "brand", text: "Hi Sarah! we're excited to have you on the Summer Style campaign.", time: "10:30 AM" },
                { id: 2, sender: "me", text: "Thanks! I've just reviewed the brief. The sustainable fabric angle is great.", time: "10:35 AM" },
                { id: 3, sender: "brand", text: "Perfect. When can we expect the first draft of the reel?", time: "10:40 AM" },
                { id: 4, sender: "me", text: "I'm shooting tomorrow, so I should have a draft by Wednesday afternoon.", time: "10:45 AM" },
                { id: 5, sender: "brand", text: "That works for us. Let us know if you need any specific high-res logos for the edit.", time: "11:00 AM" }
            ]);
            setIsLoading(false);
        }, 600);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            sender: "me",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, msg]);
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
