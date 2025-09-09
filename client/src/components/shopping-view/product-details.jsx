import { StarHalfIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import { handler } from "tailwindcss-animate";
import { setProductDetails } from "@/store/shop/products-slice";
import { useEffect, useState } from "react";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    // setRating(0);
    // setReviewMsg("");
  }
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(getCurrentProductId);

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart successfully",
        });
      }
    });
  }
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-1 sm:p-7 max-w-xl sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden max-w-xs mx-auto mt-6 mb-6 rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className={{
              maxWidth: "100%",
              maxHeight: "600px",
              width: "auto",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
        <div className="pt-7 pr-5 flex flex-col">
          <div>
            <h1 className="text-lg font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-sm mb-2 mt-1">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-lg font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ₹{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-sm font-bold text-muted-foreground">
                ₹{productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {/* <StarRatingComponent rating={averageReview} /> */}
              <div className="flex items-center gap-0.5">
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <StarHalfIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
            <span className="text-muted-foreground">
              (4.5)
              {/* ({averageReview.toFixed(2)}) */}
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddtoCart(
                    productDetails?._id
                    // productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {/* {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => ( */}
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>
                    M{/* {reviewItem?.userName[0].toUpperCase()} */}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">
                      {/* {reviewItem?.userName} */}Mahek Patel
                    </h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>

                  <p className="text-muted-foreground">
                    {/* {reviewItem.reviewMessage} */}
                    Great product, fast shipping!
                  </p>
                </div>
              </div>
              {/* ))
              ) : (
                <h1>No Reviews</h1>
              )} */}
            </div>
            {/* ------------------------------------- */}

            <div className="grid gap-6">
              {/* {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => ( */}
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>
                    M{/* {reviewItem?.userName[0].toUpperCase()} */}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">
                      {/* {reviewItem?.userName} */}Mahek Patel
                    </h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>

                  <p className="text-muted-foreground">
                    {/* {reviewItem.reviewMessage} */}
                    Great product, fast shipping!
                  </p>
                </div>
              </div>
              {/* ))
              ) : (
                <h1>No Reviews</h1>
              )} */}
            </div>
            <div className="grid gap-6">
              {/* {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => ( */}
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>
                    M{/* {reviewItem?.userName[0].toUpperCase()} */}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">
                      {/* {reviewItem?.userName} */}Mahek Patel
                    </h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>

                  <p className="text-muted-foreground">
                    {/* {reviewItem.reviewMessage} */}
                    Great product, fast shipping!
                  </p>
                </div>
              </div>
              {/* ))
              ) : (
                <h1>No Reviews</h1>
              )} */}
            </div>
            <div className="grid gap-6">
              {/* {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => ( */}
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>
                    M{/* {reviewItem?.userName[0].toUpperCase()} */}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">
                      {/* {reviewItem?.userName} */}Mahek Patel
                    </h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>

                  <p className="text-muted-foreground">
                    {/* {reviewItem.reviewMessage} */}
                    Great product, fast shipping!
                  </p>
                </div>
              </div>
              {/* ))
              ) : (
                <h1>No Reviews</h1>
              )} */}
            </div>
            {/* ------------------------------------- */}
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                {/* <StarRatingComponent
                rating={rating}
                handleRatingChange={handleRatingChange}
                /> */}
              </div>
              <Input
                // name="reviewMsg"
                // value={reviewMsg}
                // onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
              // onClick={handleAddReview}
              // disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      {/* -------------------------------------------------------------------------------------------------- */}
      {/* <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className={{
              maxWidth: "100%",
              maxHeight: "600px",
              width: "auto",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
        <div>
          <h1 className="text-lg font-extrabold">{productDetails?.title}</h1>
          <p className="text-muted-foreground text-sm mb-2 mt-1">
            {productDetails?.description}
          </p>
        </div>
      </DialogContent> */}
    </Dialog>
  );
}
export default ProductDetailsDialog;
