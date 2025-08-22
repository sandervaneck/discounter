import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl p-4 text-emerald-900">
      <h1 className="mb-4 text-3xl font-bold text-emerald-800">Terms of Service</h1>
      <p className="mb-2 text-sm text-emerald-600">Last updated: August 7, 2025</p>

      <p className="mb-4">
        Welcome to Discounter. These Terms of Service ("Terms") govern your access to and use of the
        Discounter platform and any services provided through it. By creating an account or using
        our services, you agree to these Terms.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">1. Overview of Service</h2>
      <p className="mb-4">
        Discounter connects influencers and restaurants. Influencers can earn discounts on meals by
        sharing qualifying content on supported social media platforms. Restaurants can offer
        rewards and track promotional performance.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">2. Accounts and Eligibility</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>You must be at least 13 years old to use Discounter.</li>
        <li>You agree to provide accurate information when creating an account and to keep your login
        credentials secure.</li>
        <li>You are responsible for all activity under your account.</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">3. Facebook & Instagram Integration</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Discounter uses the Facebook and Instagram APIs to verify social media posts and collect
          performance metrics. When you connect your account, you authorize us to access permitted
          profile information, content, and insights as described in our Privacy Policy.
        </li>
        <li>
          Your use of Facebook and Instagram through Discounter is subject to the Meta Terms of
          Service, Instagram Terms of Use, and all other applicable policies.
        </li>
        <li>
          You may remove our access to your Facebook or Instagram account at any time through your
          account settings on those platforms.
        </li>
        <li>
          Discounter is not endorsed by, affiliated with, or sponsored by Facebook or Instagram.
        </li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">4. User Content and Conduct</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>You retain ownership of the content you submit. By posting content through Discounter,
        you grant us a non-exclusive license to display and analyze that content for the purpose of
        operating the platform.</li>
        <li>You agree not to post content that is unlawful, misleading, or violates the rights of
        others.</li>
        <li>You must comply with all applicable laws and with the content policies of Facebook and
        Instagram.</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">5. Discount Program</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Discounts are granted at the discretion of participating restaurants after verifying
        qualifying posts.</li>
        <li>We do not guarantee the availability of any discount or the accuracy of restaurant
        offerings.</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">6. Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your access to Discounter at any time for any reason, including
        if you violate these Terms or misuse the Facebook/Instagram integration. You may also close
        your account at any time.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">7. Disclaimers and Limitation of Liability</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Discounter is provided on an "as is" and "as available" basis without warranties of any
        kind.</li>
        <li>We are not responsible for third-party services, including Facebook or Instagram.</li>
        <li>To the fullest extent permitted by law, Discounter will not be liable for any indirect,
        incidental, or consequential damages arising from your use of the platform.</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">8. Changes to These Terms</h2>
      <p className="mb-4">
        We may update these Terms from time to time. If we make significant changes, we will notify
        you by email or through the platform. Your continued use of Discounter after the changes
        become effective constitutes your acceptance of the new Terms.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold text-emerald-700">9. Contact Us</h2>
      <p>
        For questions about these Terms, please contact us at {" "}
        <a href="mailto:sander@mychefsbase.com" className="text-emerald-700 underline hover:text-emerald-900">
          sander@mychefsbase.com
        </a>.
      </p>
    </div>
  );
}

