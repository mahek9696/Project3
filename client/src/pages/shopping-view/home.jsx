import { Button } from "@/components/ui/button";
import bannerTwo from "../../assets/BannerOne.png";
import bannerFour from "../../assets/ss1.png";
import bannerFive from "../../assets/ss2.png";
import bannerOne from "../../assets/account2.png";
import bannerThree from "../../assets/logo.png";
import logo from "../../assets/logo4.png";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  GemIcon,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
  Phone,
  Globe,
  Mail,
  // Whatsapp,
  X,
  // Facebook,
  // Instagram,
  // Youtube,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { toast } from "@/hooks/use-toast";
import { getFeatureImages } from "@/store/common-slice";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerTwo, bannerOne, bannerThree];
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth) || { user: {} };
  const navigate = useNavigate();

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  // single definition of product details handler
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
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
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    // use featureImageList if available, otherwise fallback to static slides
    const slideCount =
      (featureImageList && featureImageList.length) || slides.length;
    if (!slideCount) return; // avoid modulo by zero / NaN

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 2000);

    return () => clearInterval(timer);
  }, [featureImageList?.length, slides.length]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // console.log(productList, "productList");

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandsWithIcon = [
    { id: "khadisutra", label: "Khadisutra", icon: GemIcon },
    { id: "nike", label: "Nike", icon: ShirtIcon },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
  ];
  const colorWithIcon = [
    // { id: "black", label: "Black", color: "#000000" },
    // { id: "white", label: "White", color: "#FFFFFF" },
    { id: "red", label: "Red", color: "#E3301C" },
    { id: "blue", label: "Blue", color: "#2471A3" },
    { id: "green", label: "Green", color: "#28B463" },
    { id: "yellow", label: "Yellow", color: "#F1C40F" },
    { id: "purple", label: "Purple", color: "#8E44AD" },
    { id: "brown", label: "Brown", color: "#BA4A00" },
    { id: "gray", label: "Gray", color: "#3A5169" },
    { id: "pink", label: "Pink", color: "#FF69B4" },
    { id: "orange", label: "Orange", color: "#F39C12" },
    {
      id: "multicolor",
      label: "Multicolor",
      color:
        "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
    },
  ];

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <img
        className="pl-60 pt-20 pb-20 w-2/3 h-1/3 ml-12 overflow-hidden rounded-md object-cover"
        src={bannerOne}
        alt="Banner"
      />
      <div className="h-auto font-montserrat bg-white p-6 mt-6 rounded-md shadow-md gap-5">
        <p className="">
          {" "}
          Instead of offering plastic decorative gifts or bouquets for welcoming
          guests and dignitaries, adopt “Khadisutra” as a symbol of respect and
          tradition. At Gujarat Vidyapith, students, teachers, and all staff
          members spin yarn on charkha every day during morning prayer in a
          spiritual and devotional atmosphere. This practice promotes inner
          reflection and devotion, embodying the essence of "Khadisutra."
        </p>
      </div>
      {/* <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-80 " : "opacity-0"
                } absolute top-0 left-0 w-full h-full pt-10 object-cover transition-opacity-30 duration-5000 `}
              />
            ))
          : null}

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div> */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
      <section className="py-12 mt-6 rounded-2xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-red-950 font-montserrat text-center mb-8">
            Shop by Color
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 p-6 rounded-2xl">
            {colorWithIcon.map((colorItem) => (
              <Card
                key={colorItem.id}
                onClick={() => handleNavigateToListingPage(colorItem, "color")}
                className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-white rounded-xl"
              >
                <CardContent className="flex flex-col items-center justify-center p-6 rounded-4xl">
                  <div
                    className="w-12 h-12 rounded-full mb-4"
                    style={{
                      background: colorItem.color,
                      border:
                        colorItem.id === "white" ? "2px solid #e2e8f0" : "none",
                    }}
                  />
                  {/* <span className="font-bold">{colorItem.label}</span> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="flex justify-center mt-6">
        <p className="text-center text-red-950 mb-6 text-xl font-montserrat p-20 bg-orange-50 rounded-md shadow-md">
          For the welcome and respect of guests and visitors, adopt “Khadi
          Sutra” instead of flowers, bouquets, or decorative plastic gifts. At
          Gujarat Vidyapith, students, teachers, and all staff members, during
          the daily prayer time, spin cotton on the charkha with devotion—filled
          with spiritual thoughts and the vibrations of self-reflection in their
          hearts—and prepare the “Khadi Sutra.”
        </p>
      </div>
      {/* <img
        className="relative w-full h-[600px] overflow-hidden pt-10 rounded-md object-cover"
        src={bannerFour}
        alt="Banner"
      /> */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-montserrat text-red-950 text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id || productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      {/* footer */}
      <div className="mt-auto font-montserrat ">
        <footer className="bg-orange-50 opacity-75 text-red-950 py-10 rounded-md shadow-md">
          <div className="max-w-6xl mx-auto px-6 border-2 border-red-950 p-6 rounded-md">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-montserrat">
              संपर्क
            </h2>
            {/* center column - description */}
            <div className="text-center md:text-center mb-8">
              <p className="text-3xl md:text-3xl font-semibold">
                विद्यार्थी रमत गमत, सांस्कृतिक और कल्याण शाखा, गुजरात विद्यापीठ,
                अहमदाबाद
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* left column - phone & website */}
              <div className="flex flex-col items-start gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-950 text-orange-100 rounded-full p-3">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold">
                      96620 04971, 70166 09388
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-red-950 text-orange-100 rounded-full p-3">
                    <Globe className="w-6 h-6" />
                  </div>
                  <a
                    href="https://www.gujaratvidyapith.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg md:text-xl font-bold underline"
                  >
                    www.gujaratvidyapith.org
                  </a>
                </div>
              </div>

              {/* right column - email & socials */}
              <div className="pl-60 items-end md:text-right">
                <div className="flex items-center gap-4">
                  <div className="bg-red-950 text-orange-100 rounded-full p-3">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="text-lg md:text-xl font-bold">
                    sscw@gujaratvidyapith.org
                  </div>
                </div>

                {/* <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="bg-white rounded-full p-2 text-[#8B1D1D] flex items-center justify-center"
                    aria-label="Whatsapp"
                  >
                    <Whatsapp className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white rounded-full p-2 text-[#8B1D1D] flex items-center justify-center"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white rounded-full p-2 text-[#8B1D1D] flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white rounded-full p-2 text-[#8B1D1D] flex items-center justify-center"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white rounded-full p-2 text-[#8B1D1D] flex items-center justify-center"
                    aria-label="X"
                  >
                    <X className="w-5 h-5" />
                  </a>

                  <span className="ml-3 text-lg md:text-xl font-bold">
                    @gvp1920
                  </span>
                </div> */}
              </div>
            </div>

            <p className="text-center mt-6 text-sm opacity-80">
              &copy; {new Date().getFullYear()} Khadi Sutra. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ShoppingHome;
