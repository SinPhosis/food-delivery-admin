"use client";
import { SideBarOrder } from "@/app/_components/side-bar-admin-orders";
import { useRouter } from "next/navigation";
const Admin = () => {
    return (
        <div className="w-auto, h-[1500px] relative bg-background-bg-secondary overflow-hidden">
            <SideBarOrder />
        </div>
    )
};
export default Admin