export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export const fetchProducts = async (
  count: number = 1000,
): Promise<Product[]> => {
  const products: Product[] = Array.from({length: count}, (_, i) => ({
    id: (i + 1).toString(),
    title: `Товар_${String(i + 1).padStart(4, '0')}`,
    price: Math.round(300 + Math.random() * 3033), // цена от 300 до 3333
    image: 'https://via.placeholder.com/150',
  }));

  return Promise.resolve(products);
};
