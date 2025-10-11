import { memo } from 'react';
import { Helmet } from "react-helmet-async";
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import BackBoneCover from './BackBoneCover';
import Security from './Security';
import Team from './Team';
import Features from './Features';

const EndToEndEncryptionIcon = memo(() => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d={"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"} />
  </svg>
));

const PrivacyByDesignIcon = memo(() => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d={"M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.3C16,16.9 15.4,17.5 14.8,17.5H9.2C8.6,17.5 8,16.9 8,16.3V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z"} />
  </svg>
));

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Helmet>
        <title>Back&Bone | Home</title>
        <meta name="description" content="Back&Bone: Your Personal Coach, UPGRADED! Discover AI-powered fitness features like Spotter, RepBot, and personalized training to reach your goals." />
        <meta name="keywords" content="Back&Bone, fitness app, AI coach, personalized training, Spotter, RepBot, workout tracker, health, fitness technology" />
        <meta property="og:title" content="Back&Bone | Home" />
        <meta property="og:description" content="Back&Bone: Your Personal Coach, UPGRADED! Discover AI-powered fitness features like Spotter, RepBot, and personalized training to reach your goals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://backandbone.com/" />
        <meta property="og:image" content="https://backandbone.com/images/assets/LineLogoSVG.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Back&Bone | Home" />
        <meta name="twitter:description" content="Back&Bone: Your Personal Coach, UPGRADED! Discover AI-powered fitness features like Spotter, RepBot, and personalized training to reach your goals." />
        <meta name="twitter:image" content="https://backandbone.com/images/assets/LineLogoSVG.svg" />
      </Helmet>

      {/* BackBone Cover Section */}
      <BackBoneCover />

      {/* Features Section */}
      <Features />

      <HowItWorks />

      {/* Security Section */}
      <Security />

      {/* Team Section */}
      <Team />

      {/* CTA Section */}
      <CTA />
    </div>
  );
}

export default Home;

export { EndToEndEncryptionIcon, PrivacyByDesignIcon };
