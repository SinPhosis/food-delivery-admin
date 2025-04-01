"use client";
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
import { useState, useEffect } from "react";
import axios from "axios";

type event = {
  target: {
    value: string;
  };
};
type FoodInfoTypes = {
  foodName: string | null;
  ingredients: string | null;
  price: string | null;
  image: string | null; 
  _id: string | null;
};

type categoryData = {
  category: {
    categoryName: string | null;
    _id: string | null;
    foods: Food[] | null;
  };
};

type Food = {
  _id: string | null;
  foodName: string | null;
  price: number | null;
  image: string;
  ingredients: string | null;
};

export const ADialog: React.FC<categoryData> = ({ category }) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [imageData, setImageData] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [addFood, setAddFood] = useState<FoodInfoTypes>({
    foodName: null,
    ingredients: null,
    price: null,
    _id: null,
    image: "",
  });

  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState<categoryData[]>([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:1000/category`);
      setCategories(response.data.data);

      if (response.data.data.length > 0) {
        setCategoryId(response.data.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getCategoriesDetails = async () => {
    if (categoryId) {
      try {
        const response = await axios.get(
          `http://localhost:1000/category/${categoryId}`
        );
      } catch (error) {
        console.error("Error fetching categories details:", error);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      getCategoriesDetails();
    }
  }, [categoryId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImageData(selectedFile);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
    }
  };

  const createFood = async () => {
    try {
      await handleUpload();
      await fetch("http://localhost:1000/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: addFood.foodName,
          ingredients: addFood.ingredients,
          price: addFood.price,
          image: addFood.image,
          category: categoryId,
        }),
      });
      console.log(imageUrl);

      setPreviewImage(undefined);
      setImageData(null);
    } catch (error) {
      console.log(error);
    }
  };
  const NEXT_PUBLIC_CLOUDINARY_API_KEY = "634121889877712";
  const CLOUDINARY_UPLOAD_IMAGE_PRESET = "ml_default";
  const CLOUDINARY_NAME = "dena69edh";
  const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
  const handleUpload = async () => {
    if (!imageData) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_IMAGE_PRESET);
    formData.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY);

    try {
      const { data } = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAddFood((prev) => ({
        ...prev,
        image: data.secure_url as string,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };
  const onChangeFoodName = (e: event) => {
    setAddFood((prev) => ({
      ...prev,
      foodName: e.target.value,
    }));
  };

  const onChangeIngredients = (e: event) => {
    setAddFood((prev) => ({
      ...prev,
      ingredients: e.target.value,
    }));
  };

  const onChangePrice = (e: event) => {
    setAddFood((prev) => ({
      ...prev,
      price: e.target.value,
    }));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-[36px] h-[36px] bg-red-500 rounded-full inline-flex justify-start items-center gap-2 relative">
          <div className="w-4 h-4 relative overflow-hidden left-[9px]">
            <img className="w-4 h-4 absolute" src="plus.svg" />
          </div>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Add new dish to {category.categoryName}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-[412px] h-[60px] inline-flex justify-start items-start gap-6">
              <div>
                <p className="text-black pb-[8px]">Food name</p>
                <Input
                  placeholder="Type food name"
                  onChange={onChangeFoodName}
                />
              </div>
              <div>
                <p className="text-black pb-[8px]">Food price</p>
                <Input placeholder="Enter price..." onChange={onChangePrice} />
              </div>
            </div>
            <div className="w-[412px] h-[112px] inline-flex flex-col justify-start items-start gap-2 pt-[10px]">
              <p className="text-black">Ingredients</p>
              <Input
                className="h-[90px]"
                placeholder="List ingredients..."
                onChange={onChangeIngredients}
              />
            </div>
            <div className="w-[412px] h-[160px] inline-flex flex-col justify-start items-start gap-2 pt-[10px]">
              <p className="text-black">Food image</p>
              <label
                htmlFor="file-upload"
                className="cursor-pointer w-[412px] h-[138px] p-4 bg-[#d4d4d8] bg-opacity-5 rounded-md outline outline-1 outline-offset-[-1px] outline-blue-primary-20 outline-opacity-20 inline-flex flex-col justify-center items-center gap-2 overflow-hidden"
              >
                {previewImage && <img src={previewImage} width={200} />}

                <div className="flex flex-col justify-start items-center gap-2">
                  <div className="p-2 rounded-full inline-flex justify-start items-center gap-2.5">
                    <div className="w-4 h-4 relative overflow-hidden">
                      <img
                        className="w-[16px] h-[16px] absolute outline outline-1 outline-offset-[-0.50px] outline-border-border-foreground"
                        src="image.svg"
                        alt="icon"
                      />
                    </div>
                  </div>

                  <div className="self-stretch text-center justify-start text-text-text-primary text-sm font-medium font-['Inter'] leading-tight">
                    Choose a file or drag & drop it here
                  </div>
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                className="absolute top-[270px] left-[23px] w-[10px] invisible"
                onChange={handleFileChange}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => createFood()}>
            Add dish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
