function Team () {
  return (
      <section id="team" className="relative py-20 bg-gradient-to-b from-gray-900/50 to-black/50">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Meet The Team
                  </h2>
                  <p className="text-xl text-gray-300">The innovators behind Back&Bone</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {[
                      { name: "Amil Lal", role: "Co-Founder, CEO & CTO", gradient: "from-blue-400 to-purple-400" },
                      { name: "Om M. Dashasahastra", role: "Co-Founder, COO & CFO", gradient: "from-purple-400 to-pink-400" }
                  ].map((member, index) => (
                      <div key={index} className="group relative bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
                          <div className="w-24 h-24 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                              {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <h3 className={`text-xl font-bold text-center mb-2 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                              {member.name}
                          </h3>
                          <p className="text-gray-400 text-center">{member.role}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
  );
}

export default Team;