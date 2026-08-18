"use client";

import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartItem } from "@/lib/cart-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderCheckout } from "../actions/products";
import { toast } from "sonner";
import Footer from "../componensts/footer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDownIcon } from "lucide-react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  contact: z.string().regex(/^\d{11}$/, "Contact must be exactly 11 digits"),
  Name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  email: z.string().optional(),
});

export default function CheckoutPage() {
  const [open, setOpen] = React.useState(false);
  const [value, setValues] = React.useState("");
  const pakistanCities = [
    "Islamabad",
    "Abbottabad",
    "Adilpur",
    "Ahmedpur East",
    "Akora",
    "Aliabad",
    "Alipur",
    "Arifwala",
    "Astor",
    "Attock",
    "Awaran",
    "Badin",
    "Bagh",
    "Bahawalnagar",
    "Bahawalpur",
    "Balakot",
    "Bannu",
    "Barbar Loi",
    "Barkan",
    "Basirpur",
    "Bat Khela",
    "Battagram",
    "Bhakkar",
    "Bhalwal",
    "Bhan",
    "Bhimber",
    "Bhopalwala",
    "Bhurban",
    "Burewala",
    "Chaghi",
    "Chaman",
    "Charsadda",
    "Chhatr",
    "Chichawatni",
    "Chiniot",
    "Chishtian",
    "Chowk Azam",
    "Chowk Sarwar Shaheed",
    "Dadu",
    "Dargai",
    "Darya Khan",
    "Daska",
    "Daud Khel",
    "Daulatpur",
    "Dera Ghazi Khan",
    "Dera Ismail Khan",
    "Dera Murad Jamali",
    "Dera Allah Yar",
    "Dharki",
    "Dhaular",
    "Digri",
    "Dina",
    "Dinga",
    "Dipalpur",
    "Diplo",
    "Dir",
    "Dokri",
    "Duki",
    "Dullewala",
    "Dunyapur",
    "Eminabad",
    "Faisalabad",
    "Faqirwali",
    "Farooka",
    "Fateh Jang",
    "Gadani",
    "Gajar",
    "Gambat",
    "Garh Maharaja",
    "Garhi Khairo",
    "Garhi Yasin",
    "Gharo",
    "Ghazluna",
    "Ghotki",
    "Gilgit",
    "Goharghati",
    "Gojra",
    "Gujarkhan",
    "Gujranwala",
    "Gujrat",
    "Gwadar",
    "Hadali",
    "Hala",
    "Hangu",
    "Harappa",
    "Haripur",
    "Harnai",
    "Haroonabad",
    "Hasilpur",
    "Hassan Abdal",
    "Havali",
    "Haveli Lakha",
    "Hub",
    "Hujra",
    "Hunza",
    "Hyderabad",
    "Isa Khel",
    "Islamkot",
    "Jacobabad",
    "Jahanian",
    "Jalalpur Jattan",
    "Jalalpur Pirwala",
    "Jampur",
    "Jamrud",
    "Jamshoro",
    "Jand",
    "Jaranwala",
    "Jatoi",
    "Jauharabad",
    "Jhang",
    "Jhatpat",
    "Jhelum",
    "Jhudo",
    "Kabirwala",
    "Kaghan",
    "Kahror Pakka",
    "Kahuta",
    "Kakul",
    "Kalabagh",
    "Kalat",
    "Kamalia",
    "Kamar Mashani",
    "Kamoke",
    "Kamra",
    "Kandhkot",
    "Kandiaro",
    "Kanpur",
    "Karachi",
    "Karak",
    "Kario",
    "Karor Lal Esan",
    "Kashmor",
    "Kasur",
    "Keti Bandar",
    "Khairpur",
    "Khairpur Nathan Shah",
    "Khanewal",
    "Khanpur",
    "Kharan",
    "Kharian",
    "Khewra",
    "Khurrianwala",
    "Khushab",
    "Khuzdar",
    "Khyber",
    "Kohat",
    "Kot Addu",
    "Kot Diji",
    "Kot Ghulam Muhammad",
    "Kot Mumin",
    "Kot Radha Kishan",
    "Kot Samaba",
    "Kotli",
    "Kotri",
    "Kurram",
    "Lahore",
    "Laki Marwat",
    "Laliah",
    "Larkana",
    "Lasbela",
    "Layyah",
    "Liaquatpur",
    "Lodhran",
    "Loralai",
    "Lower Dir",
    "Mach",
    "Mailsi",
    "Makli",
    "Malakand",
    "Mandi Bahauddin",
    "Mangla",
    "Mansehra",
    "Mardan",
    "Mastung",
    "Matiari",
    "Mehar",
    "Mian Channu",
    "Mianwali",
    "Minawala",
    "Mirpur",
    "Mirpur Khas",
    "Mirpur Sakro",
    "Mithankot",
    "Mithi",
    "Mohmand",
    "More",
    "Multan",
    "Muridke",
    "Murree",
    "Musa Khel",
    "Mustung",
    "Muzaffarabad",
    "Muzaffargarh",
    "Nagar",
    "Nagar Parkar",
    "Nankana Sahib",
    "Narang",
    "Narowal",
    "Nasirabad",
    "Nawabshah",
    "New Saeedabad",
    "Naushahro Feroze",
    "Naushera",
    "Nowshera",
    "Okara",
    "Ormara",
    "Pabbi",
    "Padidan",
    "Pakpattan",
    "Panjgur",
    "Pasni",
    "Peshawar",
    "Phalia",
    "Pind Dadan Khan",
    "Pindi Bhattian",
    "Pindi Gheb",
    "Pir Mahal",
    "Pishin",
    "Qila Abdullah",
    "Qila Didar Singh",
    "Qila Saifullah",
    "Quetta",
    "Rabwah",
    "Rahim Yar Khan",
    "Raiwind",
    "Rajanpur",
    "Ranipur",
    "Ratodero",
    "Rawalakot",
    "Rawalpindi",
    "Renala Khurd",
    "Risalpur",
    "Rohri",
    "Sadiqabad",
    "Safdarabad",
    "Sahiwal",
    "Sahuwala",
    "Saidu Sharif",
    "Sajawal",
    "Sakardu",
    "Sambrial",
    "Sanghar",
    "Sangla Hill",
    "Sanjwal",
    "Sarai Alamgir",
    "Sargodha",
    "Sehwan",
    "SEW",
    "Shabqadar",
    "Shahdadkot",
    "Shahdadpur",
    "Shahkot",
    "Shahr Sultan",
    "Shakarparian",
    "Shakargarh",
    "Shangla",
    "Sharqpur",
    "Shekhupura",
    "Shikarpur",
    "Shorkot",
    "Shujaabad",
    "Sialkot",
    "Sibi",
    "Sihala",
    "Skardu",
    "Sodhra",
    "Soianwala",
    "Sohawa",
    "Sohbatpur",
    "Sonmiani",
    "Swabi",
    "Swat",
    "Tando Adam",
    "Tando Allahyar",
    "Tando Jam",
    "Tando Muhammad Khan",
    "Tangi",
    "Tank",
    "Taunsa",
    "Taxila",
    "Tharparkar",
    "Thatta",
    "Toba Tek Singh",
    "Topi",
    "Toru",
    "Tranda Murad Khan",
    "Turbat",
    "Ubaro",
    "Umarkot",
    "Upper Dir",
    "Uthal",
    "Vihari",
    "Wadh",
    "Wah",
    "Wana",
    "Warah",
    "Wazirabad",
    "Yazman",
    "Zafarwal",
    "Zahir Pir",
    "Zhob",
    "Ziarat",
  ];
  const queryClient = useQueryClient();
  const router = useRouter();
  const { carts } = useContext(CartItem);
  const total = carts?.reduce((acc, item) => {
    return acc + item?.Sellprice * item?.quantity;
  }, 0);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const mutation = useMutation({
    mutationFn: orderCheckout,
    onSuccess: (data) => {
      toast.success("Order place successfully");
      queryClient.invalidateQueries("AdminData");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries("notify");
      router.push("/confirmation");
      reset();
      carts.length = 0;
    },
    onError: (error) => {
      toast.error(`Order failed ${error.message}`);
    },
  });

  function generateAlphabetID(length = 6) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < length; i++) {
      id += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return id;
  }

  const onSubmit = (data) => {
    const items = carts.map((item) => ({
      productId: String(item._id),
      quantity: item.quantity,
      selectedVariant: item.selectedVariant || null,
    }));
    const Id = generateAlphabetID();
    const payload = {
      items,
      totalAmount: total,
      orderId: Id,
      user: data,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight">Checkout</h1>
          <p className="mt-2 text-sm md:text-base text-gray-500">Complete your order securely.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
        >
          {/* Left Section - Form */}
          <div className="w-full lg:w-[55%] space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-100">Contact & Shipping</h2>

              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      WhatsApp Number / Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="w-full h-12 text-base transition-colors focus:ring-2 focus:ring-black border-gray-300"
                      placeholder="03XXXXXXXXX"
                      {...register("contact")}
                    />
                    {errors.contact && (
                      <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                    )}
                  </div>
                  <div className="w-full space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <Input
                      className="w-full h-12 text-base transition-colors focus:ring-2 focus:ring-black border-gray-300"
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-full space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="w-full h-12 text-base transition-colors focus:ring-2 focus:ring-black border-gray-300"
                      placeholder="Enter your full name"
                      {...register("Name")}
                    />
                    {errors.Name && (
                      <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>
                    )}
                  </div>
                  <div className="w-full space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full h-12 justify-between text-base font-normal border-gray-300 hover:bg-gray-50",
                            !value && "text-gray-500",
                            errors.city && "border-red-500 focus:ring-red-500"
                          )}
                        >
                          {value || "Select your city..."}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search city..." className="h-11" />
                          <CommandList className="max-h-[250px] overflow-y-auto">
                            <CommandEmpty>No city found.</CommandEmpty>
                            <CommandGroup>
                              {pakistanCities.map((city, idx) => (
                                <CommandItem
                                  key={idx}
                                  value={city}
                                  onSelect={(currentValue) => {
                                    setValue("city", currentValue);
                                    setValues?.(currentValue);
                                    setOpen(false);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === city ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {city}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Complete Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-3 text-base transition-colors focus:ring-2 focus:ring-black focus:outline-none resize-none"
                    placeholder="House / Flat No., Street, Block, Area"
                    rows={3}
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium text-gray-900 mb-4 pb-4 border-b border-gray-100">Payment</h2>
              <div className="relative border-2 border-black bg-gray-50 p-4 sm:p-5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full border-[5px] border-black bg-white"></div>
                  <span className="font-medium text-gray-900 text-base">Cash on Delivery (COD)</span>
                </div>
                <span className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-md tracking-wide">Free</span>
              </div>
            </div>

            {/* Submit Button & Reassurance */}
            <div className="space-y-4 pt-2">
              {carts.length === 0 ? (
                <Button
                  type="button"
                  onClick={() => router.push("/")}
                  className="w-full h-14 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-xl transition-all"
                >
                  Return to Shop
                </Button>
              ) : (
                <Button
                  disabled={mutation.isPending}
                  type="submit"
                  className="w-full h-14 bg-black hover:bg-gray-800 text-white text-lg font-medium rounded-xl shadow-md transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">{mutation.isPending ? "Processing..." : "Complete Order"}</span>
                </Button>
              )}
              <p className="text-center text-sm font-medium text-gray-700 flex items-center justify-center gap-2 bg-green-50 py-3 rounded-lg border border-green-100">
                <span>🛡️</span> Open your parcel and check your watch before payment.
              </p>
            </div>
          </div>

          {/* Right Section - Order Summary & Trust Indicators */}
          <div className="w-full lg:w-[45%] order-1 lg:order-2">
            <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-8">
              <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h2>

              {carts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-gray-50 rounded-full p-6 mb-4">
                    <img src="/empty-cart.png" alt="Empty Cart" className="w-16 h-16 opacity-50 object-contain" />
                  </div>
                  <p className="text-gray-500">Your cart is empty.</p>
                </div>
              ) : (
                <>
                  <ScrollArea className="max-h-[320px] pr-3 -mr-3 mb-6">
                    <div className="space-y-4 pr-1">
                      {carts.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                          <div className="relative shrink-0">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center">
                              <img src={item?.images[0]} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-grow min-w-0 pt-1">
                            <p className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 leading-snug mb-1.5">{item.name}</p>
                            {item.selectedVariant && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {item.selectedVariant}
                              </span>
                            )}
                          </div>
                          <div className="text-right shrink-0 pt-1">
                            <p className="text-sm sm:text-base font-semibold text-gray-900">
                              Rs. {(item.Sellprice * item.quantity).toLocaleString("en-PK")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="space-y-3 pt-5 border-t border-gray-100">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">Rs. {total.toLocaleString("en-PK")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-medium tracking-wide">Free</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">
                        Rs. {total.toLocaleString("en-PK")} <span className="text-sm font-normal text-gray-500">PKR</span>
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-50 text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Free Delivery Pakistan</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Open Parcel & Check</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-purple-50 text-purple-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">7-Day Replacement</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">Cash on Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
