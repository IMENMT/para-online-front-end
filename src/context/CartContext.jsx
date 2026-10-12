
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import api from "../services/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  // Récupérer le nombre d'articles du panier
  const refreshCartCount = useCallback(async () => {
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const response = await api.get("/cart");

      const items = response.data.items || [];

      const count = items.reduce(
        (total, item) => total + Number(item.quantity),
        0
      );

      setCartCount(count);
    } catch (error) {
      if (error.response?.status === 404) {
        setCartCount(0);
        return;
      }

      console.error("Erreur compteur panier :", error);
    }
  }, [token]);

  // Charger le compteur au démarrage et après connexion/déconnexion
  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCartCount,
        getCartCount: refreshCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }

  return context;
}
