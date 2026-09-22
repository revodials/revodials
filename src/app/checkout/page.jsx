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
    "Lahore — لاہور",
    "Islamabad — اسلام آباد",
    "Karachi — کراچی",
    "Rawalpindi — راولپنڈی",
    "Sialkot — سیالکوٹ",
    "Faisalabad — فیصل آباد",
    "Multan — ملتان",
    "Hyderabad — حیدرآباد",
    "Sukkur — سکھر",
    "Abbottabad — ایبٹ آباد",
    "Bahawalpur — بہاولپور",
    "Peshawar — پشاور",
    "Quetta — کوئٹہ",
    "Mardan — مردان",
    "Jhelum — جہلم",
    "Sargodha — سرگودھا",
    "Mirpur Khas — میرپور خاص",
    "Larkana — لاڑکانہ",
    "Mianwali — میانوالی",
    "Shekhupura — شیخوپورہ",
    "Khuzdar — خضدار",
    "Kasur — قصور",
    "Mingora — مینگورہ",
    "Adilpur — عادل پور",
    "Ahmedpur East — احمدپور ایسٹ",
    "Akora — اکوڑہ",
    "Aliabad — علی آباد",
    "Alipur — علی پور",
    "Arifwala — عارف والا",
    "Astor — استور",
    "Attock — اٹک",
    "Awaran — آواران",
    "Badin — بدین",
    "Bagh — باغ",
    "Bahawalnagar — بہاولنگر",
    "Balakot — بالاکوٹ",
    "Bannu — بنوں",
    "Barbar Loi — بربر لوئی",
    "Barkan — بارکھان",
    "Basirpur — بصیرپور",
    "Bat Khela — بٹ خیلہ",
    "Battagram — بٹگرام",
    "Bhakkar — بھکر",
    "Bhalwal — بھلوال",
    "Bhan — بھان",
    "Bhimber — بھمبر",
    "Bhopalwala — بھوپال والا",
    "Bhurban — بھوربن",
    "Burewala — بورے والا",
    "Chaghi — چاغی",
    "Chaman — چمن",
    "Charsadda — چارسدہ",
    "Chhatr — چھتر",
    "Chichawatni — چیچہ وطنی",
    "Chiniot — چنیوٹ",
    "Chishtian — چشتیاں",
    "Chowk Azam — چوک اعظم",
    "Chowk Sarwar Shaheed — چوک سرور شہید",
    "Dadu — دادو",
    "Dargai — درگئی",
    "Darya Khan — دریا خان",
    "Daska — ڈسکہ",
    "Daud Khel — داؤد خیل",
    "Daulatpur — دولت پور",
    "Dera Ghazi Khan — ڈیرہ غازی خان",
    "Dera Ismail Khan — ڈیرہ اسماعیل خان",
    "Dera Murad Jamali — ڈیرہ مراد جمالی",
    "Dera Allah Yar — ڈیرہ اللہ یار",
    "Dharki — ڈہرکی",
    "Dhaular — دھولر",
    "Digri — ڈگری",
    "Dina — دینہ",
    "Dinga — ڈنگہ",
    "Dipalpur — دیپالپور",
    "Diplo — ڈپلو",
    "Dir — دیر",
    "Dokri — ڈوکری",
    "Duki — دکی",
    "Dullewala — ڈلے والا",
    "Dunyapur — دنیاپور",
    "Eminabad — ایمن آباد",
    "Faqirwali — فقیروالی",
    "Farooka — فروکہ",
    "Fateh Jang — فتح جنگ",
    "Gadani — گڈانی",
    "Gajar — گاجر",
    "Gambat — گمبٹ",
    "Garh Maharaja — گڑھ مہاراجہ",
    "Garhi Khairo — گڑھی خیرو",
    "Garhi Yasin — گڑھی یاسین",
    "Gharo — گھارو",
    "Ghazluna — غزلونا",
    "Ghotki — گھوٹکی",
    "Gilgit — گلگت",
    "Goharghati — گوہر گھٹی",
    "Gojra — گوجرہ",
    "Gujarkhan — گوجر خان",
    "Gujranwala — گوجرانوالہ",
    "Gujrat — گجرات",
    "Gwadar — گوادر",
    "Hadali — ہڈالی",
    "Hala — ہالا",
    "Hangu — ہنگو",
    "Harappa — ہڑپہ",
    "Haripur — ہری پور",
    "Harnai — ہرنائی",
    "Haroonabad — ہارون آباد",
    "Hasilpur — حاصل پور",
    "Hassan Abdal — حسن ابدال",
    "Havali — حویلی",
    "Haveli Lakha — حویلی لکھا",
    "Hub — حب",
    "Hujra — حجرہ",
    "Hunza — ہنزہ",
    "Isa Khel — عیسیٰ خیل",
    "Islamkot — اسلام کوٹ",
    "Jacobabad — جیکب آباد",
    "Jahanian — جہانیاں",
    "Jalalpur Jattan — جلالپور جٹاں",
    "Jalalpur Pirwala — جلالپور پیر والا",
    "Jampur — جام پور",
    "Jamrud — جمرود",
    "Jamshoro — جامشورو",
    "Jand — جنڈ",
    "Jaranwala — جڑانوالہ",
    "Jatoi — جتوئی",
    "Jauharabad — جوہرآباد",
    "Jhang — جھنگ",
    "Jhatpat — جھٹ پٹ",
    "Jhudo — جھڈو",
    "Kabirwala — کبیروالا",
    "Kaghan — کاغان",
    "Kahror Pakka — کہروڑ پکا",
    "Kahuta — کہوٹہ",
    "Kakul — کاکول",
    "Kalabagh — کالا باغ",
    "Kalat — قلات",
    "Kamalia — کمالیہ",
    "Kamar Mashani — کمر مشانی",
    "Kamoke — کامونکی",
    "Kamra — کامرہ",
    "Kandhkot — کندھ کوٹ",
    "Kandiaro — کنڈیارو",
    "Kanpur — کنپور",
    "Karak — کرک",
    "Kario — کاریو",
    "Karor Lal Esan — کروڑ لعل عیسن",
    "Kashmor — کشمور",
    "Keti Bandar — کیٹی بندر",
    "Khairpur — خیرپور",
    "Khairpur Nathan Shah — خیرپور ناتھن شاہ",
    "Khanewal — خانیوال",
    "Khanpur — خانپور",
    "Kharan — خاران",
    "Kharian — کھاریاں",
    "Khewra — کھیوڑہ",
    "Khurrianwala — کھرڑیانوالہ",
    "Khushab — خوشاب",
    "Khyber — خیبر",
    "Kohat — کوہاٹ",
    "Kot Addu — کوٹ ادو",
    "Kot Diji — کوٹ ڈیجی",
    "Kot Ghulam Muhammad — کوٹ غلام محمد",
    "Kot Mumin — کوٹ مومن",
    "Kot Radha Kishan — کوٹ رادھا کشن",
    "Kot Samaba — کوٹ سمابہ",
    "Kotli — کوٹلی",
    "Kotri — کوٹری",
    "Kurram — کرم",
    "Laki Marwat — لکی مروت",
    "Laliah — لیہ",
    "Lasbela — لسبیلہ",
    "Layyah — لیہ",
    "Liaquatpur — لیاقت پور",
    "Lodhran — لودھراں",
    "Loralai — لورالائی",
    "Lower Dir — لوئر دیر",
    "Mach — مچھ",
    "Mailsi — میلسی",
    "Makli — مکلی",
    "Malakand — ملاکنڈ",
    "Mandi Bahauddin — منڈی بہاؤالدین",
    "Mangla — منگلا",
    "Mansehra — مانسہرہ",
    "Mastung — مستونگ",
    "Matiari — مٹیاری",
    "Mehar — مہر",
    "Mian Channu — میاں چنوں",
    "Minawala — منی والا",
    "Mirpur — میرپور",
    "Mirpur Sakro — میرپور ساکرو",
    "Mithankot — مٹھن کوٹ",
    "Mithi — مٹھی",
    "Mohmand — مہمند",
    "More — مورے",
    "Muridke — مریدکے",
    "Murree — مری",
    "Musa Khel — موسیٰ خیل",
    "Mustung — مستونگ",
    "Muzaffarabad — مظفرآباد",
    "Muzaffargarh — مظفرگڑھ",
    "Nagar — نگر",
    "Nagar Parkar — نگرپارکر",
    "Nankana Sahib — ننکانہ صاحب",
    "Narang — نارنگ",
    "Narowal — نارووال",
    "Nasirabad — نصیرآباد",
    "Nawabshah — نوابشاہ",
    "New Saeedabad — نیو سعید آباد",
    "Naushahro Feroze — نوشہرو فیروز",
    "Naushera — نوشہرہ",
    "Nowshera — نوشہرہ",
    "Okara — اوکاڑہ",
    "Ormara — اورماڑہ",
    "Pabbi — پبی",
    "Padidan — پڈعیدن",
    "Pakpattan — پاکپتن",
    "Panjgur — پنجگور",
    "Pasni — پسنی",
    "Phalia — پھالیہ",
    "Pind Dadan Khan — پنڈ دادن خان",
    "Pindi Bhattian — پنڈی بھٹیاں",
    "Pindi Gheb — پنڈی گھیب",
    "Pir Mahal — پیر محل",
    "Pishin — پشین",
    "Qila Abdullah — قلعہ عبداللہ",
    "Qila Didar Singh — قلعہ دیدار سنگھ",
    "Qila Saifullah — قلعہ سیف اللہ",
    "Rabwah — ربوہ",
    "Rahim Yar Khan — رحیم یار خان",
    "Raiwind — رائیونڈ",
    "Rajanpur — راجن پور",
    "Ranipur — رانی پور",
    "Ratodero — رتودیرو",
    "Rawalakot — راولاکوٹ",
    "Renala Khurd — رینالہ خورد",
    "Risalpur — رسالپور",
    "Rohri — روہڑی",
    "Sadiqabad — صادق آباد",
    "Safdarabad — صفدرآباد",
    "Sahiwal — ساہیوال",
    "Sahuwala — ساہیوالہ",
    "Saidu Sharif — سیدو شریف",
    "Sajawal — سجاول",
    "Sakardu — سکردو",
    "Sambrial — سمبڑیال",
    "Sanghar — سانگھڑ",
    "Sangla Hill — سانگلہ ہل",
    "Sanjwal — سنجوال",
    "Sarai Alamgir — سرائے عالمگیر",
    "Sehwan — سیہون",
    "SEW — سیو",
    "Shabqadar — شبقدر",
    "Shahdadkot — شہدادکوٹ",
    "Shahdadpur — شہدادپور",
    "Shahkot — شاہکوٹ",
    "Shahr Sultan — شہر سلطان",
    "Shakarparian — شکرپڑیاں",
    "Shakargarh — شکرگڑھ",
    "Shangla — شانگلہ",
    "Sharqpur — شرقپور",
    "Shikarpur — شکارپور",
    "Shorkot — شورکوٹ",
    "Shujaabad — شجاع آباد",
    "Sibi — سبی",
    "Sihala — سہالہ",
    "Skardu — سکردو",
    "Sodhra — سودھرا",
    "Soianwala — سوئیانوالہ",
    "Sohawa — سوہاوہ",
    "Sohbatpur — صحبت پور",
    "Sonmiani — سونمیانی",
    "Swabi — صوابی",
    "Swat — سوات",
    "Tando Adam — ٹنڈو آدم",
    "Tando Allahyar — ٹنڈو اللہ یار",
    "Tando Jam — ٹنڈو جام",
    "Tando Muhammad Khan — ٹنڈو محمد خان",
    "Tangi — تنگی",
    "Tank — ٹانک",
    "Taunsa — تونسہ",
    "Taxila — ٹیکسلا",
    "Tharparkar — تھرپارکر",
    "Thatta — ٹھٹھہ",
    "Toba Tek Singh — ٹوبہ ٹیک سنگھ",
    "Topi — ٹوپی",
    "Toru — تورڈھیر",
    "Tranda Murad Khan — ترنڈہ مراد خان",
    "Turbat — تربت",
    "Ubaro — اوباڑو",
    "Umarkot — عمرکوٹ",
    "Upper Dir — اپر دیر",
    "Uthal — اوتھل",
    "Vihari — وہاڑی",
    "Wadh — وڈھ",
    "Wah — واہ",
    "Wana — وانا",
    "Warah — وارہ",
    "Wazirabad — وزیرآباد",
    "Yazman — یزمان",
    "Zafarwal — ظفر وال",
    "Zahir Pir — ظاہر پیر",
    "Zhob — ژوب",
    "Ziarat — زیارت",
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
      reset();
      carts.length = 0;
      router.push("/confirmation");
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
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          {carts.length === 0 ? (
            <div className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-fit">
              <img
                src="/empty-cart.png"
                alt="Empty Cart"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-6 opacity-60"
              />
              <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
                Your Cart is Empty
              </h2>
              <p className="text-gray-500 mb-6 text-xs sm:text-sm">
                Looks like you haven't added any watches yet.
              </p>
              <Button
                type="button"
                onClick={() => router.push("/")}
                className="bg-black text-white hover:bg-gray-800 transition-colors rounded-lg px-8 py-2.5 text-sm font-medium w-full max-w-[200px]"
              >
                Shop Now
              </Button>
            </div>
          ) : (
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Checkout</h1>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">اپنا آرڈر مکمل کرنے کے لیے اپنی تفصیلات درج کریں.</p>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 block">
                        WhatsApp Number / واٹس ایپ نمبر<span className="text-red-500">*</span>
                      </label>
                      <Input
                        className="w-full h-11 border-gray-200 focus:border-black focus:ring-black transition-colors"
                        placeholder="03XXXXXXXXX"
                        {...register("contact")}
                      />
                      {errors.contact && (
                        <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 block">
                        Email Address / ای میل ایڈریس <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <Input
                        className="w-full h-11 border-gray-200 focus:border-black focus:ring-black transition-colors"
                        placeholder="ali@gmail.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4 pt-2 sm:pt-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 block">
                      Full Name / مکمل نام<span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="w-full h-11 border-gray-200 focus:border-black focus:ring-black transition-colors"
                      placeholder="Enter your full name"
                      {...register("Name")}
                    />
                    {errors.Name && (
                      <p className="text-red-500 text-xs mt-1">{errors.Name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="city" className="text-sm font-medium text-gray-700 block">
                      City / شہر<span className="text-red-500">*</span>
                    </label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full h-11 justify-between border-gray-200 hover:bg-gray-50 focus:border-black focus:ring-black transition-colors font-normal text-left",
                            !value && "text-gray-500",
                            errors.city && "border-red-500"
                          )}
                        >
                          {value || "Search and select your city..."}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
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

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 block">
                      Complete Address / مکمل پتہ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className={cn(
                        "w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none",
                        errors.address && "border-red-500 focus:border-red-500 focus:ring-red-500"
                      )}
                      placeholder="House No., Street, Block, Area/Society"
                      rows={4}
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                    )}
                  </div>
                </div>

                {/* Payment Mode */}
                <div className="space-y-4 pt-2 sm:pt-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Payment Method</h3>
                  <div className="relative p-3 sm:p-4 border-2 border-black rounded-lg sm:rounded-xl bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-4 border-black flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      </div>
                      <span className="font-medium text-sm sm:text-base text-gray-900">Cash on Delivery (COD)</span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide w-fit">
                      Free Shipping
                    </span>
                  </div>
                </div>

                {/* Compact Order Summary */}
                <div className="space-y-4 pt-2 sm:pt-4 border-t border-gray-100 mt-4 sm:mt-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">Order Summary</h3>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                    <ScrollArea className="max-h-[25vh] pr-2 mb-4">
                      <div className="space-y-3">
                        {carts.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <div className="relative flex-shrink-0">
                              <img
                                src={item?.images[0]}
                                alt={item.name || "Product"}
                                className="w-12 h-12 object-cover rounded-md border border-gray-200 bg-white"
                              />
                              {item.quantity && (
                                <span className="absolute top-[-1px] -right-1.5 bg-gray-900 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                  {item.quantity}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-xs sm:text-sm text-gray-900 truncate">{item.name}</p>
                              {item.selectedVariant && (
                                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                                  Variant: <span className="font-medium text-gray-700">{item.selectedVariant}</span>
                                </p>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-medium text-xs sm:text-sm text-gray-900">
                                Rs. {Number(item.Sellprice * item.quantity).toLocaleString("en-PK")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="border-t border-gray-200 pt-3 space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                        <p>Subtotal</p>
                        <p className="font-medium text-gray-900">Rs. {Number(total).toLocaleString("en-PK")}</p>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                        <p>Shipping</p>
                        <p className="font-medium text-green-600">Free</p>
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-900">Total</p>
                        <p className="text-base font-bold text-gray-900">
                          Rs. {Number(total).toLocaleString("en-PK")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-100">
                  <div className="text-center mb-4 text-xs sm:text-sm text-gray-600 flex items-center justify-center gap-2">
                    <span className="text-base sm:text-lg">📦</span>
                    <span>Open your parcel and check your watch before payment.</span>
                  </div>
                  <Button
                    disabled={mutation.isPending}
                    type="submit"
                    className="w-full bg-black hover:bg-gray-900 text-white text-base sm:text-lg font-medium rounded-lg sm:rounded-xl h-12 sm:h-14 transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? "Processing Order..." : "Complete Order"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
