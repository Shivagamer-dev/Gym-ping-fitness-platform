function HowItWorks() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-purple-900/35 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "1", title: "Secure Your Data", desc: "Sign up and securely store your personal information" },
              { step: "2", title: "Discover & Connect", desc: "Use Spotter for exercises and Locator for fitness spots" },
              { step: "3", title: "Personalize Your Plan", desc: "Engage with RepBot for tailored guidance" },
              { step: "4", title: "Track & Analyze", desc: "Sync wearables and monitor health on Dashboard" },
              { step: "5", title: "Control Your Data", desc: "Manage permissions and access anytime" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

export default HowItWorks;
