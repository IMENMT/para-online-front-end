
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify"; 
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Modifier les champs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Connexion
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Réponse du serveur :", data);

      if (response.ok) {
        // Enregistrer le token JWT
        login(data.token, data.user);

        toast.success("Connexion réussie !");

        // Redirection vers l'accueil
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-icon">✚</div>

          <h1>Bienvenue</h1>

          <p>
            Connectez-vous à votre compte Para Online.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {/* Email */}
          <div className="form-group">
            <label>Adresse email</label>

            <input
              type="email"
              name="email"
              placeholder="exemple@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <label>Mot de passe</label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

        <div className="login-footer">
          <span>Vous n'avez pas encore de compte ?</span>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="register-link"
          >
            Créer un compte
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;

