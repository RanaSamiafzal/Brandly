import Link from "next/link";

export default function Footer() {
    const sections = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "/features" },
                { label: "Case Studies", href: "#" },
                { label: "Blog", href: "#" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Contact", href: "/contact" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Help Center", href: "/resources/help-center" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
            ],
        },
    ];

    return (
        <footer className="bg-gray-900 border-t border-gray-800 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">B</span>
                            </div>
                            <span className="text-xl font-bold text-white">Brandly</span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Connecting brands with influencers for authentic collaborations.
                        </p>
                        <div className="flex gap-4">
                            {/* Social icons would go here */}
                        </div>
                    </div>

                    {sections.map((section, index) => (
                        <div key={index}>
                            <h4 className="text-white font-bold mb-6">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} Brandly. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
