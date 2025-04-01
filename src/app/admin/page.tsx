"use client";
import { SideBar } from "../_components/side-bar";
import { HeaderBar } from "../_components/header-bar";
import { ProductList } from "../_components/product-list";
const FoodMenu = () => {
  return (
    <div className="w-auto h-[4300px] relative bg-[#e5e7eb]">
      <SideBar />
      <HeaderBar />
      <ProductList />
    </div>
  );
};
export default FoodMenu