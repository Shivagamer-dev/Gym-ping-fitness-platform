function Security() {
  return (
      <section className="relative py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12">
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      Your Data, Your Control, Our Promise
                  </h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      Built with privacy by design, featuring decentralized architecture and end-to-end encryption
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                      {[
                          {
                              icon: (
                                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                  </svg>
                              ),
                              title: "End-to-End Encryption",
                              desc: "All information protected with robust encryption"
                          },
                          {
                              icon: (
                                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                              ),
                              title: "Decentralized Architecture",
                              desc: "No single point of vulnerability for your data"
                          },
                          {
                              icon: (
                                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                  </svg>
                              ),
                              title: "User-Centric Control",
                              desc: "You decide who sees your data and when"
                          },
                          {
                              icon: (
                                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.3C16,16.9 15.4,17.5 14.8,17.5H9.2C8.6,17.5 8,16.9 8,16.3V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
                                  </svg>
                              ),
                              title: "Privacy by Design",
                              desc: "Privacy as the paramount concern in every feature"
                          }
                      ].map((item, index) => (
                          <div key={index} className="bg-gray-700/30 rounded-xl p-6">
                              <div className="text-green-400 mb-3 flex justify-center">{item.icon}</div>
                              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                              <p className="text-gray-400 text-sm">{item.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>
  );
}

export default Security;