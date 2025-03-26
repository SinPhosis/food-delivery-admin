"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Category = {
  _id: string | null;
  categoryName: string | null;
};

type event = {
  target: {
    value: string;
  };
};

export const HeaderBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState<Category>({
    categoryName: null,
    _id: null,
  });

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:900/category");
      setCategories(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const AddNewCategory = async () => {
    try {
      await fetch("http://localhost:900/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: addCategory.categoryName }),
      });
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e: event) => {
    setAddCategory((prev) => ({ ...prev, categoryName: e.target.value }));
  };

  return (
    <div className="w-[1171px] inline-flex flex-col justify-start items-end gap-6">
      <div className="inline-flex justify-start items-start gap-2.5">
        <div data-state="Default" className="w-9 h-9 relative rounded-full">
          <div className="w-9 h-9 left-0 top-0 absolute bg-zinc-300 rounded-full" />
          <img
            className="w-9 h-9 left-0 top-0 absolute rounded-full"
            src="https://placehold.co/36x36"
            alt="Profile"
          />
        </div>
      </div>

      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col justify-start items-start gap-4 overflow-hidden ml-[10px]">
        <div className="self-stretch inline-flex justify-center items-center gap-2.5">
          <div className="flex-1 justify-start text-text-text-foreground text-xl font-semibold font-['Inter'] leading-7">
            Dishes category
          </div>
          <div className="self-stretch inline-flex justify-start items-center gap-3 flex-wrap content-center overflow-hidden">
            {categories.length === 0 ? (
              <p>Loading...</p>
            ) : (
              categories.map((category) => (
                <button
                  key={category._id}
                  className="h-9 px-4 py-2 bg-background-bg-background rounded-full outline outline-1 outline-offset-[-1px] outline-border-border-input inline-flex justify-start items-center gap-2"
                >
                  {category.categoryName}
                </button>
              ))
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-[36px] h-[36px] bg-red-500 rounded-full inline-flex justify-start items-center gap-2 relative">
                  <div className="w-4 h-4 relative overflow-hidden left-[9px]">
                    <img src="plus.svg" className="w-4 h-4 absolute" />
                  </div>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Add new category</AlertDialogTitle>
                  <AlertDialogDescription className="text-black1">
                    Category name
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Input onChange={onChange} placeholder="Type category name" />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={AddNewCategory}>
                    Add category
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};
