import { notFound } from "next/navigation";
import { IProduct } from "@/types/product";
import { getProducts } from "@/utils/productUtils";

import dynamic from "next/dynamic";
import * as FeatherIcons from "react-icons/fi";

const Recommendations = dynamic(
  () => import("../../../components/Recommendations/Recommendations"),
  {
    loading: () => <div>Loading in pages component...</div>,
  }
);

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const products: IProduct[] = await getProducts();
  const product = products.find((product) => product.id === params.id);

  if (!product) {
    notFound();
  }

  const IconComponent =
    FeatherIcons[product?.icon as keyof typeof FeatherIcons] ||
    FeatherIcons.FiBox;

  return (
    <div>
      <h1>{product?.name}</h1>
      <IconComponent size={40} />
      <p>Category: {product?.category}</p>
      <p>Price: ${product?.price}</p>
      <br />
      <br />
      <Recommendations
        id={product.id}
        category={product.category}
        allProducts={products}
      />
    </div>
  );
}
