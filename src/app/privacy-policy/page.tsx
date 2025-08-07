import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl p-4 text-emerald-900">
      <h1 className="mb-4 text-3xl font-bold text-emerald-800">Privacy Policy</h1>
      <p className="mb-2 text-sm text-emerald-600">Last updated: August 7, 2025</p>

      <p className="mb-4">
        Welcome to Discounter. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">1. Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Account Information:</strong> Email, password, and selected user type (influencer or restaurant).</li>
        <li><strong>Content Submissions:</strong> Uploaded social media posts, QR codes, and performance metrics (e.g. views, likes).</li>
        <li><strong>Usage Data:</strong> Actions you take in the app, such as uploading reels or redeeming discounts.</li>
        <li><strong>Technical Information:</strong> Browser type, IP address, and device information collected automatically via cookies and analytics tools.</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To provide and improve the Discounter platform and services.</li>
        <li>To evaluate content performance and assign applicable discount codes.</li>
        <li>To prevent fraud and abuse of the discount system.</li>
        <li>To communicate with you, including transactional and promotional emails.</li>
        <li>To comply with legal obligations and resolve disputes.</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">3. Data Sharing</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>We do <strong>not</strong> sell your data to third parties.</li>
        <li>We may share information with service providers that help us operate our platform (e.g. hosting, analytics).</li>
        <li>We may disclose data when required by law or to protect our users or platform integrity.</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">4. Data Retention</h2>
      <p className="mb-2">
        We retain your information as long as your account is active and for the necessary time afterward to comply with legal obligations or resolve disputes. You may request deletion at any time.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">5. Your Rights</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access the data we hold about you.</li>
        <li>Request correction of incorrect data.</li>
        <li>Request deletion of your data.</li>
        <li>Withdraw consent to data processing (if applicable).</li>
      </ul>

      <p className="mt-4 mb-2">
        To request data deletion, please send an email to us using the link below. We will process your request within 30 days:
      </p>
      <p className="mb-6">
        <a
          href="mailto:sander@mychefsbase.com?subject=Data Deletion Request&body=Hello,%0D%0A%0D%0AI would like to request deletion of my personal data from the Discounter platform.%0D%0A%0D%0AEmail associated with my account:%0D%0A[Please enter your email here]%0D%0A%0D%0AThank you."
          className="text-emerald-700 underline hover:text-emerald-900"
        >
          Request Data Deletion via Email
        </a>
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">6. Children's Privacy</h2>
      <p className="mb-2">
        Discounter is not intended for use by children under the age of 13. We do not knowingly collect personal information from children.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">7. Changes to This Policy</h2>
      <p className="mb-2">
        We may update this policy from time to time. We will notify users of significant changes by email or through the app.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">8. Contact Us</h2>
      <p>
        For any questions or concerns about this Privacy Policy, please contact us at{" "}
        <a href="mailto:sander@mychefsbase.com" className="text-emerald-700 underline hover:text-emerald-900">
          sander@mychefsbase.com
        </a>.
      </p>
    </div>
  );
}

