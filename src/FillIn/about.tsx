import React from 'react';

function About() {
  return (
    <div className="bg-[#1A1A1A] max-h-screen text-white py-10">
      <div className="p-6 max-w-screen-lg pt-10 mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 italic tracking-wide">
          About Gym-Ping
        </h1>

        {/* Overview Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-300">
            Gym-Ping is a fitness platform designed to help you locate the best gyms, track your progress, and achieve your fitness goals with ease. Whether you're a beginner or a fitness enthusiast, Gym-Ping is here to support your journey.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Get to know gyms near UPES-Dehradun with accurate details and equipment lists with our Locator.</li>
            <li>Track your fitness journey with our personalized Dashboard (Coming Soon!).</li>
            <li>Access exercise videos and tips with our Spotter.</li>
            <li>Get prompt assistance through our support system.</li>
          </ul>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Why Choose Gym-Ping?</h2>
          <p className="text-gray-300">
            We prioritize your fitness journey with a user-friendly design, detailed gym data, and tools that simplify your wellness goals. Our commitment to privacy ensures your data stays secure while you focus on getting stronger and healthier.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mt-8 pb-5">
          <p className="text-lg font-medium mb-4">Ready to kickstart your fitness journey?</p>
          <div className="flex justify-center">
            <a
              href="/locator"
              className="bg-blue-600 mr-3 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Muscle.loc
            </a>
            <a
              href="/spotter"
              className="bg-blue-600 ml-3 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Muscle.dev
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
