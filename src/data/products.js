const categories = [
  {
    id: 1,
    name: "Suits",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/6190580a30afc3578097cda7/6ad8351a-f172-4804-9b70-ab96813fc4e2/price-stores-suit-jackets-on-hangers.jpg",
  },
  {
    id: 2,
    name: "T-Shirts",
    imageUrl:
      "https://muselot.in/cdn/shop/products/Shopping-is-my-cardio-printed-T-shirt-in-black-color-muselot_2048x.png?v=1644491284",
  },
  {
    id: 3,
    name: "Accessories",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4XWK_pwPoh5nUV6MlamAcN5lM1112xbNEg&s",
  },
];

const products = [
  {
    id: 1,
    categoryId: 1,
    name: "Classic Black Suit",
    description:
      "A timeless black suit perfect for formal occasions and business meetings.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Wool",
      size: "40-46",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["40", "42", "44", "46"],
    stockLevel: 5,
    price: 299.99,
  },
  {
    id: 2,
    categoryId: 1,
    name: "Navy Blue Suit",
    description:
      "An elegant navy blue suit ideal for professional settings and interviews.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Wool",
      size: "40-46",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["40", "42", "44", "46"],
    stockLevel: 5,
    price: 349.99,
  },
  {
    id: 3,
    categoryId: 1,
    name: "Gray Pinstripe Suit",
    description:
      "A sophisticated gray pinstripe suit for a sharp and modern look.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Wool",
      size: "40-46",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["40", "42", "44", "46"],
    stockLevel: 5,
    price: 399.99,
  },
  {
    id: 4,
    categoryId: 1,
    name: "Charcoal Suit",
    description: "A versatile charcoal suit suitable for everyday formal wear.",
    images: [
      "https://images.unsplash.com/photo-1506629905607-0b3b3b3b3b3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Wool",
      size: "40-46",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["40", "42", "44", "46"],
    stockLevel: 5,
    price: 399.99,
  },
  {
    id: 5,
    categoryId: 1,
    name: "Beige Suit",
    description:
      "A light beige suit perfect for summer events and casual formal occasions.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Wool",
      size: "40-46",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["40", "42", "44", "46"],
    stockLevel: 5,
    price: 349.99,
  },
  {
    id: 6,
    categoryId: 1,
    name: "Burgundy Suit",
    description:
      "A bold burgundy suit for making a statement at special occasions.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Wool",
      size: "40-46",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["40", "42", "44", "46"],
    stockLevel: 5,
    price: 449.99,
  },
  {
    id: 7,
    categoryId: 1,
    name: "Olive Green Suit",
    description:
      "A unique olive green suit for a modern and distinctive appearance.",
    images: [
      "https://images.unsplash.com/photo-1506629905607-0b3b3b3b3b3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Wool",
      size: "40-46",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["40", "42", "44", "46"],
    stockLevel: 5,
    price: 429.99,
  },
  {
    id: 8,
    categoryId: 1,
    name: "Tan Suit",
    description:
      "A warm tan suit ideal for casual formal wear and outdoor events.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Wool",
      size: "40-46",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["40", "42", "44", "46"],
    stockLevel: 5,
    price: 379.99,
  },
  {
    id: 9,
    categoryId: 2,
    name: "Red Graphic T-Shirt",
    description:
      "A vibrant red t-shirt featuring a cool graphic design for casual outings.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Cotton",
      size: "S-XL",
      careInstructions: "Machine wash cold",
    },
    availableSizes: ["S", "M", "L", "XL"],
    stockLevel: 10,
    price: 29.99,
  },
  {
    id: 10,
    categoryId: 2,
    name: "Blue V-Neck T-Shirt",
    description:
      "A soft blue V-neck t-shirt, a wardrobe essential for everyday comfort.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Cotton",
      size: "S-XL",
      careInstructions: "Machine wash cold",
    },
    availableSizes: ["S", "M", "L", "XL"],
    stockLevel: 10,
    price: 19.99,
  },
  {
    id: 11,
    categoryId: 2,
    name: "Black Sleeveless T-Shirt",
    description:
      "A comfortable black sleeveless t-shirt for workouts and hot days.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Cotton",
      size: "S-XL",
      careInstructions: "Machine wash cold",
    },
    availableSizes: ["S", "M", "L", "XL"],
    stockLevel: 10,
    price: 21.99,
  },
  {
    id: 12,
    categoryId: 2,
    name: "White Pocket T-Shirt",
    description:
      "A classic white t-shirt with a small chest pocket for a subtle detail.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Cotton",
      size: "S-XL",
      careInstructions: "Machine wash cold",
    },
    availableSizes: ["S", "M", "L", "XL"],
    stockLevel: 10,
    price: 24.99,
  },
  {
    id: 13,
    categoryId: 2,
    name: "Green Striped T-Shirt",
    description:
      "A fun green striped t-shirt perfect for casual and relaxed vibes.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Cotton",
      size: "S-XL",
      careInstructions: "Machine wash cold",
    },
    availableSizes: ["S", "M", "L", "XL"],
    stockLevel: 10,
    price: 23.99,
  },
  {
    id: 14,
    categoryId: 2,
    name: "Yellow Polo T-Shirt",
    description: "A bright yellow polo t-shirt for sporty and energetic days.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Cotton",
      size: "S-XL",
      careInstructions: "Machine wash cold",
    },
    availableSizes: ["S", "M", "L", "XL"],
    stockLevel: 10,
    price: 25.99,
  },
  {
    id: 15,
    categoryId: 2,
    name: "Purple Hooded T-Shirt",
    description: "A cozy purple hooded t-shirt great for layering and comfort.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Cotton",
      size: "S-XL",
      careInstructions: "Machine wash cold",
    },
    availableSizes: ["S", "M", "L", "XL"],
    stockLevel: 10,
    price: 27.99,
  },
  {
    id: 16,
    categoryId: 2,
    name: "Orange Printed T-Shirt",
    description:
      "An eye-catching orange t-shirt with a unique and creative print.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Cotton",
      size: "S-XL",
      careInstructions: "Machine wash cold",
    },
    availableSizes: ["S", "M", "L", "XL"],
    stockLevel: 10,
    price: 24.99,
  },
  {
    id: 17,
    categoryId: 3,
    name: "Striped Silk Tie",
    description: "A classic striped silk tie to elevate your formal attire.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Silk",
      size: "One Size",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["One Size"],
    stockLevel: 3,
    price: 59.99,
  },
  {
    id: 18,
    categoryId: 3,
    name: "Solid Blue Tie",
    description: "A solid blue tie that complements any suit perfectly.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Silk",
      size: "One Size",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["One Size"],
    stockLevel: 3,
    price: 49.99,
  },
  {
    id: 19,
    categoryId: 3,
    name: "Paisley Tie",
    description: "A patterned paisley tie for a touch of elegance and style.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Silk",
      size: "One Size",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["One Size"],
    stockLevel: 3,
    price: 69.99,
  },
  {
    id: 20,
    categoryId: 3,
    name: "Red Bow Tie",
    description: "A red bow tie ideal for special events and celebrations.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Silk",
      size: "One Size",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["One Size"],
    stockLevel: 3,
    price: 39.99,
  },
  {
    id: 21,
    categoryId: 3,
    name: "Black Skinny Tie",
    description: "A slim black tie for a modern and sleek appearance.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Silk",
      size: "One Size",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["One Size"],
    stockLevel: 3,
    price: 54.99,
  },
  {
    id: 22,
    categoryId: 3,
    name: "Gold Patterned Tie",
    description:
      "A gold patterned tie perfect for festive and formal occasions.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Silk",
      size: "One Size",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["One Size"],
    stockLevel: 3,
    price: 79.99,
  },
  {
    id: 23,
    categoryId: 3,
    name: "Navy Polka Dot Tie",
    description: "A navy polka dot tie for a playful yet sophisticated look.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    ],
    specifications: {
      material: "Silk",
      size: "One Size",
      careInstructions: "Dry clean only",
    },
    availableSizes: ["One Size"],
    stockLevel: 3,
    price: 64.99,
  },
];

export { categories, products };
