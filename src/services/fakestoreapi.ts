/**
 * Represents a product from the Fake Store API.
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Fetches all products from the Fake Store API.
 * @returns A promise that resolves to an array of products.
 */
export async function getAllProducts(): Promise<Product[]> {
  // TODO: Implement this by calling the Fake Store API.
  return [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image:
        'https://fakestoreapi.com/img/81fPKd-mHL._AC_SL1500_.jpg',
      rating: { rate: 3.9, count: 120 },
    },
    {\n      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts ',
      price: 22.3,
      description:
        'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and active sport wear.',
      category: "men's clothing",
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      rating: { rate: 4.1, count: 259 },
    },
  ];
}

/**
 * Fetches a single product from the Fake Store API by its ID.
 * @param id The ID of the product to retrieve.
 * @returns A promise that resolves to a Product object, or null if not found.
 */
export async function getProductById(id: number): Promise<Product | null> {
  // TODO: Implement this by calling the Fake Store API.
  const allProducts = await getAllProducts();
  const product = allProducts.find((p) => p.id === id);
  return product || null;
}
