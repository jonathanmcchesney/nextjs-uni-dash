"use client";

import { IProduct } from "@/types/product";
import { useState, useEffect } from "react";
import * as FeatherIcons from "react-icons/fi"; 

interface IProductCardProps {
  product: IProduct;
  likedProductIds: string[];
  setLikedProductIds: React.Dispatch<React.SetStateAction<string[]>>
}

const ProductCard = ({ product, likedProductIds, setLikedProductIds }: IProductCardProps): JSX.Element => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const IconComponent =
    FeatherIcons[product.icon as keyof typeof FeatherIcons] ||
    FeatherIcons.FiBox;

  useEffect(() => {
    if (likedProductIds.includes(product.id)) {
      setIsLiked(true);
    }
  }, [product.id]);

  const handleLike = () => {
    if (likedProductIds.includes(product.id)) {
      setLikedProductIds((prev) => prev.filter((id) => id !== product.id));
      setIsLiked(false);
    } else {
      setLikedProductIds((prev) => [...prev, product.id]);
      setIsLiked(true);
    }
  };

  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <IconComponent size={40} />
      <p>Price: ${product.price}</p>
      <button onClick={handleLike}>{isLiked ? "Liked" : "Like"}</button>
    </div>
  );
};

export default ProductCard;
