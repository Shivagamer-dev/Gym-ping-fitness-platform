import { useState, useEffect } from 'react';
import AmilImage from '../assets/images/Amil.jpg';
import OmImage from '../assets/images/Om.jpg';

function Team() {
    const [hoveredMemberIndex, setHoveredMemberIndex] = useState<number | null>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, _index: number) => {
        if (isSmallScreen) return;

        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePosition({ x, y });
    };

    const teamMembers = [
        {
            name: "Amil Lal",
            role: "Co-Founder, CEO & CTO",
            gradient: "from-blue-400 via-cyan-400 to-purple-400",
            glowColor: "rgba(96, 165, 250, 0.3)",
            image: AmilImage,
            description: "Amil is the visionary behind Back&Bone's technological innovations and strategic direction. With a strong background in AI and software development, he leads the team in creating cutting-edge fitness solutions.",
            expertise: ["AI & ML", "Software Architecture", "Product Strategy"]
        },
        {
            name: "Om M. Dashasahastra",
            role: "Co-Founder, COO & CFO",
            gradient: "from-purple-400 via-pink-400 to-rose-400",
            glowColor: "rgba(192, 132, 252, 0.3)",
            image: OmImage,
            description: "Om drives the operational excellence and financial strategy of Back&Bone. His expertise in business management ensures smooth execution and sustainable growth, bringing the vision to life.",
            expertise: ["Operations", "Finance", "Strategic Planning"]
        }
    ];

    return (
        <section id="team" className="relative py-24 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
                        <span className="text-sm font-semibold text-blue-400">OUR TEAM</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                        Meet The Innovators
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        The passionate minds revolutionizing fitness technology
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group relative"
                            onMouseEnter={() => setHoveredMemberIndex(index)}
                            onMouseLeave={() => setHoveredMemberIndex(null)}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                        >
                            {/* Card glow effect */}
                            <div
                                className={`absolute -inset-0.5 bg-gradient-to-r ${member.gradient} rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
                            ></div>

                            {/* Main card */}
                            <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 transition-all duration-500 group-hover:border-gray-700 overflow-hidden">
                                {/* Spotlight effect */}
                                {!isSmallScreen && hoveredMemberIndex === index && (
                                    <div
                                        className="absolute w-64 h-64 rounded-full opacity-20 pointer-events-none transition-opacity duration-300"
                                        style={{
                                            background: `radial-gradient(circle, ${member.glowColor} 0%, transparent 70%)`,
                                            left: mousePosition.x - 128,
                                            top: mousePosition.y - 128,
                                        }}
                                    ></div>
                                )}

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Profile Image */}
                                    <div className="relative mb-6">
                                        <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-transparent transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}>
                                            <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        {/* Animated ring */}
                                        <div className={`absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10`}></div>
                                    </div>

                                    {/* Name and Role */}
                                    <div className="text-center mb-6 transition-all duration-300">
                                        <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                                            {member.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-medium">{member.role}</p>
                                    </div>

                                    {/* Expertise Tags */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                                        {member.expertise.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 text-xs font-medium bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 group-hover:border-gray-600 transition-colors duration-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Description - Shows on hover */}
                                    <div className={`transition-all duration-500 ${hoveredMemberIndex === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'} overflow-hidden`}>
                                        <div className="pt-4 border-t border-gray-800">
                                            <p className="text-gray-400 text-sm leading-relaxed text-center">
                                                {member.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative corner elements */}
                                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom decoration */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
                        <span>Building the future of fitness</span>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-700"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team;