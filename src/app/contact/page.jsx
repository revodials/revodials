"use client";

import { useForm} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "../componensts/navbar";
import { contactUsEmailSender } from "../actions/send-email";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data) => {
    const res = await contactUsEmailSender(data.email, data.name, data.message);
    if (res.success == true) {
      toast.success("Message sent successfully!");
      reset();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              Contact Zalvox Watches
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              We're here to help! Reach out with your questions, comments, or
              feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  📞 Get In Touch
                </h2>
                <p className="text-gray-600 text-sm">
                  Email: info.zalvox@gmail.com
                </p>
             
                <p className="text-gray-600 text-sm mt-2">
                  Phone: +92-282183869
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  WhatsApp: +92 343 0088 330 / +92 318 6336 477
                </p>
                <p className="text-gray-600 text-sm mt-4">
                  Support Hours: Mon–Sat, 10am–8pm (PKT)
                </p>
                <p className="text-gray-600 text-sm">Sunday: Closed</p>
              </div>

              <div className="bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  🔗 Follow Us
                </h2>
                <p className="text-gray-600 text-sm">
                  Instagram:{" "}
                  <a
                    href="https://www.instagram.com/zalvoxwatches?igsh=MTEyM3VqY3V6dHNiNQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @ZalvoxWatches
                  </a>
                </p>
                <p className="text-gray-600 text-sm">
                  Facebook:{" "}
                  <a
                    href="https://www.facebook.com/people/Zalvox/61576137486304/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @Zalvox Watches
                  </a>
                </p>
              </div>
            </div>

            <Card className="shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  📬 Contact Form
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <Input {...register("name")} placeholder="John Doe" />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <Textarea
                      {...register("message")}
                      placeholder="Write your message here..."
                      className="h-[20vh]"
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-gray-800"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
