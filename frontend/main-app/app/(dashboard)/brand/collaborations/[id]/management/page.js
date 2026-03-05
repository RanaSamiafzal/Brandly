"use client";
import { useState, useEffect } from "react";
import {
    CheckCircle2,
    Circle,
    Clock,
    Plus,
    ArrowLeft,
    Calendar,
    ClipboardList,
    MessageSquare,
    ChevronRight,
    User,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthStore } from "@repo/store";

export default function BrandManagementPage() {
    const params = useParams();
    const { user } = useAuthStore();
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ total: 0, completed: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [socket, setSocket] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDueDate, setNewTaskDueDate] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [collabInfo, setCollabInfo] = useState(null);

    useEffect(() => {
        setMounted(true);
        fetchTasks();
        fetchCollabDetails();
    }, []);

    useEffect(() => {
        if (!params.id) return;

        import("socket.io-client").then(({ io }) => {
            const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001");
            setSocket(newSocket);

            newSocket.emit('join_collab', params.id);

            newSocket.on('task_updated', (updatedTask) => {
                setTasks(prev => prev.map(t => t.id === updatedTask.id ? {
                    ...t,
                    status: updatedTask.status.toLowerCase(),
                    title: updatedTask.title,
                    deadline: updatedTask.deadline ? new Date(updatedTask.deadline).toLocaleDateString() : t.deadline,
                    priority: updatedTask.priority
                } : t));
            });

            newSocket.on('new_activity', (activity) => {
                if (activity.type === 'NEW_MESSAGE' && activity.relatedId === params.id) {
                    setHasUnreadMessages(true);
                }
            });

            return () => newSocket.close();
        });
    }, [params.id]);

    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

    useEffect(() => {
        setStats({
            total: tasks.length,
            completed: tasks.filter(t => t.status === "completed" || t.status === "COMPLETED").length
        });
    }, [tasks]);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/brand/collaborations/${params.id}/tasks`);
            if (response.ok) {
                const data = await response.json();
                const formatted = data.tasks.map(t => ({
                    id: t.id,
                    title: t.title,
                    status: t.status.toLowerCase(),
                    deadline: t.deadline ? new Date(t.deadline).toLocaleDateString() : "No deadline",
                    priority: t.priority
                }));
                setTasks(formatted);
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCollabDetails = async () => {
        try {
            const res = await fetch(`/api/brand/requests/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setCollabInfo(data.request);
            }
        } catch (error) {
            console.error("Failed to fetch collab details", error);
        }
    };

    const toggleTask = (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task || !socket) return;

        const newStatus = task.status === "completed" ? "PENDING" : "COMPLETED";

        socket.emit('task_update', {
            requestId: params.id,
            taskId: id,
            update: { status: newStatus }
        });
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        setIsSaving(true);
        try {
            const res = await fetch(`/api/brand/collaborations/${params.id}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: newTaskTitle,
                    dueDate: newTaskDueDate || undefined,
                    priority: "Medium"
                })
            });

            if (res.ok) {
                const data = await res.json();
                setTasks(prev => [...prev, {
                    id: data.task.id,
                    title: data.task.title,
                    status: data.task.status.toLowerCase(),
                    deadline: data.task.dueDate ? new Date(data.task.dueDate).toLocaleDateString() : "No deadline",
                    priority: "Medium"
                }]);
                setIsAddModalOpen(false);
                setNewTaskTitle("");
                setNewTaskDueDate("");
            }
        } catch (error) {
            console.error("Failed to add task", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 md:px-12 pb-16 animate-in fade-in duration-500">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pt-2">
                <div className="space-y-4">
                    <Link href="/brand/collaborations" className="inline-flex items-center gap-3 text-sm font-black text-gray-400 hover:text-blue-600 transition-all group uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" /> Back to collaborations
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-100">
                            <ClipboardList className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Collaboration Hub</h1>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">
                                Partner: {collabInfo?.sender?.fullname || "Influencer"} • {collabInfo?.campaign?.title || "Campaign"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`/brand/collaborations/${params.id}/chat`} onClick={() => setHasUnreadMessages(false)}>
                        <button className="px-8 py-4 bg-white border border-gray-100 rounded-3xl font-black text-xs text-gray-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm flex items-center gap-2 relative">
                            <MessageSquare className="w-4 h-4" /> Open Chat
                            {hasUnreadMessages && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-sm flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                </span>
                            )}
                        </button>
                    </Link>
                    <button onClick={() => setIsAddModalOpen(true)} className="px-8 py-4 bg-gray-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Create Deliverable
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Stats Card */}
                <div className="lg:col-span-2 bg-white border border-gray-100 rounded-[40px] p-10 shadow-sm flex flex-col justify-center">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Deliverables Progress</span>
                            <span className="text-3xl font-black text-gray-900">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</span>
                        </div>
                        <div className="h-5 bg-gray-50 rounded-full overflow-hidden p-1.5 shadow-inner">
                            <div
                                className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                            />
                        </div>
                        <div className="flex gap-8 text-xs font-black text-gray-500 uppercase tracking-widest">
                            <span className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> {stats.completed} Completed</span>
                            <span className="flex items-center gap-2.5"><Circle className="w-4 h-4 text-gray-200" /> {stats.total - stats.completed} Pending</span>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-blue-600 rounded-[40px] p-8 text-white shadow-xl shadow-blue-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Influencer Details</span>
                            <User className="w-5 h-5 opacity-80" />
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl border-2 border-white/20 overflow-hidden">
                                <img
                                    src={collabInfo?.sender?.profilePic || "https://i.pravatar.cc/150"}
                                    className="w-full h-full object-cover"
                                    alt="Profile"
                                />
                            </div>
                            <div>
                                <h3 className="font-black text-lg uppercase leading-tight">{collabInfo?.sender?.fullname}</h3>
                                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Acceptance Rate: 98%</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-2">
                        View Profile <ExternalLink className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Deliverables List */}
            <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm">
                <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                        <ClipboardList className="w-6 h-6 text-blue-600" /> Campaign Deliverables
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-gray-100">{tasks.length} Total</span>
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {isLoading ? (
                        [1, 2, 3].map(i => <div key={i} className="p-10 animate-pulse flex items-center gap-6">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-100 rounded w-1/4" />
                                <div className="h-3 bg-gray-50 rounded w-1/6" />
                            </div>
                        </div>)
                    ) : tasks.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ClipboardList className="w-10 h-10 text-gray-200" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900 uppercase">No deliverables yet</h3>
                            <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">Create tasks to track the progress of this collaboration and set clear expectations.</p>
                            <button onClick={() => setIsAddModalOpen(true)} className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all">
                                Create First Deliverable
                            </button>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`p-8 hover:bg-gray-50/50 transition-all flex items-center gap-8 ${task.status === "completed" ? "opacity-60" : ""}`}
                            >
                                <button
                                    onClick={() => toggleTask(task.id)}
                                    className={`w-10 h-10 rounded-2xl flex items-center justify-center border-2 transition-all ${task.status === "completed"
                                        ? "bg-green-500 border-green-500 text-white"
                                        : "border-gray-100 hover:border-blue-400"
                                        }`}
                                >
                                    {task.status === "completed" ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-5 h-5 text-gray-100" />}
                                </button>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className={`text-lg font-black tracking-tight uppercase ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-900"}`}>
                                            {task.title}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${task.priority === "High" ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
                                            }`}>
                                            {task.priority || "Medium"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <Calendar className="w-3.5 h-3.5" /> Due: {task.deadline}
                                        </span>
                                        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${task.status === "completed" ? "text-green-500" : "text-orange-500"
                                            }`}>
                                            <Clock className="w-3.5 h-3.5" /> {task.status === "completed" ? "Delivered" : "In Progress"}
                                        </span>
                                    </div>
                                </div>

                                <button className="p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all text-gray-300 hover:text-blue-600">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Task Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Add Deliverable</h2>
                        </div>
                        <form onSubmit={handleAddTask} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="e.g. Instagram Reel Promotion"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Deadline</label>
                                <input
                                    type="date"
                                    value={newTaskDueDate}
                                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700"
                                />
                            </div>
                            <div className="pt-6 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 py-4 font-black text-[10px] text-gray-400 uppercase tracking-widest hover:bg-gray-50 rounded-2xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving || !newTaskTitle.trim()}
                                    className="flex-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-100 active:scale-95 disabled:opacity-50"
                                >
                                    {isSaving ? "Creating..." : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
