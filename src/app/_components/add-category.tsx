"use client"
import axios from "axios";
import { useEffect } from "react";
export const AddCategory = () => {
    const getCategories = async () => {
        try {
          const response = await axios.get("http://localhost:800/category");
          console.log(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() => {
        getCategories();
      }, []); 
}