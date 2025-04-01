"use client";
import { useRouter } from "next/navigation";

export const SideBar = () => {
  const router = useRouter();

  return (
    <div className="w-52 h-full px-5 py-9 bg-white inline-flex flex-col justify-start items-start gap-10 overflow-hidden">
      <div className="self-stretch inline-flex justify-start items-center gap-2">
        <div className="w-10 h-10 px-1 py-[3px] flex justify-center items-center gap-2.5">
          <img src="../Logo.svg" />
        </div>
        <div className="inline-flex flex-col justify-center items-start">
          <div className="justify-start text-foreground text-lg font-semibold font-['Inter'] leading-7">
            NomNom
          </div>
          <div className="self-stretch justify-start text-[#71717a] text-xs font-normal font-['Inter'] leading-none">
            Swift Delivery
          </div>
        </div>
      </div>
      <div className="self-stretch inline-flex flex-col justify-start items-center gap-6">
        <div className="self-stretch h-10 px-6 py-2 rounded-full bg-[#18181b] inline-flex justify-start items-center gap-2.5">
          <div className="w-5 h-5 relative overflow-hidden">
            <img
              className="w-4 h-4 left-[2.75px] top-[2.75px] absolute"
              src="../Dashboard_Icon.svg"
            />
          </div>
          <div className="justify-start text-white text-sm font-normal font-['Inter'] leading-tight">
            Food menu
          </div>
        </div>
      </div>
      <div className="self-stretch h-10 px-6 bg-background-bg-background rounded-full inline-flex justify-start items-center gap-2.5">
        <div className="w-5 h-5 relative overflow-hidden">
          <img
            className="w-5 h-3.5 left-[1.83px] top-[4.58px] absolute"
            src="../Truck_Icon.svg"
          />
        </div>
        <div className="justify-start text-text-text-foreground text-sm font-medium font-['Inter'] leading-tight cursor-pointer" onClick={() => router.push("/admin/admin-orders")}>
          Orders
        </div>
      </div>
      <div className="self-stretch h-10 px-6 inline-flex justify-start items-center gap-2.5">
        <div className="w-5 h-5 relative overflow-hidden">
          <img
            className="w-4 h-5 left-[2.73px] top-[1.83px] absolute"
            src="../Settings_Icon.svg"
          />
        </div>
        <div className="justify-start text-text-text-foreground text-sm font-medium font-['Inter'] leading-tight">
          Settings
        </div>
      </div>
    </div>
  );
};
