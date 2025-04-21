'use client';

import {useAppDispatch, useAppSelector} from '@/hooks/redux-hooks';
import {Product} from '@/services/fakestoreapi';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {removeItem, updateQuantity} from '@/redux/cartSlice';
import {useState} from 'react';

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
    const newQuantities = {...quantities};
    delete newQuantities[itemId];
    setQuantities(newQuantities);
  };

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setQuantities({...quantities, [itemId]: quantity});
  };

  const handleUpdateQuantity = (itemId: number) => {
    dispatch(updateQuantity({id: itemId, quantity: quantities[itemId]}));
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <header className="bg-background p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Your Cart</h1>
      </header>
      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col gap-4">
              <p className="text-lg font-semibold">Your cart is empty.</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="h-full">
              <CardHeader>
                <CardTitle>Product ID: {item.id}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-lg font-semibold">
                  Quantity:
                  <input
                    type="number"
                    value={quantities[item.id] || item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className="w-20 border border-input rounded-md px-2 py-1 text-sm"
                  />
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={() => handleUpdateQuantity(item.id)}>
                  Update Quantity
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
