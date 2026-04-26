import Footer from "../componensts/footer";
import Navbar from "../componensts/navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold">www.Revodials.store</span>, we value
            your trust and are committed to protecting your privacy. This policy
            explains how we collect, use, and safeguard your personal
            information when you shop with us.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal details like name, phone number, email, and address when you place an order.</li>
              <li>Payment details required to process your transactions securely.</li>
              <li>Website usage data, such as pages visited and products viewed, for better user experience.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and deliver your orders.</li>
              <li>To provide customer support and resolve issues.</li>
              <li>To send order updates, promotions, and offers (with your consent).</li>
              <li>To improve our website and product selection based on your feedback.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">3. Data Protection & Security</h2>
            <p>
              All transactions on our website are encrypted and processed through
              secure payment gateways. We do not store your credit/debit card
              details. Reasonable security measures are taken to prevent
              unauthorized access to your personal data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">4. Sharing of Information</h2>
            <p>
              We do <span className="font-semibold">not</span> sell, trade, or
              rent your personal information to third parties. Your details may
              only be shared with trusted logistics and payment partners to
              complete your order.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
            <p>
              Our website uses cookies to improve your browsing experience. You
              may disable cookies in your browser, but some features may not work
              properly without them.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Request access to the data we hold about you.</li>
              <li>Request corrections to inaccurate or outdated information.</li>
              <li>Opt out of promotional emails anytime.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how your
              data is handled, please contact us at:
            </p>
            <p className="mt-2 font-medium">
              Email: info.Revodials@gmail.com <br />
              Website: www.Revodials.store
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
