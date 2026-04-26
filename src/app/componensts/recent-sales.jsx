import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function RecentSales({ data = [] }) {
  return (
    <div className="space-y-8">
      {data.map((user, index) => (
        <HoverCard key={index}>
            <div className="flex items-center cursor-pointer">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {user.firstName?.[0] ?? "U"}
                  {user.lastName?.[0] ?? ""}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
          <HoverCardTrigger asChild>
                <p className="text-sm font-medium leading-none">
                  {user.firstName} {user.lastName}
                </p>
          </HoverCardTrigger>
                <p className="text-sm text-muted-foreground">{user.email.length > 12 ? user.email.slice(0,10) + "..." : user.email }</p>
              </div>
              <div className="ml-auto font-medium">+PKR 0.00</div>
            </div>
          <HoverCardContent className="w-80">
            <div className="space-y-1 text-sm  border-l-4 border-blue-500 pl-2">
               <p >
                  <strong>{user.firstName} {user.lastName}</strong>
                </p>
              <p>
                <strong>Contact:</strong> {user.email}
              </p>
              <p>
                <strong>Contact:</strong> {user.contact}
              </p>
              <p>
                <strong>Address:</strong> {user.address}, {user.apartment}
              </p>
              <p>
                <strong>City:</strong> {user.city}
              </p>
              <p>
                <strong>Postal Code:</strong> {user.postalCode}
              </p>
              <p>
                <strong>Country:</strong> {user.country}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
