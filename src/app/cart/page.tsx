'use client';

import {useAppDispatch, useAppSelector} from '@/hooks/use-redux-hooks';
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
import {Trash2} from 'lucide-react';

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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
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
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <label htmlFor={`quantity-${item.id}`}>
                            Quantity:
                          </label>
                          <input
                            type="number"
                            id={`quantity-${item.id}`}
                            value={quantities[item.id] || item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value, 10)
                              )
                            }
                            className="w-20 border border-input rounded-md px-2 py-1 text-sm"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleUpdateQuantity(item.id)}
                          >
                            Update
                          </Button>
                        </div>
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
                ))}
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
