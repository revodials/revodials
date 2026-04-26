import { fetchCatagory, fetchProductsbyCategoriesId } from "@/app/actions/products";
import FilterSelect from "@/app/componensts/filterselect";
import Footer from "@/app/componensts/footer";
import LoadMoreProducts from "@/app/componensts/loadmoreproduct";
import Navbar from "@/app/componensts/navbar";
export const revalidate = 21600;

export default async function Page({ params }) {
  const { id } = await params;

  const products = await fetchProductsbyCategoriesId(
    id && id !== "all" ? id : undefined,
    1
  );

  const category = await fetchCatagory();

  return (
    <div>
      <Navbar />

      <div className="py-10">
        <div className="lg:w-[20rem] text-black space-y-1 p-6">
          <label className="text-sm font-medium mb-1 block">
            Filter by category
          </label>

          <FilterSelect category={category} selectedId={id} />
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6">
          Mega Sale – Flat 40% OFF! 
        </h1>

       <div className="w-full flex justify-center"> <div className="lg:w-full xl:w-[91%] w-[97%] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-4 xl:gap-y-12 px-2 lg:px-20">
            <LoadMoreProducts initialProducts={products} id={id} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}