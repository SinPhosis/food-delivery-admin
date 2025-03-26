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

  const categoryId = "67e25af130b1e6f192b80fcd";

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:900/category/${categoryId}`
      );
      setCategories(response.data.data);
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
    return <p>{error}</p>; // Show error message if something goes wrong
  }

  return (
    <div>
      {categories.map((cat) => (
        <div
          key={`Alldish${cat._id}`}
          className="w-[1150px] p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-4 overflow-hidden relative left-12 mt-12"
        >
          <p>{cat.categoryName}</p> 
          <div className="grid gap-8 grid-cols-4">
            {cat.foods && cat.foods.length > 0 ? ( 
              cat.foods.map((food) => (
                <div key={food._id}>
                </div>
              ))
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
