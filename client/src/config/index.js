export const registerFormControls = [
  {
    name: "email",
    label: "E-MAIL",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "phone",
    label: "PHONE",
    placeholder: "Enter your Phone",
    componentType: "input",
    type: "phone",
  },
  {
    name: "password",
    label: "PASSWORD",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "E-MAIL",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },

  {
    name: "password",
    label: "PASSWORD",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",

    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "unisex", label: "Unisex" },
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "khadisutra", label: "Khadisutra" },
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
    ],
  },
  // Add color dropdown
  {
    label: "Color",
    name: "color",
    componentType: "select",
    options: [
      { id: "black", label: "Black" },
      { id: "white", label: "White" },
      { id: "red", label: "Red" },
      { id: "blue", label: "Blue" },
      { id: "green", label: "Green" },
      { id: "yellow", label: "Yellow" },
      { id: "purple", label: "Purple" },
      { id: "brown", label: "Brown" },
      { id: "gray", label: "Gray" },
      { id: "multicolor", label: "Multicolor" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter product sale price",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock quantity",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  // {
  //   id: "men",
  //   label: "Men",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "women",
  //   label: "Women",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "kids",
  //   label: "Kids",
  //   path: "/shop/listing",
  // },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  // {
  //   id: "footwear",
  //   label: "Footwear",
  //   path: "/shop/listing",
  // },
];

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  khadisutra: "Khadisutra",
};

export const colorOptionsMap = {
  black: "Black",
  white: "White",
  red: "Red",
  blue: "Blue",
  green: "Green",
  yellow: "Yellow",
  purple: "Purple",
  brown: "Brown",
  gray: "Gray",
  multicolor: "Multicolor",
};

export const filterOptions = {
  // category: [
  //   { id: "unisex", label: "Unisex" },
  //   { id: "men", label: "Men" },
  //   { id: "women", label: "Women" },
  //   { id: "kids", label: "Kids" },
  //   { id: "accessories", label: "Accessories" },
  //   { id: "footwear", label: "Footwear" },
  // ],
  // brand: [
  //   { id: "khadisutra", label: "Khadisutra" },
  //   { id: "nike", label: "Nike" },
  //   { id: "adidas", label: "Adidas" },
  //   { id: "puma", label: "Puma" },
  // ],
  color: [
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "red", label: "Red" },
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
    { id: "yellow", label: "Yellow" },
    { id: "purple", label: "Purple" },
    { id: "brown", label: "Brown" },
    { id: "gray", label: "Gray" },
    { id: "multicolor", label: "Multicolor" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price - Low to High" },
  { id: "price-hightolow", label: "Price - High to Low" },
  { id: "title-atoz", label: "Title - A to Z" },
  { id: "title-ztoa", label: "Title - Z to A" },
];
export const addressFormControls = [
  {
    label: "User Name",
    name: "username",
    componentType: "input",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
