import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ClienteSidebar } from "./components/sidebar";
import { ClienteHeader } from "./components/client-header";

export default async function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-[#060f22] flex">
      <ClienteSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <ClienteHeader user={user} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
