"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Img } from "../_components/image";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  email: string;
  password: string;
  confirmPassword: string;
};

type User = {
  email: string | null;
  password: string | null;
};

const SignUp = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<FormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<FormErrors>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, setAddUser] = useState<User>({
    email: null,
    password: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);

  const addNewUser = async () => {
    try {
      const response = await fetch("http://localhost:1000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formValue.email,
          password: formValue.password,
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Failed to create user:", data);
      }
    } catch (error) {
      console.log("Error in API call:", error);
    }
  };

  const handleSubmit = async () => {
    let isValid = true;
    setError({
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Validation checks
    if (!formValue.email.trim()) {
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
    }

    if (!formValue.password.trim()) {
      setError((prev) => ({
        ...prev,
        password: "Please create a password.",
      }));
      isValid = false;
    }

    if (!formValue.confirmPassword.trim()) {
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
    }

    if (isValid) {
      console.log("Form Data:", formValue);

      setAddUser({
        email: formValue.email,
        password: formValue.password,
      });

      try {
        await addNewUser();
      } catch (error) {
        console.error("Error adding user:", error);
      }
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
          <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
            <div className="text-zinc-950 text-2xl font-semibold font-['Inter'] leading-loose">
              Create a strong password
            </div>
            <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
              Create a strong password with letters, numbers.
            </div>
          </div>
          <div className="self-stretch h-auto h-9 flex-col justify-start items-start gap-4 flex">
            <Input
              className="h-8"
              placeholder="email"
              value={formValue.email}
              onChange={handleChange}
              name="email"
              aria-label="Email"
            />
            {error.email && (
              <div className="text-[#ee4444] text-sm font-normal font-['Inter'] leading-tight">
                {error.email}
              </div>
            )}
            <Input
              className="h-8"
              placeholder="Password"
              value={formValue.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              aria-label="Password"
            />
            {error.password && (
              <div className="text-[#ee4444] text-sm font-normal font-['Inter'] leading-tight">
                {error.password}
              </div>
            )}
            <Input
              className="h-8"
              placeholder="Confirm"
              value={formValue.confirmPassword}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              aria-label="Confirm Password"
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
                aria-label="Show Password"
                className="cursor-pointer"
              />
              <div className="text-zinc-500 text-sm font-normal font-['Inter'] leading-[14px]">
                Show password
              </div>
            </div>
            <div className="self-stretch justify-start items-start gap-3 inline-flex">
              <Button
                className="w-[416px] cursor-pointer"
                onClick={handleSubmit}
              >
                Let's Go
              </Button>
            </div>
            <div className="self-stretch justify-center items-center gap-3 inline-flex">
              <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
                Already have an account?
              </div>
              <div
                className="text-blue-600 text-base font-normal font-['Inter'] leading-normal cursor-pointer"
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

export default SignUp;
