"use client";
import React, { createContext, useState } from "react";

export const CartItem = createContext();

export default function CartProvider({ children }) {
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState(null);

  const handleCartItems = (items, quan, selectedVariant) => {
    let arr = [...carts];

    let itemIndex = arr.findIndex((item) => {
      if (selectedVariant) {
        return (
          item._id === items._id && item.selectedVariant === selectedVariant
        );
      } else {
        return item._id === items._id && !item.selectedVariant;
      }
    });

    if (itemIndex === -1) {
      arr.push({
        ...items,
        quantity: quan || 1,
        selectedVariant: selectedVariant || null,
      });
    } else {
      arr[itemIndex].quantity += quan || 1;
    }

    setCarts(arr);
  };

  const removeCartItems = (id) => {
    let arr = carts;
    let itemIndex = carts.findIndex((item) => item._id == id);
    arr.splice(itemIndex, 1);
    setCarts([...arr]);
  };
  const IsItemAdded = (id) => {
    let arr = carts;
    let itemIndex = carts.findIndex((item) => item._id == id);
    if (itemIndex == -1) return null;
    else return arr[itemIndex].quantity;
  };
  const decreaseItem = (id) => {
    let arr = carts;
    let itemIndex = carts.findIndex((item) => item._id == id);
    if (arr[itemIndex].quantity == 1) {
      return;
    }
    arr[itemIndex].quantity--;
    setCarts([...arr]);
  };

  return (
    <CartItem.Provider
      value={{
        setCarts,
        carts,
        handleCartItems,
        removeCartItems,
        IsItemAdded,
        decreaseItem,
        user,
        setUser,
      }}
    >
      {children}
    </CartItem.Provider>
  );
}
