import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationLoading() {
  return (
    <div className="space-y-3 p-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex justify-between items-start space-x-3">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-2 w-2 rounded-full self-center" />
        </div>
      ))}
    </div>
  );
}
