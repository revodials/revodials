"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterSelect({ category, selectedId }) {
  const router = useRouter();

  const handleChange = (val) => {
    router.push(`/collection/${val}`);
  };

  return (
    <Select onValueChange={handleChange} value={selectedId || "all"}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All products</SelectItem>
        {category?.map((cat) => (
          <SelectItem key={cat._id} value={cat._id}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}