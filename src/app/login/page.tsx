"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Img } from "../_components/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import bcrypt from "bcryptjs";

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
  const [users, setUsers] = useState<Users[]>([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, redirect to the appropriate dashboard
      const role = localStorage.getItem("role");
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "client") {
        router.push("/client");
      }
    }
  }, []);

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
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }

    if (isValid) {
      const user = users.find((user) => user.email === formValue.email.trim());

      if (user) {
        try {
          const isPasswordMatch = await bcrypt.compare(
            formValue.password.trim(),
            user.password
          );

          if (isPasswordMatch) {
            let role = "client";
            if (user.email === "admin@example.com") {
              role = "admin";
            }

            const response = await axios.post("http://localhost:1000/login", {
              email: formValue.email.trim(),
              password: formValue.password.trim(),
              role: role,
            });

            if (response.data.success) {
              // Store token and role in localStorage
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("role", role);

              // Redirect based on role
              if (role === "admin") {
                router.push("/admin");
              } else {
                router.push("/client");
              }
            } else {
              setError((prev) => ({
                ...prev,
                password: response.data.message || "Invalid email or password.",
              }));
            }
          }
        } catch (error) {
          console.error("Error comparing passwords:", error);
          setError((prev) => ({
            ...prev,
            password: "An error occurred while validating your credentials.",
          }));
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
      const response = await axios.get("http://localhost:1000/user");
      setUsers(response.data.data);
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
          <Button className="w-[416px] cursor-pointer" onClick={handleSubmit}>
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
            <div className="cursor-pointer" onClick={() => router.push("/sign-up")}>
              Sign Up{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
