import Link from "next/link";

export const dynamic = "force-static";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col font-geist">
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <header className="relative w-full px-6 py-6 sm:px-10 flex justify-between items-center border-b border-white/5">
        <Link
          href="/"
          className="uppercase tracking-[0.3em] text-xs text-zinc-400 hover:text-white transition"
        >
          SLC.RUN
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition"
        >
          Home
        </Link>
      </header>

      <main className="relative flex-1">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-8">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-zinc-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                Slick Enterprises LLP ("we," "our," or "us") operates SLC, a stateful serverless
                computing platform. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our services, including our persistent
                functions and stateful serverless infrastructure.
              </p>
              <p>
                By using SLC, you agree to the collection and use of information in accordance with
                this policy. We are committed to protecting your privacy and ensuring compliance with
                applicable data protection laws, including India's Digital Personal Data Protection
                Act, 2023 (DPDP Act).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.1 Personal Information</h3>
              <p>We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address and contact information</li>
                <li>Account credentials and authentication data</li>
                <li>Payment and billing information (processed through third-party providers)</li>
                <li>Communication preferences and feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2 Usage and Technical Information</h3>
              <p>We automatically collect certain information when you use SLC:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Function invocation logs and execution metrics</li>
                <li>State data stored in persistent functions (Durable Objects)</li>
                <li>API usage patterns and performance data</li>
                <li>Device information, IP addresses, and browser type</li>
                <li>Error logs and diagnostic information</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.3 Customer Content</h3>
              <p>
                As a data processor, we process data on behalf of our customers. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Application code and function logic deployed to SLC</li>
                <li>State data persisted in durable objects</li>
                <li>Runtime data processed by your functions</li>
                <li>Configuration and deployment settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide, maintain, and improve our services</li>
                <li>To process transactions and manage your account</li>
                <li>To execute and persist your stateful serverless functions</li>
                <li>To monitor service performance and ensure reliability</li>
                <li>To communicate with you about your account and our services</li>
                <li>To comply with legal obligations and enforce our terms</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Storage and Location</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1 Data Localization for Indian Users</h3>
              <p>
                In compliance with India's Digital Personal Data Protection Act, 2023, we offer
                jurisdictional restrictions for persistent state data. When you create a Durable
                Object namespace restricted to India, all state data within that namespace will be
                stored and processed within India.
              </p>
              <p>
                For Indian users, we ensure that personal data and state information are stored in
                data centers located within India, unless you explicitly consent to international
                transfers or such transfers are necessary for service delivery.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Persistent State Management</h3>
              <p>
                SLC's durable objects maintain persistent state between function invocations. This
                state data is stored securely and is accessible only to your functions and authorized
                SLC infrastructure. We implement encryption at rest and in transit to protect your
                state data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party service providers who
                  assist in operating our platform (e.g., cloud infrastructure, payment processors)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, court order, or government
                  regulation
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale
                  of assets
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you have provided explicit consent for
                  sharing
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your information,
                including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Network security and intrusion detection systems</li>
                <li>Secure coding practices and infrastructure hardening</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet or electronic storage is 100%
                secure. While we strive to use commercially acceptable means to protect your data,
                we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services
                and fulfill the purposes outlined in this policy, unless a longer retention period is
                required by law.
              </p>
              <p>
                Persistent state data in durable objects is retained until you delete it or close
                your account. You can delete state data at any time through our API or dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Your Rights (India DPDP Act)</h2>
              <p>Under India's Digital Personal Data Protection Act, 2023, you have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Right to Access:</strong> Request access to your personal data we hold
                </li>
                <li>
                  <strong>Right to Correction:</strong> Request correction of inaccurate or incomplete
                  data
                </li>
                <li>
                  <strong>Right to Erasure:</strong> Request deletion of your personal data
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Receive your data in a structured,
                  machine-readable format
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at
                  any time
                </li>
                <li>
                  <strong>Right to Grievance Redressal:</strong> File complaints with us or the Data
                  Protection Board
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@slc.run" className="text-white underline">
                  privacy@slc.run
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Data Breach Notification</h2>
              <p>
                In the event of a data breach that may affect your personal information, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notify affected users promptly, within 72 hours where feasible</li>
                <li>Report the breach to relevant authorities as required by law</li>
                <li>Provide details about the nature of the breach and steps taken to address it</li>
                <li>Offer guidance on protective measures you can take</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. International Data Transfers</h2>
              <p>
                For users outside India, your data may be transferred to and processed in countries
                other than your country of residence. We ensure appropriate safeguards are in place,
                including standard contractual clauses and adherence to recognized data protection
                frameworks.
              </p>
              <p>
                For Indian users, we prioritize data localization and will only transfer data
                internationally with your explicit consent or when necessary for service delivery,
                subject to appropriate safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Children's Privacy</h2>
              <p>
                SLC is not intended for users under the age of 18. We do not knowingly collect
                personal information from children. If you believe we have collected information
                from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes by posting the new policy on this page and updating the "Last
                updated" date. Your continued use of SLC after such changes constitutes acceptance
                of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please
                contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Slick Enterprises LLP</strong>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:privacy@slc.run" className="text-white underline">
                    privacy@slc.run
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a href="https://slc.run" className="text-white underline">
                    https://slc.run
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="relative px-6 sm:px-10 py-10 border-t border-white/5 text-sm text-zinc-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span>© Slick Enterprises LLP — Backend logic that remembers</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

