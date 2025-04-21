'use client';

import {Product, getAllProducts} from '@/services/fakestoreapi';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import {ShoppingCart} from 'lucide-react';

export default function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productData = await getAllProducts();
        setProducts(productData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    const userCredentials = localStorage.getItem('userCredentials');
    if (!userCredentials) {
      router.push('/auth/login');
      return;
    }

    fetchProducts();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userCredentials');
    router.push('/auth/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="bg-background p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">ShopEasy</h1>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="outline">
              <ShoppingCart className="mr-2" />
              Cart
            </Button>
          </Link>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {loading ? (
          <div>Loading products...</div>
        ) : (
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full object-contain"
                  />
                  <p className="text-lg font-semibold">Price: ${product.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
