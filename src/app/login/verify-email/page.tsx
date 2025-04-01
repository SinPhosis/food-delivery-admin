"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Img } from "../../_components/image";

export const VerifyEmail = () => {
  return (
    <div>
      <Img />
      <div className="w-[416px] h-72 absolute top-[246px] left-[100px] flex-col justify-center items-start gap-6 inline-flex">
        <Button className="w-[36px] h-[36px] bg-white">
          <ChevronLeft className="text-black w-[16px] h-[16px]" />
        </Button>
        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
          <div className="text-zinc-950 text-2xl font-semibold font-['Inter'] leading-loose">
            Please verify your email
          </div>
          <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
            We just sent an email to{" "}
            <span className="text-black">Example@gmail.com</span>. Click the
            link in the email to verify your account
          </div>
          <div className="self-stretch justify-start items-start gap-3 inline-flex">
            <Button className="w-[416px] mt-[20px]">Resend email</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
