import Image from "next/image";

const PaymentIcons = () => {
  const paymentMethods = [
    { src: "/paymentsicons/credit.png", alt: "Credit" },
    { src: "/paymentsicons/visa.png", alt: "Visa" },
    { src: "/paymentsicons/mastercard.png", alt: "MasterCard" },
    { src: "/paymentsicons/paypal.png", alt: "PayPal" },
    { src: "/paymentsicons/apple.png", alt: "Apple Pay" },
    { src: "/paymentsicons/google.png", alt: "Google Pay" },
  ];

  return (
    <div className="flex gap-2 justify-center  md:gap-3 flex-wrap items-center mt-2">
      {paymentMethods.map(({ src, alt }) => (
        <div key={alt} className="p-1 rounded bg-white">
          <Image src={src} alt={alt} width={30} height={25} />
        </div>
      ))}
    </div>
  );
};

export default PaymentIcons;
