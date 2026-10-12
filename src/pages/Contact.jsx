
import "./Contact.css";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const formData = new FormData(e.target);

    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      // Envoyer les données au backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        contactData
      );

      console.log("Réponse du serveur :", response.data);

      // Message de succès
      toast.success("Votre message a été envoyé avec succès !");

      // Vider le formulaire
      e.target.reset();

    } catch (error) {
      console.error("Erreur :", error);

      toast.error(
        error.response?.data?.message ||
        "Erreur lors de l'envoi du message"
      );
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">

        <div className="contact-header">
          <h1>Contactez-nous</h1>

          <p>
            Une question, une demande ou besoin d'aide ?
            Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="contact-grid">

          {/* Informations */}
          <div className="contact-info-card">

            <h2>📍 Nos coordonnées</h2>

            <div className="contact-info-item">
              <div className="contact-icon">📍</div>

              <div>
                <h3>Adresse</h3>
                <p>Zarzis, Tunisie</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">📞</div>

              <div>
                <h3>Téléphone</h3>
                <p>+216 XX XXX XXX</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">✉️</div>

              <div>
                <h3>Email</h3>
                <p>contact@para-online.tn</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">🕐</div>

              <div>
                <h3>Horaires</h3>
                <p>Lundi - Samedi : 9h00 - 18h00</p>
              </div>
            </div>

          </div>

          {/* Formulaire */}
          <div className="contact-form-card">

            <h2>💬 Envoyez-nous un message</h2>

            <form onSubmit={handleSubmit}>

              <div className="contact-form-group">

                <label htmlFor="name">
                  Nom complet
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  required
                />

              </div>

              <div className="contact-form-group">

                <label htmlFor="email">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="votre@email.com"
                  required
                />

              </div>

              <div className="contact-form-group">

                <label htmlFor="subject">
                  Sujet
                </label>

                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Objet de votre message"
                  required
                />

              </div>

              <div className="contact-form-group">

                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Écrivez votre message..."
                  rows="6"
                  required
                ></textarea>

              </div>

              <button
                type="submit"
                className="contact-submit"
              >
                ✉️ Envoyer le message
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
