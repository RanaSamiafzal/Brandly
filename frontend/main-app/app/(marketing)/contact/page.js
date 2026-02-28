"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, this would send to an API endpoint
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gradient-to-b from-[#F0F7FF] to-white pt-36 pb-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-gray-500 max-w-xl mx-auto">
                            Have questions about Brandly? Our team is here to help you find the right solution for your needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-12 max-w-5xl mx-auto">
                        {/* Contact Form */}
                        <div className="md:col-span-3">
                            <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/80 p-8 md:p-10">
                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Message Sent!</h3>
                                        <p className="text-gray-500 mb-6">
                                            Thank you for reaching out. Our team will get back to you within 24 hours.
                                        </p>
                                        <Link
                                            href="/"
                                            className="text-blue-600 font-semibold hover:underline"
                                        >
                                            ← Back to Home
                                        </Link>
                                    </div>
                                ) : (
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-[#0F172A] mb-2">
                                                    Full Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-[#0F172A] mb-2">
                                                    Work Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@company.com"
                                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-[#0F172A] mb-2">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Brandly Inc."
                                                className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-[#0F172A] mb-2">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us about your project and how we can help..."
                                                rows={5}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 resize-none"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-100 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
                                        >
                                            Send Message →
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info Sidebar */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-[#0F172A] mb-1">Email Us</h3>
                                <p className="text-gray-500 text-sm mb-3">Our team typically responds within 24 hours.</p>
                                <a href="mailto:support@brandly.com" className="text-blue-600 font-semibold text-sm hover:underline">
                                    support@brandly.com
                                </a>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-[#0F172A] mb-1">Support Hours</h3>
                                <p className="text-gray-500 text-sm">Monday – Friday</p>
                                <p className="text-gray-900 font-semibold text-sm">9:00 AM – 6:00 PM (EST)</p>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-[#0F172A] mb-1">Help Center</h3>
                                <p className="text-gray-500 text-sm mb-3">Browse our knowledge base for quick answers.</p>
                                <Link href="/resources/help-center" className="text-blue-600 font-semibold text-sm hover:underline">
                                    Visit Help Center →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
