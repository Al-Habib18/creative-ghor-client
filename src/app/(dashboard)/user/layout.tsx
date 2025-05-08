/** @format */
import DashboardSidebar from "@/components/DashboadSidebar";
export default async function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className=" min-h-screen mx-auto max-w-7xl bg-white dark:bg-zinc-900 ">
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
}
