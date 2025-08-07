import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Privacy Policy</h1>
      <p className="mb-2">Last updated: January 1, 2025</p>
      <p className="mb-2">
        This Privacy Policy explains how we collect, use, and share your personal
        information when you use Discounter.
      </p>
      <h2 className="mt-6 mb-2 text-xl font-semibold">Information We Collect</h2>
      <p className="mb-2">
        We collect information you provide directly to us, such as when you
        create an account or contact support.
      </p>
      <h2 className="mt-6 mb-2 text-xl font-semibold">How We Use Information</h2>
      <p className="mb-2">
        We use the information to operate and improve our services, communicate
        with you, and comply with legal obligations.
      </p>
      <h2 className="mt-6 mb-2 text-xl font-semibold">Contact Us</h2>
      <p>
        If you have any questions about this policy, you can contact us at
        support@example.com.
      </p>
    </div>
  );
}
