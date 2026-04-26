import ProductDetailClient from "@/app/componensts/productDetailClient";
import { fetchProductsById } from "@/app/actions/products";
export const revalidate = 21600;
export default async function ProductDetailPage({ params }) {
	const { id } = await params; 
  const product = await fetchProductsById(id);



  return (
      <ProductDetailClient data={product} />
  );
}
