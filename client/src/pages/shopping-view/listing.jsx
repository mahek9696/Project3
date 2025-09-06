import ProductFilter from "@/components/shopping-view/filter";

function ShoppingListing() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 ">
      {/* Product items will be rendered here */}
      <ProductFilter />
    </div>
  );
}

export default ShoppingListing;
