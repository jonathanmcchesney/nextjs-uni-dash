"use client";
import { IProduct } from "@/types/product";
import { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";

interface IProductCardProps {
  products: IProduct[];
}

const ProductList = ({ products }: IProductCardProps): JSX.Element => {
  const [likedProductIds, setLikedProductIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const likedProducts = JSON.parse(
      localStorage.getItem("likedProducts") || "[]"
    ) as string[];

    setLikedProductIds(likedProducts);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading)
      localStorage.setItem("likedProducts", JSON.stringify(likedProductIds));
  }, [likedProductIds, loading]);

  return (
    <div className="product-grid">
      {loading ? (
        <div>Loading...</div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            likedProductIds={likedProductIds}
            setLikedProductIds={setLikedProductIds}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
