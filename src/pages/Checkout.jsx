
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { refreshCartCount } = useCart();

  // Récupérer l'utilisateur connecté
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);

  // Modifier les champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Confirmer la commande
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier les champs
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      toast.warning("Veuillez remplir tous les champs.");
      return;
    }

    try {
      setLoading(true);

      // Envoyer les coordonnées au backend
      const response = await api.post("/orders", {
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
      });

      await refreshCartCount();
      toast.success(
        response.data.message || "Commande confirmée avec succès !"
      );

      // Aller vers mes commandes
      navigate("/orders");

    } catch (error) {
      console.error("Erreur commande :", error);

      toast.error(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la commande."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* En-tête */}
        <div className="checkout-header">
          <h1>Coordonnées de livraison</h1>

          <p>
            Veuillez renseigner vos informations pour recevoir votre commande.
          </p>
        </div>

        {/* Formulaire */}
        <form className="checkout-form" onSubmit={handleSubmit}>

          {/* Nom */}
          <div className="form-group">
            <label htmlFor="name">
              Nom complet
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              readOnly
            />
          </div>

          {/* Téléphone */}
          <div className="form-group">
            <label htmlFor="phone">
              Téléphone
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Ex : 20 123 456"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Adresse */}
          <div className="form-group">
            <label htmlFor="address">
              Adresse
            </label>

            <input
              type="text"
              id="address"
              name="address"
              placeholder="Rue, numéro..."
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Ville + Code postal */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="city">
                Ville
              </label>

              <input
                type="text"
                id="city"
                name="city"
                placeholder="Votre ville"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">
                Code postal
              </label>

              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Ex : 4170"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Confirmer */}
          <button
            type="submit"
            className="confirm-button"
            disabled={loading}
          >
            {loading
              ? "Confirmation..."
              : "Confirmer la commande"}
          </button>

          {/* Retour panier */}
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/cart")}
          >
            ← Retour au panier
          </button>

        </form>
      </div>
    </div>
  );
}

export default Checkout;
