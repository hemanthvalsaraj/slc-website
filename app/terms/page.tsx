import Link from "next/link";

export const dynamic = "force-static";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-400 mb-12">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-invert max-w-none space-y-8 text-zinc-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you
                ("Customer," "you," or "your") and Slick Enterprises LLP ("Slick," "we," "us," or
                "our") governing your use of SLC, our stateful serverless computing platform
                ("Service").
              </p>
              <p>
                By accessing or using SLC, you agree to be bound by these Terms. If you do not agree
                to these Terms, you may not use the Service. These Terms apply to all users,
                including those who access SLC on behalf of an organization.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p>
                SLC is a stateful serverless computing platform that enables you to deploy and run
                persistent functions with durable state. The Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Persistent Functions:</strong> Serverless functions that maintain state
                  between invocations
                </li>
                <li>
                  <strong>Durable Objects:</strong> Stateful objects that persist data and remain
                  alive across function calls
                </li>
                <li>
                  <strong>State Management:</strong> Automatic persistence and recall of function
                  state
                </li>
                <li>
                  <strong>Deployment Infrastructure:</strong> Serverless infrastructure for hosting
                  and executing your functions
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Account Registration and Security</h2>
              <p>To use SLC, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create an account and provide accurate, current, and complete information</li>
                <li>Maintain and update your account information as necessary</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized access or security breaches</li>
              </ul>
              <p className="mt-4">
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Acceptable Use</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.1 Permitted Use</h3>
              <p>You may use SLC solely for lawful purposes and in accordance with these Terms.</p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Prohibited Activities</h3>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Use the Service to transmit malicious code, viruses, or harmful software</li>
                <li>Attempt to gain unauthorized access to SLC or other users' accounts</li>
                <li>Interfere with or disrupt the integrity or performance of the Service</li>
                <li>Use the Service to process, store, or transmit illegal content</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Use automated systems to access the Service without authorization</li>
                <li>Resell or sublicense the Service without our written consent</li>
                <li>Use the Service in a manner that could damage, disable, or impair our infrastructure</li>
                <li>Collect or harvest information about other users without their consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Durable Objects and Persistent State</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.1 State Persistence</h3>
              <p>
                SLC provides durable objects that maintain persistent state between function
                invocations. You acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>State data is stored securely but may be subject to our data retention policies</li>
                <li>You are responsible for managing and backing up your state data</li>
                <li>We reserve the right to implement limits on state storage and retention</li>
                <li>State data may be subject to jurisdictional restrictions based on your configuration</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.2 Data Location and Jurisdictional Restrictions</h3>
              <p>
                For compliance with data localization requirements (including India's DPDP Act), you
                may configure durable object namespaces to restrict data storage to specific
                jurisdictions. When configured, all state data within that namespace will be stored
                and processed within the specified region.
              </p>
              <p>
                You are responsible for ensuring that your use of jurisdictional restrictions complies
                with applicable laws and regulations.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.3 State Data Ownership</h3>
              <p>
                You retain ownership of all state data and content stored in durable objects. We act
                as a data processor and will not access, use, or disclose your state data except as
                necessary to provide the Service or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.1 Your Content</h3>
              <p>
                You retain all rights, title, and interest in and to your application code, function
                logic, and state data ("Customer Content"). By using SLC, you grant us a
                non-exclusive, worldwide, royalty-free license to use, store, and process your
                Customer Content solely for the purpose of providing the Service.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.2 Our Intellectual Property</h3>
              <p>
                The Service, including its design, functionality, and underlying technology, is owned
                by Slick Enterprises LLP and protected by intellectual property laws. You may not
                copy, modify, distribute, or create derivative works based on the Service without
                our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Payment and Billing</h2>
              <p>If you subscribe to a paid plan:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You agree to pay all fees associated with your subscription</li>
                <li>Fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We reserve the right to change our pricing with 30 days' notice</li>
                <li>Failure to pay may result in suspension or termination of your account</li>
                <li>You are responsible for any taxes applicable to your use of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Service Availability and Modifications</h2>
              <p>
                We strive to provide reliable service but do not guarantee uninterrupted or
                error-free operation. We may:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Perform scheduled maintenance that may temporarily interrupt service</li>
                <li>Modify, suspend, or discontinue features of the Service</li>
                <li>Implement usage limits or throttling to ensure fair use</li>
                <li>Update the Service with new features or improvements</li>
              </ul>
              <p className="mt-4">
                We will provide reasonable notice of material changes that may affect your use of the
                Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Service Level Agreement</h2>
              <p>
                While we aim for high availability, we do not guarantee specific uptime percentages
                unless explicitly stated in a separate Service Level Agreement (SLA). We will make
                commercially reasonable efforts to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain service availability and reliability</li>
                <li>Respond promptly to service issues and outages</li>
                <li>Provide status updates during incidents</li>
                <li>Implement redundancy and failover mechanisms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Data Processing and Privacy</h2>
              <p>
                Your use of SLC is also governed by our Privacy Policy, which explains how we
                collect, use, and protect your information. By using the Service, you consent to our
                data practices as described in the Privacy Policy.
              </p>
              <p>
                As a data processor, we process your Customer Content on your behalf. You are
                responsible for ensuring that your use of the Service complies with applicable data
                protection laws, including obtaining necessary consents and providing required
                notices to end users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Slick Enterprises LLP, its
                officers, directors, employees, and agents from and against any claims, damages,
                losses, liabilities, and expenses (including legal fees) arising out of:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of the Service in violation of these Terms</li>
                <li>Your violation of any applicable laws or regulations</li>
                <li>Your infringement of any third-party rights</li>
                <li>Your Customer Content or any content you transmit through the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SLICK ENTERPRISES LLP SHALL NOT BE LIABLE
                FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                INCLUDING LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF
                THE SERVICE.
              </p>
              <p>
                Our total liability for any claims arising out of or related to these Terms or the
                Service shall not exceed the amount you paid to us in the twelve (12) months
                preceding the claim.
              </p>
              <p>
                Some jurisdictions do not allow the exclusion or limitation of certain damages, so some
                of the above limitations may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Termination</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">13.1 Termination by You</h3>
              <p>
                You may terminate your account at any time by contacting us or using account
                deletion features in the Service.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">13.2 Termination by Us</h3>
              <p>We may suspend or terminate your access to the Service if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You violate these Terms or our Acceptable Use Policy</li>
                <li>You fail to pay applicable fees</li>
                <li>You engage in fraudulent or illegal activity</li>
                <li>We are required to do so by law</li>
                <li>We discontinue the Service</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">13.3 Effect of Termination</h3>
              <p>
                Upon termination, your right to use the Service will immediately cease. We may
                delete your account, Customer Content, and state data after a reasonable retention
                period. You are responsible for exporting your data before termination.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Governing Law and Dispute Resolution</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India,
                without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising out of or relating to these Terms or the Service shall be
                resolved through good faith negotiation. If negotiation fails, disputes shall be
                subject to the exclusive jurisdiction of the courts in [City, State], India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">15. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of
                material changes by posting the updated Terms on this page and updating the "Last
                updated" date. Your continued use of the Service after such changes constitutes
                acceptance of the updated Terms.
              </p>
              <p>
                If you do not agree to the modified Terms, you must stop using the Service and may
                terminate your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">16. General Provisions</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3 mt-6">16.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement
                between you and Slick Enterprises LLP regarding the Service.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">16.2 Severability</h3>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining
                provisions will remain in full force and effect.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">16.3 Waiver</h3>
              <p>
                Our failure to enforce any right or provision of these Terms shall not constitute a
                waiver of such right or provision.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">16.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms without our prior written consent. We may
                assign these Terms in connection with a merger, acquisition, or sale of assets.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">17. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Slick Enterprises LLP</strong>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:legal@slc.run" className="text-white underline">
                    legal@slc.run
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

