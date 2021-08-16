import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

function CartContextProvider (props) {
    
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/database_project/get_Product_details.php')
        .then (res =>{
            setProducts(res.data)
        })
    },[])

    const addToCart = (id) =>{
        const data = products.filter(product =>{
            return product.id === id
        })
        data.forEach(product =>{
            const obj = {
                id: product.id,
                Name: product.Name,
                Weight: product.Weight,
                Price: product.Price,
                Image: product.Image
            }
            console.log(obj);
            setCartProducts(previousState=> [...previousState, obj])
        })
        
        
        
        console.log(cartProducts);
    }

    return (
        <CartContext.Provider value={{addToCart, cartProducts}}>
            {props.children}
        </CartContext.Provider>
    );
    
}
 
export default CartContextProvider;
