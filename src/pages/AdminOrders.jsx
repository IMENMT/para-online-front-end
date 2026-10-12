
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

  // ==========================================
  // RÉCUPÉRER LES COMMANDES
  // ==========================================
  const getOrders = async () => {
    try {
      const response = await api.get("/orders/all");

      setOrders(response.data);
    } catch (error) {
      console.error("Erreur commandes :", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des commandes"
      );
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // ==========================================
  // MODIFIER LE STATUT
  // ==========================================
  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, {
        status
      });

      toast.success("Statut modifié avec succès");

      await getOrders();

      setSelectedOrder((current) =>
        current && current._id === orderId
          ? { ...current, status }
          : current
      );

    } catch (error) {
      console.error("Erreur statut :", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la modification du statut"
      );
    }
  };

  // ==========================================
  // SUPPRIMER UNE COMMANDE
  // ==========================================
  const deleteOrder = async (orderId) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette commande ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await api.delete(`/orders/${orderId}`);

      toast.success("Commande supprimée avec succès");

      // Fermer le détail si la commande était ouverte
      if (selectedOrder?._id === orderId) {
        setSelectedOrder(null);
      }

      // Actualiser la liste
      getOrders();

    } catch (error) {
      console.error("Erreur suppression :", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la commande"
      );
    }
  };

  // ==========================================
  // LABEL STATUT
  // ==========================================
  const getStatusLabel = (status) => {
    const statuses = {
      pending: "🕐 En attente",
      confirmed: "✅ Confirmée",
      shipped: "🚚 Expédiée",
      delivered: "📦 Livrée",
      cancelled: "❌ Annulée"
    };

    return statuses[status] || status;
  };

  // ==========================================
  // RECHERCHE
  // ==========================================
  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    return (
      order._id.toLowerCase().includes(searchText) ||
      order.user?.name?.toLowerCase().includes(searchText) ||
      order.user?.email?.toLowerCase().includes(searchText) ||
      order.customerInfo?.name?.toLowerCase().includes(searchText) ||
      order.customerInfo?.phone?.toLowerCase().includes(searchText) ||
      order.customerInfo?.address?.toLowerCase().includes(searchText) ||
      order.customerInfo?.city?.toLowerCase().includes(searchText) ||
      order.customerInfo?.postalCode?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="admin-orders-page">

      <div className="admin-orders-container">

        {/* =========================
            HEADER
        ========================= */}

        <div className="admin-orders-header">

          <h1>👨‍💼 Gestion des commandes</h1>

          <p>
            Consultez et gérez les commandes de vos clients.
          </p>

        </div>

        {/* =========================
            RECHERCHE
        ========================= */}

        <div className="orders-search">

          <span className="search-icon">🔎</span>

          <input
            type="text"
            placeholder="Rechercher une commande, un client, un email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}

        </div>

        {/* Nombre de résultats */}

        <div className="orders-count">
          {filteredOrders.length} commande
          {filteredOrders.length !== 1 ? "s" : ""}
        </div>

        {/* =========================
            LISTE
        ========================= */}

        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>
              {search
                ? "Aucune commande trouvée."
                : "Aucune commande."}
            </p>
          </div>
        ) : (
          <div className="orders-list">

            {filteredOrders.map((order) => {
              return (
                <div
                  className="admin-order-row"
                  key={order._id}
                >

                  {/* COMMANDE */}

                  <div className="order-number">

                    <strong>
                      Commande #{order._id}
                    </strong>

                    <span>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString("fr-FR")
                        : ""}
                    </span>

                  </div>

                  {/* CLIENT */}

                  <div className="order-client">

                    <strong>
                      {order.user?.name || "Client"}
                    </strong>

                    <span>
                      {order.user?.email || ""}
                    </span>

                  </div>

                  {/* TOTAL */}

                  <div className="order-price">

                    <strong>
                      {order.totalPrice.toFixed(2)} DT
                    </strong>

                  </div>

                  {/* STATUT */}

                  <div className="order-status">

                    {getStatusLabel(order.status)}

                  </div>

                  {/* ACTIONS */}

                  <div className="order-actions">

                    <button
                      className="view-order-button"
                      onClick={() => setSelectedOrder(order)}
                    >
                      👁️ Afficher
                    </button>

                    <button
                      className="delete-order-button"
                      onClick={() => deleteOrder(order._id)}
                    >
                      🗑️ Supprimer
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* =========================
          MODAL DÉTAILS
      ========================= */}

      {selectedOrder && (
        <div
          className="order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >

          <div
            className="order-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="order-modal-header">

              <div>

                <h2>
                  📦 Détails de la commande
                </h2>

                <p>
                  Commande{" "}
                  #{selectedOrder._id}
                </p>

              </div>

              <button
                className="close-modal"
                onClick={() => setSelectedOrder(null)}
              >
                ✕
              </button>

            </div>

            {/* INFORMATIONS CLIENT */}

            <div className="details-section">

              <h3>👤 Informations client</h3>

              <div className="customer-details">

                <div>
                  <span>Nom</span>
                  <strong>
                    {selectedOrder.customerInfo?.name ||
                      selectedOrder.user?.name ||
                      "Non renseigné"}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>
                    {selectedOrder.user?.email ||
                      "Non renseigné"}
                  </strong>
                </div>

                <div>
                  <span>Téléphone</span>
                  <strong>
                    {selectedOrder.customerInfo?.phone ||
                      "Non renseigné"}
                  </strong>
                </div>

                <div>
                  <span>Adresse</span>
                  <strong>
                    {selectedOrder.customerInfo?.address ||
                      "Non renseignée"}
                  </strong>
                </div>

                <div>
                  <span>Ville</span>
                  <strong>
                    {selectedOrder.customerInfo?.city ||
                      "Non renseignée"}
                  </strong>
                </div>

                <div>
                  <span>Code postal</span>
                  <strong>
                    {selectedOrder.customerInfo?.postalCode ||
                      "Non renseigné"}
                  </strong>
                </div>

              </div>

            </div>

            {/* PRODUITS */}

            <div className="details-section">

              <h3>🛍️ Produits commandés</h3>

              <div className="admin-products-list">

                {selectedOrder.items.map((item) => (

                  <div
                    className="admin-product-item"
                    key={item._id}
                  >

                    <div>

                      <strong>
                        {item.product?.name ||
                          "Produit supprimé"}
                      </strong>

                      <span>
                        Quantité : {item.quantity}
                      </span>

                    </div>

                    <strong>
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}{" "}
                      DT
                    </strong>

                  </div>

                ))}

              </div>

            </div>

            {/* TOTAL */}

            <div className="admin-order-total">

              <span>Total</span>

              <strong>
                {selectedOrder.totalPrice.toFixed(2)} DT
              </strong>

            </div>

            {/* STATUT */}

            <div className="details-section">

              <h3>📦 Statut de la commande</h3>

              <select
                className="status-select"
                value={selectedOrder.status}
                onChange={(e) =>
                  updateStatus(
                    selectedOrder._id,
                    e.target.value
                  )
                }
              >

                <option value="pending">
                  🕐 En attente
                </option>

                <option value="confirmed">
                  ✅ Confirmée
                </option>

                <option value="shipped">
                  🚚 Expédiée
                </option>

                <option value="delivered">
                  📦 Livrée
                </option>

                <option value="cancelled">
                  ❌ Annulée
                </option>

              </select>

            </div>

            {/* SUPPRESSION DANS LE MODAL */}

            <button
              className="modal-delete-button"
              onClick={() =>
                deleteOrder(selectedOrder._id)
              }
            >
              🗑️ Supprimer cette commande
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminOrders;
