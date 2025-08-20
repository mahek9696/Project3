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
      { id: "men", value: "Men" },
      { id: "women", value: "Women" },
      { id: "kids", value: "Kids" },
      { id: "accessories", value: "Accessories" },
      { id: "footwear", value: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", value: "Nike" },
      { id: "adidas", value: "Adidas" },
      { id: "puma", value: "Puma" },
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
