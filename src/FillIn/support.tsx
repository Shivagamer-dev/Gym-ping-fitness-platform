import React, { useState } from 'react';
import faqData from './../assets/faq.json';

function Support() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#1A1A1A] text-white py-10">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 italic tracking-wide">FAQs & Support</h1>

        {/* Mapping through FAQ data */}
        {faqData.map((faq, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`mb-6 p-6 border border-transparent rounded-lg shadow-lg transition-all duration-300 ease-in-out ${hoveredIndex === index ? 'bg-[#2C2C2C]' : 'bg-[#232323]'} hover:bg-[#2C2C2C]`}
          >
            {/* Question */}
            <h2 className="text-xl font-semibold mb-2 cursor-pointer">
              {faq.question}
            </h2>

            {/* Answer with expand animation */}
            <p
              className={`text-gray-300 overflow-hidden transition-all duration-300 ease-in-out ${hoveredIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {faq.answer}
            </p>
          </div>
        ))}

        {/* Contact Details Section */}
        <div className="mt-12 p-4 border-t border-gray-700 pt-6 text-center">
          <h2 className="text-2xl font-extrabold mb-4">Contact Us</h2>
          <p className="text-gray-300">
            If you have further questions or need assistance, feel free to reach out:
          </p>
          <p className="mt-2">
            Email: <a href="mailto:support@gym-ping.com" className="underline text-blue-600 hover:text-blue-700 transition">gymping@gg.com</a>
          </p>
          <p>
            Phone: <a href="tel:+9911001971" className="underline text-blue-600 hover:text-blue-700 transition">+91 9911......</a>
          </p>
          <p className="mt-2">
            Address: Maggie Point, Bidholi, Dehradun, Uttarakhand, India
          </p>
        </div>
      </div>
    </div>
  );
}

export default Support;
