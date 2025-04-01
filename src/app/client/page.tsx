"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ClientHeader from "../_components/client-header";
import CategoriesMap from "../_components/category";

type Category = {
  _id: string | null;
  categoryName: string | null;
};

const Client = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState<Category>({
    categoryName: null,
    _id: null,
  });

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:1000/category");
      setCategories(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="w-full h-[4000px]">
      <ClientHeader />
      <img className="w-full" src="BG.svg" />
      <div className="w-full px-12 py-8 bg-[#404040] inline-flex flex-col justify-start items-start gap-9 overflow-hidden">
        <div className="self-stretch px-10 inline-flex justify-center items-center gap-2.5">
          <div className="flex-1 justify-start text-white text-xl font-semibold font-['Inter'] leading-9">
            Categories
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <div className="w-[1500px] h-10 px-4 py-2 rounded-[10px] flex  gap-3">
            {categories.length === 0 ? (
              <p>Loading...</p>
            ) : (
              categories.map((category) => (
                <button
                  key={category._id}
                  className="h-9 px-4 py-2 bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-border-border-input inline-flex justify-start items-center ml-[10px]"
                >
                  {category.categoryName}
                </button>
              ))
            )}
          </div>
        </div>
        <div>
          <CategoriesMap />
        </div>
      </div>
    </div>
  );
};

export default Client;
