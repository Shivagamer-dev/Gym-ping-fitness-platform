import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      {/* <p className="mb-4"><strong>Effective Date:</strong> [Date]</p> */}

      <section className="mb-6">
        <p>Welcome to Gym-Ping! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside">
          <li><strong>Personal Information:</strong> We may collect information like your name, email address, and contact details when you sign up or use certain features.</li>
          <li><strong>Usage Data:</strong> We collect information on how you use our site, including pages visited and time spent.</li>
          <li><strong>Location Data:</strong> For features like the gym locator, we may request permission to access your location (atleast not now), which is only used to enhance your experience and is not stored by us.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc list-inside">
          <li><strong>Provide Services:</strong> To deliver and improve the functionality of the Gym-Ping website.</li>
          <li><strong>Personalize Content:</strong> To tailor recommendations based on your preferences.</li>
          <li><strong>Communicate:</strong> To send updates, offers, and respond to inquiries.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
        <p>We do not sell your personal information. We may share information with:</p>
        <ul className="list-disc list-inside">
          <li><strong>Service Providers:</strong> Third-party vendors for authentication and analytics.</li>
          <li><strong>Legal Requirements:</strong> Disclosure may occur if required by law.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Third-Party Services</h2>
        <p>Gym-Ping integrates services from third parties, each operating under their own privacy policies. We encourage you to review these policies.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Security</h2>
        <p>We use industry-standard measures to protect your data. However, no online transmission is completely secure, so we cannot guarantee complete security.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Children’s Privacy</h2>
        <p>Our site is not intended for children under 13, and we do not knowingly collect information from them. If we learn of such data, we will delete it.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
        <p>We may update this Privacy Policy. Changes will be posted here with an updated effective date.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p>
          If you have questions or concerns, please visit our
          <Link to="/support" className="text-blue-500 underline ml-1">Support</Link> page.
        </p>
      </section>
    </div>
  );
}

export default Privacy;