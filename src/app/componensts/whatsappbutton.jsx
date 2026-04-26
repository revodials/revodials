"use client";
import React, { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { toast } from "sonner";
function Whatsappbutton() {
  const [count, setCount] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setCount(true);
        toast("Need Help? We're Here for You!", {
          description: "Hey there! How can I assist you today? 😊",
          action: {
            label: "Undo",
          },
        });
      } catch (error) {
        console.log("TCL: timer -> error", error);
      }
    }, 15000);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const sendToWhatsApp = () => {
    const phoneNumber = "923196582699";
    const message = encodeURIComponent("Hello, I want to take information about your products.");
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    if (window.innerWidth < 768) {
      window.location.href = url; 
    } else {
      window.open(url, "_blank");
    }
  };
  return (
    <div className="fixed bottom-8 z-[100] right-6 lg:right-10 transition transform active:scale-95 group" onClick={sendToWhatsApp}>
      {/* Pulsing ring background */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none"></div>
      
      <div className="relative bg-white p-2 z-10 rounded-full shadow-2xl border border-gray-100 cursor-pointer flex items-center justify-center hover:scale-110 transition-transform duration-300">
        <IoLogoWhatsapp color="#25D366" size={55} />
        {count && (
          <div className="absolute top-0 right-0 bg-red-600 border-2 border-white h-6 w-6 rounded-full flex justify-center items-center shadow-md animate-bounce">
            <p className="text-white text-xs font-bold">1</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Whatsappbutton;
