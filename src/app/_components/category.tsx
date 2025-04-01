"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type Category = {
  _id: string | null;
  categoryName: string | null;
  foods: Food[] | null;
};

type Food = {
  _id: string | null;
  foodName: string | null;
  price: number | null;
  image: string | null;
  ingredients: string | null;
};

const CategoriesMap = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);

  const categoryId = "67e25af130b1e6f192b80fcd";

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/category/${categoryId}`
      );
      setFoods(response.data.data.foods);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch categories.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {categories.map((category) => (
        <div
          key={`All dish ${category._id}`}
          className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12"
        >
          <p>{category.categoryName}</p>
          <div className="grid gap-8 grid-cols-4">
            {category.foods && category.foods.length > 0 ? (
              category.foods.map((food) => <div key={food._id}></div>)
            ) : (
              <div>No food found</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesMap;
