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
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState({ total: 0, completed: 0 });

    useEffect(() => {
        setMounted(true);
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setIsLoading(true);
        // Mock data for collaboration tasks
        setTimeout(() => {
            const mockTasks = [
                { id: "t1", title: "Review brand guidelines", status: "completed", deadline: "Feb 28, 2024", priority: "High" },
                { id: "t2", title: "Initial draft of Instagram Reel", status: "in-progress", deadline: "Mar 5, 2024", priority: "High" },
                { id: "t3", title: "Submit story frames for approval", status: "pending", deadline: "Mar 10, 2024", priority: "Medium" },
                { id: "t4", title: "Final content export & caption writing", status: "pending", deadline: "Mar 15, 2024", priority: "Medium" },
                { id: "t5", title: "Publish & send insights report", status: "pending", deadline: "Mar 20, 2024", priority: "Low" }
            ];
            setTasks(mockTasks);
            setStats({
                total: mockTasks.length,
                completed: mockTasks.filter(t => t.status === "completed").length
            });
            setIsLoading(false);
        }, 600);
    };

    const toggleTask = (id) => {
        setTasks(prev => {
            const newTasks = prev.map(t =>
                t.id === id ? { ...t, status: t.status === "completed" ? "pending" : "completed" } : t
            );
            setStats({
                total: newTasks.length,
                completed: newTasks.filter(t => t.status === "completed").length
            });
            return newTasks;
        });
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
                    <Link href={`/influencer/collaborations/${params.id}/chat`}>
                        <button className="px-8 py-4 bg-white border border-gray-100 rounded-3xl font-black text-xs text-gray-600 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Open Chat
                        </button>
                    </Link>
                    <button className="px-8 py-4 bg-gray-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 flex items-center gap-2">
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
        </div>
    );
}
