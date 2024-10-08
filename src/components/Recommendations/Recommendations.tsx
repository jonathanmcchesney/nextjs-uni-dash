"use client";
import { IProduct } from "@/types/product";
import { useState } from "react";
import * as FeatherIcons from "react-icons/fi";

interface IRecommendationsProps {
  id: string;
  category: string;
  allProducts: IProduct[];
}

const Recommendations = ({
  id,
  category,
  allProducts,
}: IRecommendationsProps): JSX.Element => {
  const [recommendedItems] = useState<IProduct[]>(
    allProducts.filter(
      (product) => product.category === category && product.id !== id
    )
  );

  const renderIconComponent = (icon: string) => {
    const IconComponent =
      FeatherIcons[icon as keyof typeof FeatherIcons] || FeatherIcons.FiBox;

    return <IconComponent size={40} />;
  };

  return (
    <div>
      <h2>Recommended Products</h2>
      <div className="product-grid">
        {recommendedItems.map((product) => (
          <div className="product.item" key={product.id}>
            <h3>{product.name}</h3>
            {renderIconComponent(product.icon)}
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
