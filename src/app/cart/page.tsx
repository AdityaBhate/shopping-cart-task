'use client';

import {useAppDispatch, useAppSelector} from '@/hooks/use-redux-hooks';
import {Product} from '@/services/fakestoreapi';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {removeItem, updateQuantity} from '@/redux/cartSlice';
import {useEffect, useState} from 'react';
import {Minus, Plus, Trash2} from 'lucide-react';
import axios from 'axios';

interface CartItemWithDetails {
  id: number;
  quantity: number;
  product: Product | null;
}

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [cartItemsWithDetails, setCartItemsWithDetails] = useState<
    CartItemWithDetails[]
  >([]);

  useEffect(() => {
    const fetchCartItemsDetails = async () => {
      const itemsWithDetails: CartItemWithDetails[] = [];
      for (const item of cartItems) {
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${item.id}`
          );
          const product: Product = response.data;
          itemsWithDetails.push({
            id: item.id,
            quantity: item.quantity,
            product: product,
          });
        } catch (error) {
          console.error(
            'Failed to fetch product details for item ID:',
            item.id,
            error
          );
          itemsWithDetails.push({
            id: item.id,
            quantity: item.quantity,
            product: null,
          });
        }
      }
      setCartItemsWithDetails(itemsWithDetails);
    };

    fetchCartItemsDetails();
  }, [cartItems]);

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
  };

  const handleIncreaseQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      dispatch(updateQuantity({id: itemId, quantity: item.quantity + 1}));
    }
  };

  const handleDecreaseQuantity = (itemId: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({id: itemId, quantity: item.quantity - 1}));
    } else if (item && item.quantity === 1) {
      dispatch(removeItem(itemId));
    }
  };

  const calculateTotal = () => {
    return cartItemsWithDetails.reduce((total, item) => {
      if (item.product) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="bg-background p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Your Cart</h1>
      </header>
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center flex-grow">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col gap-4">
              <p className="text-lg font-semibold">Your cart is empty.</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center p-4 flex-grow">
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {cartItemsWithDetails.map((item) =>
                  item.product ? (
                    <li key={item.id} className="py-4">
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-1">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-24 h-24 object-cover rounded"
                          />
                        </div>
                        <div className="col-span-2">
                          <p className="font-semibold">{item.product.title}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price}
                          </p>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="h-6 w-6"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="h-6 w-6"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
              <div className="mt-4 flex justify-end font-semibold">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
