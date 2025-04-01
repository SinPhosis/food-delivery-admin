import { useEffect, useState } from "react";
import axios from "axios";
import { ADialog } from "./dialog";

type categoryData = {
  categoryName: string | null;
  _id: string | null;
  foods: Food[] | null;
};

type Food = {
  _id: string | null;
  foodName: string | null;
  price: number | null;
  image: string;
  ingredients: string | null;
};

export const ProductList = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<categoryData[]>([]);
  const [categoryFoods, setCategoryFoods] = useState<{ [key: string]: Food[] }>(
    {}
  );

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

  const getCategoryFoods = async (categoryId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/category/${categoryId}`
      );
      setCategoryFoods((prevFoods) => ({
        ...prevFoods,
        [categoryId]: response.data.data.foods,
      }));
    } catch (error) {
      console.error("Error fetching foods for category:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      getCategoryFoods(categoryId);
    }
  }, [categoryId]);

  return (
    <div className="w-[1171px] h-auto inline-flex flex-col justify-start items-start gap-5 overflow-hidden absolute left-[220px] top-[250px]">
      {categories.length === 0 ? (
        <p>Loading...</p>
      ) : (
        categories.map((category) => (
          <div
            key={category._id}
            className="w-[1100px] p-5 bg-white rounded-xl flex justify-start items-start gap-4 overflow-hidden"
          >
            <div className="inline-flex justify-start items-center gap-2">
              <div className="justify-start text-xl font-semibold font-['Inter'] leading-7">
                {category.categoryName}
              </div>
            </div>
            <div className="w-[270px] h-[241px] px-4 py-2 rounded-[20px] border-[1px] border-dashed border-red-500 inline-flex flex-col justify-center items-center gap-6 overflow-hidden relative">
              <ADialog category={category} />
              <div className="w-40 text-center justify-start text-text-text-secondary-foreground text-sm font-medium font-['Inter'] leading-tight">
                Add new Dish to category
              </div>
            </div>
            {categoryFoods[category._id || ""] &&
            categoryFoods[category._id || ""].length > 0 ? (
              categoryFoods[category._id || ""].map((food) => (
                <div
                  key={food._id}
                  className="w-[270px] h-[241px] bg-white rounded-[20px] outline flex-col inline-flex items-start gap-5"
                >
                  <div className="pt-[7px] rounded-xl inline-flex justify-end items-end overflow-hidden">
                    <div className="self-stretch px-4 py-2 bg-white rounded-full justify-center items-center gap-2">
                      <img
                        src={food.image}
                        className="w-[258px] h-[129px] relative overflow-hidden rounded-2xl"
                      />
                      <button className="w-[40px] h-[40px] left-[220px] top-[420px] absolute rounded-full bg-white">
                        <img
                          src="edit-2.svg"
                          className="absolute bottom-[12px] left-[10px]"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="pb-[30px] ml-[20px]">
                    <span className="text-red-500 text-sm font-medium font-['Inter'] leading-tight">
                      {food.foodName}
                    </span>
                    <span className="ml-[50px] text-xs font-normal font-['Inter'] leading-none">
                      ${food.price}
                    </span>
                    <div className="text-xs font-normal font-['Inter'] leading-none">
                      {food.ingredients}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No food found for this category</div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
