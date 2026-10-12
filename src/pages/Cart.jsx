
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cart.css";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fonction pour actualiser le compteur du panier
  const { refreshCartCount } = useCart();

  // ==========================================
  // RÉCUPÉRER LE PANIER
  // ==========================================
  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCart([]);
        return;
      }

      const response = await api.get("/cart");

      const items = response.data.items || [];

      setCart(items);

      // Actualiser le compteur dans la Navbar
      await refreshCartCount();

    } catch (error) {
      console.error("Erreur récupération panier :", error);

      if (error.response?.status === 404) {
        setCart([]);
      }
    }
  };

  // Charger le panier au démarrage
  useEffect(() => {
    getCart();
  }, []);

  // ==========================================
  // AUGMENTER LA QUANTITÉ
  // ==========================================
  const increaseQuantity = async (productId, quantity) => {
    try {
      await api.put("/cart/update", {
        productId,
        quantity: quantity + 1,
      });

      await getCart();

    } catch (error) {
      console.error("Erreur quantité :", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la modification"
      );
    }
  };

  // ==========================================
  // DIMINUER LA QUANTITÉ
  // ==========================================
  const decreaseQuantity = async (productId, quantity) => {
    if (quantity === 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      await api.put("/cart/update", {
        productId,
        quantity: quantity - 1,
      });

      await getCart();

    } catch (error) {
      console.error("Erreur quantité :", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la modification"
      );
    }
  };

  // ==========================================
  // SUPPRIMER UN PRODUIT
  // ==========================================
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);

      toast.success("Produit supprimé du panier");

      // Actualiser le panier ET le compteur
      await getCart();

    } catch (error) {
      console.error("Erreur suppression :", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression"
      );
    }
  };

  // ==========================================
  // CALCULER LE TOTAL
  // ==========================================
  const total = cart.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  // ==========================================
  // AFFICHAGE
  // ==========================================
  return (
    <div className="cart-page">
      <div className="cart-container">

        <h1>🛒 Mon panier</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Votre panier est vide</h2>

            <p>
              Découvrez nos produits de parapharmacie et
              ajoutez vos produits préférés à votre panier.
            </p>

            <Link
              to="/products"
              className="continue-shopping"
            >
              Découvrir les produits
            </Link>

          </div>
        ) : (
          <>
            {/* ==================================
                PRODUITS DU PANIER
            ================================== */}

            <div className="cart-items">

              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item.product._id}
                >

                  {/* Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-image"
                  />

                  {/* Informations */}
                  <div className="cart-item-info">

                    <h3>
                      {item.product.name}
                    </h3>

                    <p>
                      {item.product.description}
                    </p>

                    <strong>
                      {item.product.price} DT
                    </strong>

                    {/* Actions */}
                    <div className="cart-actions">

                      {/* Quantité */}
                      <div className="quantity-controls">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.product._id,
                              item.quantity
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.product._id,
                              item.quantity
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                      {/* Suppression */}
                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(
                            item.product._id
                          )
                        }
                      >
                        🗑️ Supprimer
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* ==================================
                TOTAL ET COMMANDE
            ================================== */}

            <div className="cart-total">

              <h2>
                Total : {total.toFixed(2)} DT
              </h2>

              <button
                className="checkout-button"
                onClick={() => navigate("/checkout")}
              >
                Passer la commande
              </button>

            </div>

          </>
        )}

      </div>
    </div>
  );
}

export default Cart;
