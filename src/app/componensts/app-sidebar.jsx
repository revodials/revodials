"use client";
import { FiLogOut } from "react-icons/fi";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FiHome } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsBoxes } from "react-icons/bs";
import { User2Icon } from "lucide-react";
import LogoutButton from "./logoutButton";

const items = [
  {
    title: "Home",
    url: "/admin",
    icon: FiHome,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: HiOutlineClipboardList,
  },
  {
    title: "Notifications",
    url: "/admin/notification",
    icon: IoNotificationsOutline,
  },
  {
    title: "Products",
    url: "/admin/inventory",
    icon: BsBoxes,
  },
  {
    title: "Staff",
    url: "/admin/user",
    icon: User2Icon,
  },
];

export function AppSidebar({ user }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <LogoutButton />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Management system</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (
                  (item.title === "Staff" || item.title === "Home") &&
                  user?.role === "member"
                ) {
                  return null;
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Section */}
      </SidebarContent>
    </Sidebar>
  );
}
