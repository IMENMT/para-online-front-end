import { useEffect, useState } from "react";
import api from "../services/api";
import "./Products.css";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { refreshCartCount } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    getProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Veuillez vous connecter pour ajouter un produit au panier.");
        return;
      }

      const response = await api.post(
        "/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await refreshCartCount();
      console.log("Panier :", response.data);
      toast.success(`${product.name} ajouté au panier !`);
    } catch (error) {
      console.error("Erreur panier :", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de l'ajout au panier"
      );
    }
  };

  return (
    <div className="products-page">
      <div className="products-container">

        {/* En-tête */}
        <div className="products-header">
          <h1>Nos produits</h1>
          <p>
            Découvrez nos produits de parapharmacie sélectionnés
            pour votre bien-être.
          </p>
        </div>

        {/* Produits */}
        {products.length === 0 ? (
          <div className="products-empty">
            <div className="products-empty-icon">📦</div>
            <p>Aucun produit disponible pour le moment.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>

                {/* Image */}
                <div className="product-image-container">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  ) : (
                    <div className="product-no-image">
                      📷
                      <span>Aucune image</span>
                    </div>
                  )}
                </div>

                {/* Contenu */}
                <div className="product-content">

                  <span className="product-category">
                    {product.category}
                  </span>

                  <h2 className="product-name">
                    {product.name}
                  </h2>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-bottom">

                    <div>
                      <div className="product-price">
                        {Number(product.price).toFixed(2)} DT
                      </div>

                      <div className="product-stock">
                        {product.stock > 0
                          ? `✓ En stock (${product.stock})`
                          : "✕ Rupture de stock"}
                      </div>
                    </div>

                    <button
                      className="product-cart-button"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      🛒 Ajouter
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Products;