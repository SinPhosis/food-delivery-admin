"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Img } from "@/app/_components/image";
import { useRouter } from "next/navigation";

type FromValues = {
  password: string;
  confirmPassword: string;
};
type FormErrors = {
  password: string;
  confirmPassword: string;
};

const NewPass = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<FromValues>({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<FormErrors>({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    let isValid = true;
    // Password :
    if (!formValue.password || formValue.password.trim().length === 0) {
      setError((prev) => ({
        ...prev,
        password: "Please create a password.",
      }));
      isValid = false;
    } else {
      setError((prev) => ({ ...prev, password: "" }));
      isValid = true;
    }
    // Password confirmation :
    if (
      !formValue.confirmPassword ||
      formValue.confirmPassword.trim().length === 0
    ) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Please repeat your password.",
      }));
      isValid = false;
    } else if (formValue.confirmPassword !== formValue.password) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Your password does not match.",
      }));
      isValid = false;
    } else {
      setError((prev) => ({ ...prev, confirmPassword: "" }));
      isValid = true;
    }

    if (isValid) {
      router.push("/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckBoxChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Img />
      <div className="w-full h-[1600px] relative overflow-hidden">
        <div className="w-[400px] h-[372px] flex-col justify-start items-start gap-6 inline-flex absolute left-[100px] top-[326px]">
          <Button className="w-[36px] h-[36px] bg-white">
            <div onClick={() => router.back()}>
              <ChevronLeft className="text-black w-[16px] h-[16px]" />
            </div>
          </Button>
          <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
            <div className="text-zinc-950 text-2xl font-semibold font-['Inter'] leading-loose">
              Create a strong password
            </div>
            <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
              Create a strong password with letters, numbers.
            </div>
          </div>
          <div className="self-stretch h-9 flex-col justify-start items-start gap-4 flex">
            <Input
              className="h-11"
              placeholder="Password"
              value={formValue.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
            />
            {error.password && (
              <div className="text-[#ee4444] text-sm font-normal font-['Inter'] leading-tight">
                {error.password}
              </div>
            )}
            <Input
              className="h-11"
              placeholder="Confirm"
              value={formValue.confirmPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
            />
            {error.confirmPassword && (
              <div className="text-[#ee4444] text-sm font-normal font-['Inter'] leading-tight">
                {error.confirmPassword}
              </div>
            )}
            <div className="h-4 justify-start items-center gap-2 inline-flex">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleCheckBoxChange}
              />
              <div className="text-zinc-500 text-sm font-normal font-['Inter'] leading-[14px]">
                Show password
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-3 inline-flex">
              <Button className="w-[416px]" onClick={handleSubmit}>
                Let's Go
              </Button>
            </div>
            <div className="self-stretch justify-center items-center gap-3 inline-flex">
              <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
                Already have an account?
              </div>
              <div
                className="text-blue-600 text-base font-normal font-['Inter'] leading-normal"
                onClick={() => router.push("/login")}
              >
                Log in{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewPass;
