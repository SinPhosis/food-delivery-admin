"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Img } from "../_components/image";
import { useRouter } from "next/navigation";
import axios from "axios";

type FromValues = {
  email: string;
  password: string;
};
type FormErrors = {
  email: string;
  password: string;
};

type Users = {
  email: string;
  password: string;
};

const LogIn = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<FromValues>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<FormErrors>({ email: "", password: "" });
  const [users, setUsers] = useState<Users[]>([])

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const usersDatabase = [
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "client@example.com", password: "client123", role: "client" },
  ];

  const handleSubmit = async () => {
    let isValid = true;

    // Validate Email
    if (!formValue.email || formValue.email.trim().length === 0) {
      setError((prev) => ({
        ...prev,
        email: "Please enter your email",
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
    }

    // Validate Password
    if (!formValue.password || formValue.password.trim().length === 0) {
      setError((prev) => ({
        ...prev,
        password: "Please enter your password",
      }));
      isValid = false;
    } else if (formValue.password.trim().length < 6) {
      setError((prev) => ({
        ...prev,
        password: "The password character must be 6 or longer.",
      }));
      isValid = false;
    } else if (!passwordRegex.test(formValue.password.trim())) {
      setError((prev) => ({
        ...prev,
        password: "Incorrect password. Please try again",
      }));
      isValid = false;
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }

    if (isValid) {
      const user = usersDatabase.find(
        (user) =>
          user.email === formValue.email.trim() &&
          user.password === formValue.password.trim()
      );

      if (user) {
        localStorage.setItem("token", "fake-jwt-token");
        localStorage.setItem("role", user.role);

        if (user.role === "admin")  {
          router.push("/admin");
        } else if (user.role === "client") {
          router.push("/client");
        }
      } else {
        setError((prev) => ({
          ...prev,
          email: "Invalid email or password.",
        }));
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:900/user");
      setUsers(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      
    } 
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <Img />
      <div className="w-[416px] h-72 absolute top-[246px] left-[100px] flex-col justify-center items-start gap-6 inline-flex pt-[350px]">
        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
          <div className="text-zinc-950 text-2xl font-semibold font-['Inter'] leading-loose">
            Login
          </div>
          <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
            Sign up to explore your favorite dishes.
          </div>
        </div>
        <div className="self-stretch h-9 flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch h-9 flex-col justify-start items-start gap-2 flex">
            <Input
              placeholder="Enter your email address"
              value={formValue.email}
              onChange={handleChange}
              type="email"
              name="email"
            />
            {error.email && (
              <div className="text-[#ee4444] text-sm font-normal font-['Inter'] leading-tight">
                {error.email}
              </div>
            )}
          </div>
        </div>
        <div className="self-stretch h-9 flex-col justify-start items-start gap-2 flex">
          <Input
            placeholder="Password"
            value={formValue.password}
            onChange={handleChange}
            type="password"
            name="password"
          />
          {error.password && (
            <div className="text-[#ee4444] text-sm font-normal font-['Inter'] leading-tight">
              {error.password}
            </div>
          )}
        </div>
        <div
          className="text-zinc-900 text-sm font-normal font-['Inter'] underline leading-tight cursor-pointer"
          onClick={() => router.push("/login/forgot-pass")}
        >
          Forgot password?
        </div>
        <div className="self-stretch justify-start items-start gap-3 inline-flex">
          <Button className="w-[416px]" onClick={handleSubmit}>
            Let's Go
          </Button>
        </div>
        <div className="self-stretch justify-center items-center gap-3 inline-flex">
          <div className="text-zinc-500 text-base font-normal font-['Inter'] leading-normal">
            Don't have an account?
          </div>
          <div
            className="text-blue-600 text-base font-normal font-['Inter'] leading-normal cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div onClick={() => router.back()}>Sign Up </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
