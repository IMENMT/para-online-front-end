
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          HERO
      ========================= */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-label">
            <span className="hero-label-dot"></span>
            Votre parapharmacie en ligne
          </div>

          <h1>
            Prenez soin de vous,
            <span> simplement.</span>
          </h1>

          <p>
            Découvrez une sélection de produits de qualité pour
            votre beauté, votre hygiène et votre bien-être,
            disponibles en quelques clics.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="hero-primary-button"
            >
              Découvrir nos produits
              <span>→</span>
            </Link>

            <Link
              to="/about"
              className="hero-secondary-button"
            >
              Découvrir Para Online
            </Link>

          </div>

          <div className="hero-trust">

            <div className="trust-avatars">
              <span>✓</span>
              <span>✓</span>
              <span>✓</span>
            </div>

            <div>
              <strong>
                Une expérience simple et sécurisée
              </strong>

              <p>
                Commandez vos produits en toute confiance.
              </p>
            </div>

          </div>

        </div>


        {/* =========================
            VISUEL HERO
        ========================= */}
        <div className="hero-visual">

          <div className="hero-main-card">

            <div className="hero-card-top">
              <span>PARA ONLINE</span>
              <span className="hero-card-plus">+</span>
            </div>

            <div className="hero-product-visual">

              <div className="product-bottle bottle-one">
                <span>CARE</span>
              </div>

              <div className="product-bottle bottle-two">
                <span>SKIN</span>
              </div>

              <div className="product-tube">
                <span>PURE</span>
              </div>

            </div>

            <div className="hero-card-bottom">

              <div>
                <small>Sélection</small>
                <strong>Bien-être & beauté</strong>
              </div>

              <div className="hero-check">
                ✓
              </div>

            </div>

          </div>


          <div className="floating-card floating-delivery">

            <div className="floating-icon">
              ✓
            </div>

            <div>
              <strong>Commande sécurisée</strong>
              <span>Simple & rapide</span>
            </div>

          </div>


          <div className="floating-card floating-quality">

            <span className="quality-star">
              ★
            </span>

            <div>
              <strong>Produits sélectionnés</strong>
              <span>Pour votre bien-être</span>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          STATISTIQUES
      ========================= */}
      <section className="stats-section">

        <div className="stats-container">

          <div className="stat-item">
            <strong>100%</strong>
            <span>Commande sécurisée</span>
          </div>

          <div className="stat-item">
            <strong>24/7</strong>
            <span>Catalogue disponible</span>
          </div>

          <div className="stat-item">
            <strong>6+</strong>
            <span>Univers de produits</span>
          </div>

          <div className="stat-item">
            <strong>Simple</strong>
            <span>Commande en quelques clics</span>
          </div>

        </div>

      </section>


      {/* =========================
          NOS UNIVERS
      ========================= */}
      <section className="categories-section">

        <div className="section-header">

          <div className="section-label">
            NOS UNIVERS
          </div>

          <h2>
            Prenez soin de vous au quotidien
          </h2>

          <p>
            Découvrez notre sélection de produits de
            parapharmacie pour toute la famille.
          </p>

        </div>


        <div className="categories-grid">

          {/* VISAGE */}

          <Link
            to="/products?category=Soins du visage"
            className="category-card"
          >

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80"
                alt="Soins du visage"
              />
            </div>

            <div className="category-content">

              <span className="category-tag">
                BEAUTÉ
              </span>

              <h3>
                Soins du visage
              </h3>

              <p>
                Nettoyage, hydratation et soins de la peau.
              </p>

              <span className="category-link">
                Découvrir →
              </span>

            </div>

          </Link>


          {/* CORPS */}

          <Link
            to="/products?category=Soins du corps"
            className="category-card"
          >

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
                alt="Soins du corps"
              />
            </div>

            <div className="category-content">

              <span className="category-tag">
                BIEN-ÊTRE
              </span>

              <h3>
                Soins du corps
              </h3>

              <p>
                Des soins pour une peau douce et hydratée.
              </p>

              <span className="category-link">
                Découvrir →
              </span>

            </div>

          </Link>


          {/* CHEVEUX */}

          <Link
            to="/products?category=Cheveux"
            className="category-card"
          >

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
                alt="Soins cheveux"
              />
            </div>

            <div className="category-content">

              <span className="category-tag">
                CHEVEUX
              </span>

              <h3>
                Cheveux
              </h3>

              <p>
                Des soins adaptés à tous les types de cheveux.
              </p>

              <span className="category-link">
                Découvrir →
              </span>

            </div>

          </Link>


          {/* HYGIÈNE */}

          <Link
            to="/products?category=Hygiène"
            className="category-card"
          >

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
                alt="Hygiène"
              />
            </div>

            <div className="category-content">

              <span className="category-tag">
                HYGIÈNE
              </span>

              <h3>
                Hygiène
              </h3>

              <p>
                Les essentiels pour votre routine quotidienne.
              </p>

              <span className="category-link">
                Découvrir →
              </span>

            </div>

          </Link>


          {/* BÉBÉ */}

          <Link
            to="/products?category=Bébé"
            className="category-card"
          >

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
                alt="Produits bébé"
              />
            </div>

            <div className="category-content">

              <span className="category-tag">
                FAMILLE
              </span>

              <h3>
                Bébé
              </h3>

              <p>
                Des produits doux pour les tout-petits.
              </p>

              <span className="category-link">
                Découvrir →
              </span>

            </div>

          </Link>


          {/* COMPLÉMENTS */}

          <Link
            to="/products?category=Compléments alimentaires"
            className="category-card"
          >

            <div className="category-image">
              <img
                src="https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80"
                alt="Compléments alimentaires"
              />
            </div>

            <div className="category-content">

              <span className="category-tag">
                NUTRITION
              </span>

              <h3>
                Compléments alimentaires
              </h3>

              <p>
                Pour accompagner votre équilibre au quotidien.
              </p>

              <span className="category-link">
                Découvrir →
              </span>

            </div>

          </Link>

        </div>


        <div className="categories-button">

          <Link to="/products">
            Voir tous les produits
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* =========================
          POURQUOI PARA ONLINE
      ========================= */}
      <section className="advantages-section">

        <div className="advantages-content">

          <div className="section-label">
            POURQUOI PARA ONLINE ?
          </div>

          <h2>
            Une expérience pensée
            <span> pour vous.</span>
          </h2>

          <p>
            Notre objectif est de vous offrir une expérience
            d'achat simple, claire et agréable.
          </p>

          <Link
            to="/about"
            className="advantages-button"
          >
            En savoir plus
            <span>→</span>
          </Link>

        </div>


        <div className="advantages-list">

          <div className="advantage-item">

            <div className="advantage-icon">
              01
            </div>

            <div>
              <h3>
                Une sélection pensée pour vous
              </h3>

              <p>
                Retrouvez des produits organisés par catégories
                pour trouver rapidement ce dont vous avez besoin.
              </p>
            </div>

          </div>


          <div className="advantage-item">

            <div className="advantage-icon">
              02
            </div>

            <div>
              <h3>
                Une commande simple
              </h3>

              <p>
                Ajoutez vos produits au panier et passez votre
                commande facilement en quelques étapes.
              </p>
            </div>

          </div>


          <div className="advantage-item">

            <div className="advantage-icon">
              03
            </div>

            <div>
              <h3>
                Une expérience sécurisée
              </h3>

              <p>
                Vos informations personnelles sont protégées
                pendant votre parcours d'achat.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}
      <section className="cta-section">

        <div className="cta-content">

          <div className="cta-label">
            PARA ONLINE
          </div>

          <h2>
            Votre bien-être commence
            <span> ici.</span>
          </h2>

          <p>
            Explorez notre catalogue et découvrez les produits
            qui vous accompagnent au quotidien.
          </p>

          <Link
            to="/products"
            className="cta-button"
          >
            Commencer mes achats
            <span>→</span>
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Home;
