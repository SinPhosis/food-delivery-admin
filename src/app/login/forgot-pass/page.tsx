"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Img } from "../../_components/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FromValues = {
  email: string;
};
type FormErrors = {
  email: string;
};

const ForgotPass = () => {
  const router = useRouter();
    const [formValue, setFormValue] = useState<FromValues>({ email: "" });
    const [error, setError] = useState<FormErrors>({ email: "" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    let isValid = true;

    if (!formValue.email || formValue.email.trim().length === 0) {
      setError((prev) => ({
        ...prev,
        email: "Please enter your email.",
      }));
      isValid = false;
    } else if (!emailRegex.test(formValue.email.trim())) {
      setError((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    } else {
      setError((prev) => ({ ...prev, email: "" }));
      isValid = true;
    }
    if(isValid) {
    router.push("")
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Img />
      <div className="w-[416px] h-72 absolute top-[246px] left-[100px] flex-col justify-center items-start gap-6 inline-flex">
        <Button className="w-[36px] h-[36px] bg-white" onClick={() => router.back()}>
          <ChevronLeft className="text-black w-[16px] h-[16px]" />
        </Button>
        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
          <div className="text-zinc-950 text-2xl font-semibold font-['Inter'] leading-loose">
            Reset your password
          </div>
          <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
            Enter your email to receive a password reset link.
          </div>
        </div>
        <div className="self-stretch h-9 flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch h-9 flex-col justify-start items-start gap-2 flex">
            <Input
              placeholder="Enter your email address"
              type="email"
              name="email"
            />
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-3 inline-flex">
          <Button className="w-[416px]">Send link</Button>
        </div>
        <div className="self-stretch justify-center items-center gap-3 inline-flex">
          <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
            Don't have an account?
          </div>
          <div className="text-blue-600 text-base font-normal font-['Inter'] leading-normal cursor-pointer" onClick={() => router.push("/")}>
            Sign up{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPass