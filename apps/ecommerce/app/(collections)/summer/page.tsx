'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import truncateText from '../components/truncateText';

interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
export default function Example() {
  const [summer, setSummer] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json: { products: Product[] }) => setSummer(json.products));
  }, []);

  console.log(summer);
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {summer &&
              Array.isArray(summer) &&
              summer.map((product) => (
                <Link
                  key={product.id}
                  href="/product/[id]"
                  as={`/product/${product.id}`}
                  className="group bg-slate-50 p-2 "
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.images?.[0]}
                    
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {truncateText(product.title)}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
