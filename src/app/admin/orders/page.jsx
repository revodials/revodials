"use client";

import { fetchOrders } from "@/app/actions/products";
import { columns } from "@/app/table/columns";
import { DataTable } from "@/app/table/data-table";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form } from "@/components/ui/form";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  const [open, setOpen] = useState(false);
  const [rawDate, setRawDate] = useState(undefined);
  const [formattedDate, setFormattedDate] = useState(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const city = searchParams.get("city") || undefined;
  const paramsStatus = searchParams.get("status") || undefined;
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", city, formattedDate ?? "", paramsStatus, currentPage],
    queryFn: () =>
      fetchOrders(city, formattedDate, paramsStatus, currentPage, limit),
    refetchOnWindowFocus: false,
  });

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
  const status = [
    "pending",
    "processing",
    "completed",
    "cancelled",
    "shipped",
    "delete",
  ];

  const handleStatusChange = (selectedStatus) => {
    const params = new URLSearchParams(searchParams);
    if (selectedStatus === "all") {
      params.delete("status");
    } else {
      params.set("status", selectedStatus);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleCityChange = (selectedCity) => {
    const params = new URLSearchParams(searchParams);
    if (selectedCity === "all") {
      params.delete("city");
    } else {
      params.set("city", selectedCity);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // Error states
  if (isError) {
    return (
      <div className="container mx-auto py-10 p-4 text-center">
        <div className="text-red-500 text-lg font-medium mb-4">
          Error loading orders
        </div>
        <p className="text-muted-foreground">
          {error?.message || "Please try again later"}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-0 max-w-5xl">
      <h1 className="font-bold text-4xl text-center mb-8">Incoming Orders</h1>

      <Card className={"my-6"}>
        <CardHeader className="flex flex-col items-stretch !p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center items-center sm:items-start gap-1 px-6 pb-3 sm:pb-0">
            <Image src="/black-logo.png" alt="Logo" width={120} height={120} />
          </div>
          <div className="flex">
            <button className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0  sm:px-8 sm:py-6">
              <span className="text-muted-foreground text-xs">Orders</span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                {data?.totalCount || 0}
              </span>
            </button>
          </div>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 w-full">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Filter by Cities
          </label>
          <Select onValueChange={handleCityChange} value={city || "all"}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {pakistanCities.map((cityOption) => (
                <SelectItem key={cityOption} value={cityOption}>
                  {cityOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Filter by Status
          </label>
          <Select
            onValueChange={handleStatusChange}
            value={paramsStatus || "all"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {status.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Picker */}
        <div>
          <Form {...form}>
            <Popover open={open} onOpenChange={setOpen}>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Filter by days
              </label>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formattedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2" />
                  {formattedDate?.from ? (
                    formattedDate.to ? (
                      <>
                        {format(formattedDate.from, "LLL dd, y")} -{" "}
                        {format(formattedDate.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(formattedDate.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={rawDate}
                  onSelect={(selectedRange) => {
                    setRawDate(selectedRange);
                    const from = selectedRange?.from
                      ? format(selectedRange.from, "yyyy-MM-dd")
                      : null;
                    const to = selectedRange?.to
                      ? format(selectedRange.to, "yyyy-MM-dd")
                      : null;

                    if (from && to) {
                      setFormattedDate({ from, to });
                      setOpen(false);
                    }
                  }}
                  numberOfMonths={2}
                />
                <div className="p-2 flex justify-center w-full items-center">
                  <Button
                    variant="outline"
                    className="w-fit"
                    onClick={() => {
                      setRawDate(undefined);
                      setFormattedDate(null);
                    }}
                  >
                    Clear Date
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </Form>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[70vh] w-full p-2">
          <Skeleton className="h-full w-full" />
        </div>
      ) : !data || !Array.isArray(data.orders) || data.orders.length === 0 ? (
        <div className="container mx-auto py-10 p-4 text-center">
          <div className="text-lg font-medium mb-2">
            {city ? `No orders found in ${city}` : "No orders found"}
          </div>
          <p className="text-muted-foreground">
            {city
              ? "Try selecting a different city"
              : "Check back later for new orders"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={data?.orders} />
          {data?.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <Button
                className="px-3 py-1 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="px-2">
                Page {data?.currentPage} of {data?.totalPages}
              </span>

              <Button
                className="px-3 py-1 rounded disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(data?.totalPages, currentPage + 1)
                  )
                }
                disabled={currentPage === data?.totalPages}
              >
                Next
              </Button>
            </div>

          )}
        </div>
      )}
    </div>
  );
}
