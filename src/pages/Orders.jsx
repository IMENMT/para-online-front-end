
import { useEffect, useState } from "react";
import api from "../services/api";
import"./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await api.get("/orders");

      setOrders(response.data);
    } catch (error) {
      console.error("Erreur commandes :", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Statut de la commande
  const getStatusLabel = (status) => {
    const statuses = {
      pending: "🕐 En attente",
      confirmed: "✅ Confirmée",
      shipped: "🚚 Expédiée",
      delivered: "📦 Livrée",
      cancelled: "❌ Annulée",
    };

    return statuses[status] || status;
  };

  return (
    <div className="orders-page">
      <div className="orders-container">

        <div className="orders-header">
          <h1>📦 Mes commandes</h1>
          <p>Retrouvez ici l'historique de vos commandes.</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <p>Vous n'avez aucune commande.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>

              {/* En-tête */}
              <div className="order-header">
                <div>
                  <h2>Commande #{order._id}</h2>

                  <p className="order-date">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("fr-FR")
                      : ""}
                  </p>
                </div>

                <span className="order-status">
                  {getStatusLabel(order.status)}
                </span>
              </div>

              {/* Coordonnées de livraison */}
              {order.customerInfo && (
                <div className="customer-info">

                  <h3>📍 Coordonnées de livraison</h3>

                  <div className="customer-info-grid">

                    <div>
                      <strong>Nom</strong>
                      <p>{order.customerInfo.name}</p>
                    </div>

                    <div>
                      <strong>Téléphone</strong>
                      <p>{order.customerInfo.phone}</p>
                    </div>

                    <div>
                      <strong>Adresse</strong>
                      <p>{order.customerInfo.address}</p>
                    </div>

                    <div>
                      <strong>Ville</strong>
                      <p>{order.customerInfo.city}</p>
                    </div>

                    <div>
                      <strong>Code postal</strong>
                      <p>{order.customerInfo.postalCode}</p>
                    </div>

                  </div>
                </div>
              )}

              {/* Produits */}
              <div className="order-products">

                <h3>🛍️ Produits commandés</h3>

                {order.items.map((item) => (
                  <div className="order-product" key={item._id}>

                    <div>
                      <strong>
                        {item.product?.name || "Produit supprimé"}
                      </strong>

                      <p>
                        Quantité : {item.quantity}
                      </p>
                    </div>

                    <strong>
                      {(item.price * item.quantity).toFixed(2)} DT
                    </strong>

                  </div>
                ))}

              </div>

              {/* Total */}
              <div className="order-total">
                <span>Total</span>
                <strong>
                  {order.totalPrice.toFixed(2)} DT
                </strong>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Orders;
