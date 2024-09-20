import { useState, useEffect } from 'react';
import { db } from '../data/db';
export const useCart = () => {

    const initialCart = () => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    }

    const [data, setData] = useState(db);

    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 9;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart), [cart]);
    });

    function addToCart(item) {

        const itemExist = cart.findIndex((i) => i.id === item.id);

        if (itemExist >= 0) { //existe en el carrito, aumentar cantidad
            if (cart[itemExist].quantity >= MAX_ITEMS) {
                return;
            }
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity ++;
            setCart(updatedCart);
        }else{ //no existe en el carrito, agregarlo
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    function removeToCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
    }

    function incrementQuantity(id) {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
                guitar.quantity ++;
            }
            return guitar;
        });
        setCart(updatedCart);
    }

    function decrementQuantity(id) {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
                guitar.quantity --;
            }
            return guitar;
        });
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    return {
        data,
        cart,
        setCart,
        addToCart,
        removeToCart,
        incrementQuantity,
        decrementQuantity,
        clearCart
    }
}