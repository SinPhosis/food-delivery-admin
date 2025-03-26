//1. Food Delivery Service => Sign-up:
//2. Validate email and password
//3. Check if email already exist => true => return error
//4. crypt user password
//5. Create user

//2. Food Delivery Service => Login:
//1. Validate email and password
//2. Check if email already exist => false => return account not found
//3. Compare password with user password
//4. Return user

//3. Food Delivery Client => Login & Sign up pages

//4. Food Delivery Admin => Admin Food Menu
//1. CRUD Category
//2. CRUD FOOD

//5. Food Delivery Admin => Admin Settings
//1. Get all users

//6. Food Delivery Client => Client Home Page

//7. Food Delivery Service => Client order CRUD

//8. Food Delivery Client =>Client Card + Location

//9. Food Delivery Client =>Client order

//10. Food Delivery Admin => Admin Order Table

//If checked red like this, it means i've completed it.
"use client";
import axios from "axios";
import Link from "next/link";
import { SignUp } from "./sign-up/page";
import { useEffect } from "react";
import Router from "next/router";

export default function Home() {
  return (
    <div className="container mx-auto h-[1100px]">
      {/* <div className="w-[1440px] h-[1024px] relative overflow-hidden"> */}
      <SignUp />
      {/* </div> */}
    </div>
  );
}
