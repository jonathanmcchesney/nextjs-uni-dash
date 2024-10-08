import { IProduct } from "@/types/product";
import path from "path";
import fs from "fs";

const getProducts = async (
  jsonPath: string = "public/data/products.json"
): Promise<IProduct[]> => {
  const filePath = path.join(process.cwd(), jsonPath);
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const products: IProduct[] = JSON.parse(jsonData);

  return products || [];
};

export { getProducts };
