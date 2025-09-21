function Features () {
    return (
        <section id="features" className="relative py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Explore Our Exclusive Features
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Elevate your fitness journey with our comprehensive suite of AI-powered tools
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            title: "Spotter",
                            subtitle: "Master Every Move",
                            desc: "Access thousands of exercise videos with expert guidance and proper form demonstrations.",
                            icon: (
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            ),
                            gradient: "from-blue-400 to-cyan-400",
                            bgGradient: "from-blue-600/20 to-cyan-600/20"
                        },
                        {
                            title: "Locator",
                            subtitle: "Find Your Fitness Hub",
                            desc: "Discover nearby gyms and fitness centers with real-time ratings and amenities.",
                            icon: (
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            ),
                            gradient: "from-purple-400 to-pink-400",
                            bgGradient: "from-purple-600/20 to-pink-600/20"
                        },
                        {
                            title: "RepBot",
                            subtitle: "Your AI Fitness Partner",
                            desc: "Get personalized workout plans and nutrition advice tailored to your goals.",
                            icon: (
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            ),
                            gradient: "from-green-400 to-emerald-400",
                            bgGradient: "from-green-600/20 to-emerald-600/20"
                        },
                        {
                            title: "Dashboard",
                            subtitle: "Complete Health Overview",
                            desc: "Track vital metrics and integrate seamlessly with your favorite wearables.",
                            icon: (
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            ),
                            gradient: "from-yellow-400 to-orange-400",
                            bgGradient: "from-yellow-600/20 to-orange-600/20"
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className={`group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>

                            <div className="relative z-10">
                                <div className="mb-4">
                                    <div className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent inline-block`}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                                    {feature.title}
                                </h3>
                                <h4 className="text-lg font-semibold text-gray-300 mb-4">{feature.subtitle}</h4>
                                <p className="text-gray-400 leading-relaxed mb-6">{feature.desc}</p>
                                <button className={`bg-gradient-to-r ${feature.gradient} px-4 py-2 rounded-lg text-black font-semibold hover:scale-105 transition-transform`}>
                                    Explore
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;