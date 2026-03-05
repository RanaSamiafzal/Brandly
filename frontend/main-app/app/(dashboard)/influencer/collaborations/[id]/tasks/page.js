"use client";
import { useState, useEffect } from "react";
import {
    CheckCircle2,
    Circle,
    Clock,
    Plus,
    ArrowLeft,
    Calendar,
    Search,
    Filter,
    ClipboardList,
    AlertCircle,
    ChevronRight,
    MessageSquare
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CollaborationTasksPage() {
    const params = useParams();
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ total: 0, completed: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [socket, setSocket] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDueDate, setNewTaskDueDate] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchTasks();
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
            const response = await fetch(`/api/influencer/collaborations/${params.id}/tasks`);
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
            const res = await fetch(`/api/influencer/collaborations/${params.id}/tasks`, {
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
                    <Link href="/influencer/collaborations" className="inline-flex items-center gap-3 text-sm font-black text-gray-400 hover:text-blue-600 transition-all group uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" /> Back to collaborations
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-100">
                            <ClipboardList className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Deliverables Board</h1>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Campaign: Summer Style 2024 • FashionHub</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`/influencer/collaborations/${params.id}/chat`} onClick={() => setHasUnreadMessages(false)}>
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
                        <Plus className="w-4 h-4" /> Add Task
                    </button>
                </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white border border-gray-100 rounded-[40px] p-10 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 flex-1 w-full">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Overall Completion</span>
                        <span className="text-2xl font-black text-gray-900">{Math.round((stats.completed / stats.total) * 100)}%</span>
                    </div>
                    <div className="h-4 bg-gray-50 rounded-full overflow-hidden p-1 shadow-inner">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                            style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                        />
                    </div>
                    <div className="flex gap-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {stats.completed} Done</span>
                        <span className="flex items-center gap-2"><Circle className="w-3.5 h-3.5 text-gray-200" /> {stats.total - stats.completed} Remaining</span>
                    </div>
                </div>
                <div className="flex gap-4 md:pl-12 md:border-l border-gray-100">
                    <div className="text-center px-8 border-r border-gray-50">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Due Next</p>
                        <p className="text-lg font-black text-gray-900">Mar 5</p>
                    </div>
                    <div className="text-center px-8">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest">On Track</span>
                    </div>
                </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
                {isLoading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-20 bg-gray-50 rounded-3xl animate-pulse" />)
                ) : (
                    tasks.map((task, idx) => (
                        <div
                            key={task.id}
                            className={`group bg-white border rounded-[32px] p-6 flex items-center gap-6 transition-all hover:shadow-xl ${task.status === "completed" ? "opacity-60 border-gray-100 bg-gray-50/30" : "border-gray-50 hover:border-blue-100"
                                }`}
                        >
                            <button
                                onClick={() => toggleTask(task.id)}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all ${task.status === "completed"
                                    ? "bg-green-500 border-green-500 text-white"
                                    : "border-gray-100 hover:border-blue-400 group-hover:bg-blue-50"
                                    }`}
                            >
                                {task.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full border border-gray-200" />}
                            </button>

                            <div className="flex-1">
                                <h3 className={`text-lg font-bold transition-all uppercase tracking-tight ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-900"}`}>
                                    {task.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                        <Calendar className="w-3 h-3" /> {task.deadline}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${task.priority === "High" ? "bg-red-50 text-red-500" : task.priority === "Medium" ? "bg-orange-50 text-orange-500" : "bg-gray-100 text-gray-400"
                                        }`}>
                                        {task.priority} Priority
                                    </span>
                                </div>
                            </div>

                            <button className="p-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-blue-600">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Add Task Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-gray-900">Add New Task</h2>
                        </div>
                        <form onSubmit={handleAddTask} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Task Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="e.g. Draft Instagram Story"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Due Date (Optional)</label>
                                <input
                                    type="date"
                                    value={newTaskDueDate}
                                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700"
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving || !newTaskTitle.trim()}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                                >
                                    {isSaving ? "Saving..." : "Save Task"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
