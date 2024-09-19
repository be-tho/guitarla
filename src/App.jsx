import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Guitar from './components/Guitar';
import { db } from './data/db';

function App() {

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

  return (
    <>
        <Header 
            cart = {cart}
            removeToCart = {removeToCart}
            incrementQuantity = {incrementQuantity}
            decrementQuantity = {decrementQuantity}
            clearCart = {clearCart}
        />
    
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar) => (
                    <Guitar 
                        key = {guitar.id}
                        guitar = {guitar}
                        setCart = {setCart}
                        addToCart = {addToCart}
                     />
                ))}
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
    </>
  )
}

export default App
