'use client';

import {useAppDispatch} from '@/hooks/use-redux-hooks';
import type {Product} from '@/services/fakestoreapi';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {getProductById} from '@/services/fakestoreapi';
import {addItem} from '@/redux/cartSlice';

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productId = parseInt(id as string, 10);
        const productData = await getProductById(productId);
        setProduct(productData);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (productId: number) => {
    dispatch(addItem(productId));
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 w-full object-contain"
          />
          <p className="text-lg font-semibold">Price: ${product.price}</p>
          <p className="text-muted-foreground">{product.description}</p>
          <Button onClick={() => handleAddToCart(product.id)}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
