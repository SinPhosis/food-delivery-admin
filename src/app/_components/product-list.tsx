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
import { useState } from "react";
import axios from "axios";

type FoodInfoTypes = {
  foodName: string | null;
  ingredients: string | null;
  price: string | null;
  image: string | null;
  _id: string | null;
};

type event = {
  target: {
    value: string;
  };
};

const NEXT_PUBLIC_CLOUDINARY_API_KEY = "634121889877712";
const CLOUDINARY_UPLOAD_IMAGE_PRESET = "ml_default";
const CLOUDINARY_NAME = "dsqof0pnm";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/auto/upload`;

export const ProductList = () => {
  const [imageData, setImageData] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [imageUrl, setImageUrl] = useState("");
  const [addFood, setAddFood] = useState<FoodInfoTypes>({
    foodName: null,
    ingredients: null,
    price: null,
    image: null,
    _id: null,
  });

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
      console.log(data);

      if (data.status === "success") {
        setImageUrl(data.secure_url);
        setAddFood((prev) => ({
          ...prev,
          image: data.secure_url,
        }));
      } else {
        alert("Upload failed: " + data.statusText);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const createFood = async () => {
    try {
      await fetch("http://localhost:900/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: addFood.foodName,
          ingredients: addFood.ingredients,
          price: addFood.price,
          image: addFood.image,
        }),
      });

      setAddFood({
        foodName: null,
        ingredients: null,
        price: null,
        image: null,
        _id: null,
      });
      setPreviewImage(undefined);
      setImageData(null);     
    } catch (error) {
      console.log(error);
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
    <div className="w-[1171px] h-[740px] inline-flex flex-col justify-start items-start gap-5 overflow-hidden absolute left-[220px] top-[250px]">
      <div className="self-stretch p-5 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
        <div className="inline-flex justify-start items-center gap-2">
          <div className="justify-start text-xl font-semibold font-['Inter'] leading-7">
            Appetizers
          </div>
        </div>
        <div className="w-[270px] h-[241px] px-4 py-2 rounded-[20px] border-[1px] border-dashed border-red-500 inline-flex flex-col justify-center items-center gap-6 overflow-hidden relative">
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
                <AlertDialogTitle>Add new dish to Appetizers</AlertDialogTitle>
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
                      <Input
                        placeholder="Enter price..."
                        onChange={onChangePrice}
                      />
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
                      className="cursor-pointer w-[412px] h-[138px] p-4 bg-blue-600 bg-opacity-5 rounded-md outline outline-1 outline-offset-[-1px] outline-blue-primary-20 outline-opacity-20 inline-flex flex-col justify-center items-center gap-2 overflow-hidden"
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
                <AlertDialogAction onClick={() => handleUpload()}>
                  Add dish
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <div className="w-40 text-center justify-start text-text-text-secondary-foreground text-sm font-medium font-['Inter'] leading-tight">
            Add new Dish to Appetizers{" "}
          </div>
        </div>
      </div>
    </div>
  );
};
