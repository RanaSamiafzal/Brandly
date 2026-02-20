export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Fashion Influencer",
            content: "Brandly has transformed how I collaborate with brands. The platform is intuitive and the opportunities are endless.",
            avatar: "SJ",
        },
        {
            name: "Michael Chen",
            role: "Marketing Director @ TechCorp",
            content: "Finding the right influencers has never been easier. Brandly saved us countless hours and delivered amazing results.",
            avatar: "MC",
        },
        {
            name: "Emma Davis",
            role: "Lifestyle Creator",
            content: "The best platform for managing collaborations. Professional, efficient, and genuinely cares about creators.",
            avatar: "ED",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by Creators & Brands</h2>
                    <p className="text-xl text-gray-600">
                        Join thousands of satisfied users who are growing their business with Brandly.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all">
                            <div className="flex text-yellow-400 mb-6">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-8 leading-relaxed">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
