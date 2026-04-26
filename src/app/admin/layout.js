import { redirect } from "next/navigation";
import { AppSidebar } from "../componensts/app-sidebar";
import { checkIslogin } from "@/lib/session";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Notify from "../componensts/notification";

export default async function Layout({ children }) {
  const isuser = await checkIslogin();
  if (!isuser) {
    redirect("/");
  }

  return (
    <div className="flex items-center w-full bg-white">
      <SidebarProvider>
        <AppSidebar user={isuser} />
        <main className="w-full">
          <SidebarTrigger />
          <div className="flex justify-center w-full">
            <Image
              src="/black-logo.png"
              alt="Logo"
              width={150}
              height={150}
            />
          </div>
          <div className="flex justify-end w-full p-3">
            <Notify />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
