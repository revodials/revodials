import Footer from "../componensts/footer";
import Navbar from "../componensts/navbar";

export default function Page() {
  const policies = [
    {
      title: "Refund Policy",
      content: [
        "If you are not satisfied with your order or dislike the parcel, you can return it under our refund policy. The customer will pay the return shipping charges, and once we receive the parcel in good condition, the refund amount will be processed.",
        "If the parcel has any defect, wrong item received from our side after delivery, we will refund the order amount.",
        "Refund requests must be made within 7 days of receiving the product.",
        "Customer must send the product back to our address before the refund is processed.",
        "Returned items must be unused, undamaged, and in original packaging.",
        "Refund will be processed within 1–2 business days after inspection.",
      ],
    },
    {
      title: "Exchange Policy",
      content: [
        "We accept exchanges for wrong model, size delivered, or defective products covered under warranty.",
        "Exchange requests must be made within 7 days of receiving the product.",
        "Shipping charges for exchanges are covered by the customer unless the error is ours.",
      ],
    },
    {
      title: "Shipping Policy",
      content: [
        "Orders are processed within 24–48 hours.",
        "Delivery within 2–3 working days in major cities and 4–5 days in remote areas.",
        "Orders above Rs. 5,000 require advance payment before shipping.",
      ],
    },
    {
      title: "Cancellation Policy",
      content: [
        "Orders can be canceled before dispatch.",
        "Once shipped, cancellation is not possible, but refund or exchange can be requested according to our policy.",
      ],
    },
    {
      title: "Privacy Policy",
      content: [
        "Personal information is used only to process orders and improve service.",
        "We do not share or sell customer data to third parties.",
        "All transactions are encrypted and secure.",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Our Refund Policies
        </h1>
        <div className="space-y-8">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {policy.title}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {policy.content.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-sm text-gray-500 mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
