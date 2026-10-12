
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-container">

        <div className="about-header">
          <span className="about-badge">🌿 Para Online</span>

          <h1>À propos de nous</h1>

          <p>
            Votre bien-être, notre priorité.
          </p>
        </div>

        <div className="about-intro">
          <div className="about-intro-icon">💚</div>

          <div>
            <h2>Bienvenue chez Para Online</h2>

            <p>
              Para Online est une parapharmacie en ligne dédiée
              à votre bien-être et à vos besoins quotidiens.
              Nous vous proposons une sélection de produits
              de qualité pour prendre soin de vous et de votre famille.
            </p>

            <p>
              Notre objectif est de rendre vos achats simples,
              rapides et accessibles, tout en vous offrant une
              expérience en ligne agréable et sécurisée.
            </p>
          </div>
        </div>

        <div className="about-features">

          <div className="about-feature-card">
            <div className="about-feature-icon">🌿</div>
            <h3>Produits de qualité</h3>
            <p>
              Une sélection de produits adaptés à vos besoins
              et à votre bien-être.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">🚚</div>
            <h3>Livraison pratique</h3>
            <p>
              Commandez facilement vos produits depuis chez vous.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">🔒</div>
            <h3>Achat sécurisé</h3>
            <p>
              Vos informations et vos commandes sont protégées.
            </p>
          </div>

          <div className="about-feature-card">
            <div className="about-feature-icon">❤️</div>
            <h3>À votre écoute</h3>
            <p>
              Une équipe disponible pour répondre à vos questions
              et vous accompagner.
            </p>
          </div>

        </div>

        <div className="about-mission">
          <h2>Notre mission</h2>

          <p>
            Chez Para Online, nous souhaitons faciliter l'accès
            aux produits de parapharmacie grâce à une plateforme
            moderne, simple et accessible.
          </p>

          <p>
            Nous plaçons la satisfaction de nos clients au cœur
            de notre démarche et cherchons constamment à améliorer
            leur expérience.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;
