
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { useUnreadMessages } from "../context/UnreadMessagesContext";
import "./Messages.css";

function Messages() {
  const { refreshUnreadCount } = useUnreadMessages();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // =========================
  // Récupérer les messages
  // =========================

  const getMessages = async () => {
    try {
      const response = await api.get("/contact");
      setMessages(response.data);
    } catch (error) {
      console.error(
        "Erreur récupération messages :",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la récupération des messages"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Marquer comme lu
  // =========================

  const markAsRead = async (id) => {
    try {
      const response = await api.put(
        `/contact/${id}/read`
      );

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === id
            ? response.data
            : message
        )
      );

      // Mettre à jour le message ouvert
      setSelectedMessage((prev) =>
        prev && prev._id === id
          ? response.data
          : prev
      );

      await refreshUnreadCount();
      toast.success("Message marqué comme lu");
 

    } catch (error) {
      console.error(
        "Erreur marquage lu :",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Erreur lors du marquage du message"
      );
    }
  };

  // =========================
  // Marquer comme non lu
  // =========================

  const markAsUnread = async (id) => {
    try {
      const response = await api.put(
        `/contact/${id}/unread`
      );

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === id
            ? response.data
            : message
        )
      );

      // Mettre à jour le message ouvert
      setSelectedMessage((prev) =>
        prev && prev._id === id
          ? response.data
          : prev
      );

      await refreshUnreadCount();
      toast.success(
        "Message marqué comme non lu"
      );
    } catch (error) {
      console.error(
        "Erreur marquage non lu :",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la modification du message"
      );
    }
  };

  // =========================
  // Supprimer un message
  // =========================

  const deleteMessage = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce message ?"
    );

    if (!confirmation) return;

    try {
      await api.delete(`/contact/${id}`);

      setMessages((prevMessages) =>
        prevMessages.filter(
          (message) => message._id !== id
        )
      );

      // Fermer le modal si le message supprimé
      // était ouvert
      setSelectedMessage((prev) =>
        prev && prev._id === id
          ? null
          : prev
      );

      await refreshUnreadCount();
      toast.success(
        "Message supprimé avec succès"
      );
    } catch (error) {
      console.error(
        "Erreur suppression message :",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression du message"
      );
    }
  };

  // =========================
  // Afficher un message
  // =========================

  const showMessage = async (message) => {
    // Ouvrir immédiatement le message
    setSelectedMessage(message);

    // Si le message est non lu,
    // le marquer automatiquement comme lu
    if (!message.isRead) {
      try {
        const response = await api.put(
          `/contact/${message._id}/read`
        );

        // Mettre à jour la liste
        setMessages((prevMessages) =>
          prevMessages.map((item) =>
            item._id === message._id
              ? response.data
              : item
          )
        );

        // Mettre à jour le message affiché
        setSelectedMessage(response.data);
        await refreshUnreadCount();
      } catch (error) {
        console.error(
          "Erreur marquage automatique :",
          error
        );
      }
    }
  };

  // =========================
  // Fermer le message
  // =========================

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  // =========================
  // Charger les messages
  // =========================

  useEffect(() => {
    getMessages();
  }, []);

  // =========================
  // Chargement
  // =========================

  if (loading) {
    return (
      <div className="messages-page">
        <div className="messages-container">
          <p className="messages-loading">
            Chargement des messages...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Interface
  // =========================

  return (
    <div className="messages-page">
      <div className="messages-container">

        {/* HEADER */}

        <div className="messages-header">
          <h1>📩 Messages</h1>

          <p>
            Gestion des messages reçus
          </p>

          <div className="messages-count">
            {messages.length} message
            {messages.length > 1 ? "s" : ""}
          </div>
        </div>

        {/* AUCUN MESSAGE */}

        {messages.length === 0 ? (
          <div className="empty-messages">

            <div className="empty-icon">
              📭
            </div>

            <h2>Aucun message</h2>

            <p>
              Vous n'avez reçu aucun message
              pour le moment.
            </p>

          </div>
        ) : (

          /* TABLEAU */

          <div className="messages-table-container">

            <table className="messages-table">

              <thead>
                <tr>
                  <th>État</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Sujet</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {messages.map((message) => (

                  <tr
                    key={message._id}
                    className={
                      !message.isRead
                        ? "message-row-unread"
                        : ""
                    }
                  >

                    {/* ÉTAT */}

                    <td>

                      {message.isRead ? (

                        <span className="status-read">
                          ✓ Lu
                        </span>

                      ) : (

                        <span className="status-unread">
                          ● Non lu
                        </span>

                      )}

                    </td>

                    {/* NOM */}

                    <td>
                      <strong>
                        {message.name}
                      </strong>
                    </td>

                    {/* EMAIL */}

                    <td>
                      {message.email}
                    </td>

                    {/* SUJET */}

                    <td>
                      <span className="subject-text">
                        {message.subject}
                      </span>
                    </td>

                    {/* DATE */}

                    <td>
                      {new Date(
                        message.createdAt
                      ).toLocaleDateString(
                        "fr-FR"
                      )}
                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="message-buttons">

                        {/* AFFICHER */}

                        <button
                          type="button"
                          className="btn-view"
                          onClick={() =>
                            showMessage(message)
                          }
                          title="Afficher"
                        >
                          👁️
                        </button>

                        {/* LU / NON LU */}

                        {message.isRead ? (

                          <button
                            type="button"
                            className="btn-unread"
                            onClick={() =>
                              markAsUnread(
                                message._id
                              )
                            }
                            title="Marquer comme non lu"
                          >
                            🔵
                          </button>

                        ) : (

                          <button
                            type="button"
                            className="btn-read"
                            onClick={() =>
                              markAsRead(
                                message._id
                              )
                            }
                            title="Marquer comme lu"
                          >
                            ✓
                          </button>

                        )}

                        {/* SUPPRIMER */}

                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() =>
                            deleteMessage(
                              message._id
                            )
                          }
                          title="Supprimer"
                        >
                          🗑️
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* =========================
          MODAL MESSAGE
      ========================= */}

      {selectedMessage && (

        <div
          className="message-modal-overlay"
          onClick={closeMessage}
        >

          <div
            className="message-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER MODAL */}

            <div className="message-modal-header">

              <div>

                <h2>
                  📩 {selectedMessage.subject}
                </h2>

                <span>
                  {selectedMessage.isRead
                    ? "✓ Lu"
                    : "🔴 Non lu"}
                </span>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeMessage}
              >
                ✕
              </button>

            </div>

            {/* INFORMATIONS */}

            <div className="message-modal-info">

              <div>
                <strong>
                  👤 Nom
                </strong>

                <p>
                  {selectedMessage.name}
                </p>
              </div>

              <div>
                <strong>
                  ✉️ Email
                </strong>

                <p>
                  {selectedMessage.email}
                </p>
              </div>

              <div>
                <strong>
                  📅 Date
                </strong>

                <p>
                  {new Date(
                    selectedMessage.createdAt
                  ).toLocaleString(
                    "fr-FR"
                  )}
                </p>
              </div>

            </div>

            {/* MESSAGE */}

            <div className="message-modal-content">

              <strong>
                💬 Message
              </strong>

              <p>
                {selectedMessage.message}
              </p>

            </div>

            {/* ACTIONS */}

            <div className="message-modal-actions">

              {selectedMessage.isRead ? (

                <button
                  type="button"
                  className="btn-modal-unread"
                  onClick={() =>
                    markAsUnread(
                      selectedMessage._id
                    )
                  }
                >
                  🔵 Marquer comme non lu
                </button>

              ) : (

                <button
                  type="button"
                  className="btn-modal-read"
                  onClick={() =>
                    markAsRead(
                      selectedMessage._id
                    )
                  }
                >
                  ✓ Marquer comme lu
                </button>

              )}

              <button
                type="button"
                className="btn-modal-delete"
                onClick={() =>
                  deleteMessage(
                    selectedMessage._id
                  )
                }
              >
                🗑️ Supprimer
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Messages;
