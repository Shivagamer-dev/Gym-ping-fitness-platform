import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import ApplyPopup from "../components/ApplyPopup";

interface CareerOpening {
  title: string;
  role: string;
  description: string;
  type: string;
  location: string;
  exReq: string[];
}

interface CareersData {
  openings: CareerOpening[];
}

function Career() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{ title: string, role: string } | null>(null);
  const [careers, setCareers] = useState<CareersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/BUTDRILL1/backnbone-data/contents/careers.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { content } = await response.json();
        const decodedContent = atob(content);
        const data: CareersData = JSON.parse(decodedContent);
        setCareers(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const openPopup = (title: string, role: string) => {
    setSelectedJob({ title, role });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      <Helmet>
        <title>Careers at Back&Bone - Join Our AI-Powered Fitness Revolution</title>
        <meta name="description" content="Explore exciting career opportunities at Back&Bone. Join our innovative team shaping the future of fitness with AI technology, remote-first culture, and growth opportunities." />
        <meta name="keywords" content="Back&Bone careers, fitness jobs, AI fitness technology jobs, remote fitness jobs, career growth, fitness innovation, apply for fitness jobs" />
        <meta property="og:title" content="Careers at Back&Bone - Join Our AI-Powered Fitness Revolution" />
        <meta property="og:description" content="Discover open positions and be part of a collaborative, innovative team transforming fitness through AI-powered tools and technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://backandbone.com/career" />
        <meta property="og:image" content="https://backandbone.com/assets/images/LineLogoSVG.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at Back&Bone - Join Our AI-Powered Fitness Revolution" />
        <meta name="twitter:description" content="Join Back&Bone's team and help revolutionize fitness with cutting-edge AI technology and a remote-first culture." />
        <meta name="twitter:image" content="https://backandbone.com/assets/images/LineLogoSVG.svg" />
      </Helmet>

      <ApplyPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        jobTitle={selectedJob?.title}
        jobRole={selectedJob?.role}
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Shape the Future of Fitness
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Join Back&Bone and be part of a revolutionary team that's transforming
              how people experience fitness through cutting-edge AI technology.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Remote-First Culture
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Competitive Benefits
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                Growth Opportunities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Us Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Back&Bone?</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-5">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation-Driven</h3>
            <p className="text-gray-400">Work with cutting-edge AI and machine learning technologies that are reshaping the fitness landscape.</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Collaborative Culture</h3>
            <p className="text-gray-400">Join a diverse, passionate team where every voice matters and collaboration drives success.</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
            <p className="text-gray-400">Accelerate your career with mentorship, learning opportunities, and clear advancement paths.</p>
          </div>
        </div>
      </div>

      {/* Applications Accepted Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Applications Are Cordially Accepted</h2>
          <p className="text-lg text-gray-200">
            We welcome talented individuals to join our innovative team. Apply now and be part of the revolution!
          </p>
        </div>
      </div>

      {/* Job Openings Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Current Opportunities</h2>
          <p className="text-gray-400 text-lg">Find your perfect role and start making an impact today</p>
        </div>

        {loading && <div className="text-center py-16 text-gray-400">Loading career opportunities...</div>}
        {error && <div className="text-center py-16 text-red-500">Error: {error}</div>}

        {careers && careers.openings && careers.openings.length > 0 ? (
          <div className="space-y-6">
            {careers.openings.map((job, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold text-white mb-1">{job.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 font-medium text-lg">{job.role}</span>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <span className="text-gray-400 text-sm">Specialization</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed">{job.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.type && (
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30">
                        {job.type}
                      </span>
                    )}
                    {job.location && (
                      <span className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-sm border border-green-600/30">
                        {job.location}
                      </span>
                    )}
                  </div>
                </div>

                {job.exReq && job.exReq.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-gray-200">What we're looking for:</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {job.exReq.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start gap-3 text-gray-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => openPopup(job.title, job.role)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        ) : (!loading && !error && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No current openings</h3>
            <p className="text-gray-400 mb-6">We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.</p>
          </div>
        ))}
      </div>

      {/* Application Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Mission?</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            If you're passionate about fitness technology and want to be part of an innovative team
            that's changing lives, we'd love to hear from you.
          </p>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
            <p className="text-lg mb-4">
              Send your resume and cover letter to our talent team:
            </p>
            <a
              href="mailto:careers@backandbone.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              careers@backandbone.com
            </a>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Back&Bone is an equal opportunity employer committed to diversity and inclusion.
            All qualified applicants will receive consideration for employment without regard to
            race, color, religion, gender, sexual orientation, age, national origin, disability,
            or veteran status.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Career;
