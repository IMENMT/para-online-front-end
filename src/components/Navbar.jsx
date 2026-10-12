
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useUnreadMessages } from "../context/UnreadMessagesContext";

import "./Navbar.css";

function Navbar() {
  const { token, user, logout } = useAuth();
  const { cartCount } = useCart();
  const { unreadCount } = useUnreadMessages();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ========================================
  // Déconnexion
  // ========================================

  const handleLogout = () => {
    logout();
    closeMenu();

    // Redirection vers l'accueil
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* ========================================
            Logo
        ======================================== */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span>✚</span>
          Para Online
        </Link>

        {/* ========================================
            Bouton menu mobile
        ======================================== */}

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div
          className={`navbar-content ${
            menuOpen
              ? "navbar-content-open"
              : ""
          }`}
        >

          {/* ========================================
              Menu principal
          ======================================== */}

          <div className="navbar-menu">

            {/* Accueil */}

            <Link
              to="/"
              className="navbar-link"
              onClick={closeMenu}
            >
              Accueil
            </Link>

            {/* Produits */}

            <Link
              to="/products"
              className="navbar-link"
              onClick={closeMenu}
            >
              Produits
            </Link>

            {/* ========================================
                Menu selon le rôle
            ======================================== */}

            {token && user && (

              user.role === "admin" ? (

                <>

                  {/* Gestion des produits */}

                  <Link
                    to="/admin/products"
                    className="navbar-link"
                    onClick={closeMenu}
                  >
                    Gestion des produits
                  </Link>

                  {/* Gestion des commandes */}

                  <Link
                    to="/admin/orders"
                    className="navbar-link"
                    onClick={closeMenu}
                  >
                    Gestion des commandes
                  </Link>

                </>

              ) : (

                /* Client */

                <Link
                  to="/orders"
                  className="navbar-link"
                  onClick={closeMenu}
                >
                  Mes commandes
                </Link>

              )

            )}

            {/* À propos */}

            <Link
              to="/about"
              className="navbar-link"
              onClick={closeMenu}
            >
              À propos
            </Link>

            {/* ========================================
                Contact pour client
                Messages pour admin
            ======================================== */}

            {token &&
            user &&
            user.role === "admin" ? (

              <Link
                to="/messages"
                className="navbar-link"
                onClick={closeMenu}
              >
                Messages

                {/* Compteur messages non lus */}

                {unreadCount > 0 && (
                  <span className="message-badge">
                    {unreadCount}
                  </span>
                )}

              </Link>

            ) : (

              <Link
                to="/contact"
                className="navbar-link"
                onClick={closeMenu}
              >
                Contact
              </Link>

            )}

          </div>

          {/* ========================================
              Actions à droite
          ======================================== */}

          <div className="navbar-actions">

            {/* Panier */}

            <Link
              to="/cart"
              className="cart-link"
              onClick={closeMenu}
            >
              🛒 Panier

              {cartCount > 0 &&
                ` (${cartCount})`}
            </Link>

            {/* ========================================
                Utilisateur connecté
            ======================================== */}

            {token && user ? (

              <div className="user-menu">

                <span className="user-icon">
                  👤
                </span>

                <span className="user-name">
                  Bonjour, {user.name}
                </span>

                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>

              </div>

            ) : (

              /* Utilisateur non connecté */

              <>

                <Link
                  to="/login"
                  className="navbar-login"
                  onClick={closeMenu}
                >
                  Se connecter
                </Link>

                <Link
                  to="/register"
                  className="navbar-register"
                  onClick={closeMenu}
                >
                  S'inscrire
                </Link>

              </>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
