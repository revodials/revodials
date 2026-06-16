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
    <>
      <div className="min-h-screen w-full flex justify-center p-4 lg:p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-[80%] bg-white shadow-md rounded-lg p-2 lg:p-6 flex flex-col lg:flex-row-reverse gap-10"
        >
          {/* left Section - Order Summary */}
          {carts.length === 0 ? (
            <div className="w-full h-fit lg:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-md text-center shadow-inner border border-dashed border-gray-300">
              <img
                src="/empty-cart.png"
                alt="Empty Cart"
                className="w-32 h-32 object-contain mb-4 opacity-70"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-4">
                Looks like you haven’t added any watches yet.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="bg-blue-600 text-white hover:bg-blue-700 transition rounded-full px-6 py-2 text-sm"
              >
                Shop Now
              </Button>
            </div>
          ) : (
            <div className="w-full lg:w-1/2 bg-gray-50 p-3 rounded-md lg:sticky lg:top-6 h-fit">
              <h1 className="text-xl font-medium mb-2">Order Summary</h1>
              <ScrollArea className={"h-[30vh] w-full  rounded-md border p-2 "}>
                {carts.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-4">
                    <div className="relative">
                      <img
                        src={item?.images[0]}
                        alt="Product"
                        className="w-14 h-14 object-cover mr-4 rounded-full"
                      />
                      {item.quantity && (
                        <span className="absolute top-1 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Rs.
                        {Number(item.Sellprice * item.quantity).toLocaleString(
                          "en-PK"
                        )}
                        .00 PKR
                      </p>
                      {item.selectedVariant && (
                        <div
                          className={`h-fit py-1 px-3 cursor-pointer 
                          bg-black text-white rounded-full w-fit border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200`}
                        >
                          <h4 className="font-semibold text-xs">
                            {item.selectedVariant}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <div className="p-1">
                <div className="flex justify-between font-semibold text-lg mt-2">
                  <p>Total</p>
                  <p className="font-semibold">
                    Rs.{Number(total).toLocaleString("en-PK")}.00 PKR
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* right Section - Form */}
          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-6">
            {/* Contact */}
            <h1 className="text-xl font-medium mb-4">Fill out the form</h1>

            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="lg:w-1/2 w-full space-y-1">
                <label className="text-sm font-medium mb-1 block">
                  Email address (optional)
                </label>
                <Input
                  className="w-full"
                  placeholder="Email address"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="lg:w-1/2 w-full space-y-1">
                <label className="text-sm font-medium mb-1 block">
                  Phone number
                </label>
                <Input
                  className="w-full"
                  placeholder="Eg: 0321XXXXXXX"
                  {...register("contact")}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm">
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col lg:flex-row lg:items-end gap-6 w-full">
              <div className="w-full space-y-1">
                <label className="text-sm font-medium mb-1 block">Name</label>
                <Input
                  className="w-full"
                  placeholder="Name"
                  {...register("Name")}
                />
                {errors.Name && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              {/* City Dropdown */}
              <div className="w-full space-y-2">
                <label htmlFor="city" className="text-sm font-medium block">
                  City
                </label>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-full justify-between",
                        errors.city && "border-red-500"
                      )}
                    >
                      {value || "Select city..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 overflow-visible">
                    <Command>
                      <CommandInput placeholder="Search city..." />
                      <CommandList className="max-h-60 overflow-y-auto w-full">
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                          {pakistanCities.map((city, idx) => (
                            <CommandItem
                              className="w-full"
                              key={idx}
                              value={city}
                              onSelect={(currentValue) => {
                                setValue("city", currentValue); // correct form key
                                setValues?.(currentValue);
                                setOpen(false);
                              }}
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
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-sm font-medium mb-1 block">
                Complete Address
              </label>

              <textarea
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Eg: House No., Block, Area"
                rows={5}
                {...register("address")}
              />

              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
            {/* Payment */}
            <div>
              <h3 className="font-semibold mb-1">Payment Mode:</h3>
              <div className="relative ">
                <div className="border border-blue-300 bg-blue-50 p-3 rounded">
                  Cash on Delivery (COD)
                </div>

                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
                  Free Delivery
                </div>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-6">
                <p>Total</p>
                <p className="font-semibold text-xl">
                  Rs.{Number(total).toLocaleString("en-PK")}.00 PKR
                </p>
              </div>
            </div>
            {carts.length === 0 ? (
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base rounded py-3"
              >
                Cart is empty
              </Button>
            ) : (
              <Button
                disabled={mutation.isPending}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base rounded py-3"
              >
                {mutation.isPending ? "Placing order..." : "Complete order"}
              </Button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
