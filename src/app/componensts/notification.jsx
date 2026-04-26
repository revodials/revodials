"use client";

import { useState, useEffect } from "react";
import { BellIcon, CircleIcon } from "lucide-react";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationLoading from "./notify-skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteNotificationStatus,
  fetchNotification,
  UpdateNotificationStatus,
} from "../actions/notification";
import Link from "next/link";
import { DeleteIcon } from "lucide-react";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";

export default function Notify() {
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: notification = [], isLoading } = useQuery({
    queryKey: ["notify"],
    queryFn: fetchNotification,
    refetchOnWindowFocus: false,
  });
  const updateNotificationStatus = useMutation({
    mutationFn: UpdateNotificationStatus,
    onSuccess: () => {
      toast.success("Notification marked as read");
      queryClient.invalidateQueries({ queryKey: ["notify"] }); // ✅ correct syntax
    },
    onError: (error) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });
  const deleteNotificationStatus = useMutation({
    mutationFn: DeleteNotificationStatus,
    onSuccess: () => {
      toast.success("Notification deleted sucessfully");
      queryClient.invalidateQueries({ queryKey: ["notify"] }); // ✅ correct syntax
    },
    onError: (error) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });
  useEffect(() => {
    if (notification.length > 0) {
      const Count = notification.filter((n) => n?.status === "unread").length;
      if (Count) {
        const timer = setTimeout(() => {
          try {
            const audio = new Audio("/ting.wav"); // Adjust the path to your sound file
            audio.play();
            setUnreadCount(Count);
          } catch (error) {
            console.log("TCL: timer -> error", error);
          }
        }, 5000);
      }
    }
  }, [notification]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative"
          aria-label="Open notifications"
        >
          <BellIcon size={16} aria-hidden="true" className="text-black" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 z-[9999] p-1">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
        </div>
        <div className="bg-border -mx-1 my-1 h-px" />

        {isLoading ? (
          <NotificationLoading />
        ) : notification.length > 0 ? (
          notification.map((notification) => (
            <div
              className={`group relative px-4 py-4 transition-all duration-200 hover:bg-gray-50 cursor-pointer ${
                notification.status === "unread"
                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                  : "hover:bg-gray-50"
              }`}
              key={notification._id || notification.name}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={`text-sm font-medium text-gray-900 truncate ${
                        notification.status === "unread" ? "font-semibold" : ""
                      }`}
                    >
                      {notification.name} placed an order from{" "}
                      {notification.city}
                    </h4>
                    {notification.status === "unread" && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {moment(notification.createdAt).format("LLLL")}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {moment(notification.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {notification.status === "unread" && (
                    <button
                      className="group/btn p-1 rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                      onClick={() => {
                        updateNotificationStatus.mutate(notification._id);
                        setUnreadCount(0)
                      }}
                      aria-label="Mark as read"
                    >
                      <CheckIcon className="h-4 w-4 text-green-700 group-hover/btn:text-green-800" />
                    </button>
                  )}
                  <div
                    onClick={() => {
                      deleteNotificationStatus.mutate(notification._id);
                      setUnreadCount(0)
                    }}
                  >
                    <DeleteIcon className="text-red-500 " />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No notifications
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
