function CTA() {
    return (
        <section className="relative py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Ready to Transform Your Fitness Journey?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join thousands of users who are already experiencing the future of fitness
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-blue-500/25">
                            Download the Back&Bone App
                        </button>
                        <button className="bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800/70 transition-colors">
                            Explore Features
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;