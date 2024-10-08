"use server";
import { getProducts } from "@/utils/productUtils";
import ProductList from "@/components/ProductList/ProductList";

const ProductPage = async () => {
  const products = await getProducts();
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
