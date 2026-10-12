
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // RÉCUPÉRER LES PRODUITS
  // =========================

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Erreur récupération produits :", error);

      toast.error(
        error.response?.data?.message ||
          "Impossible de récupérer les produits"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // MODIFIER LES CHAMPS
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // OUVRIR MODAL AJOUT
  // =========================

  const openAddModal = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: "",
    });

    setShowModal(true);
  };

  // =========================
  // OUVRIR MODAL MODIFICATION
  // =========================

  const openEditModal = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      category: product.category || "",
      image: product.image || "",
    });

    setShowModal(true);
  };

  // =========================
  // FERMER MODAL
  // =========================

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // =========================
  // AJOUT / MODIFICATION
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      formData.price === "" ||
      formData.stock === "" ||
      !formData.category
    ) {
      toast.warning(
        "Veuillez remplir tous les champs obligatoires."
      );
      return;
    }

    try {
      setLoading(true);

      if (editingProduct) {
        // MODIFICATION
        const response = await api.put(
          `/products/${editingProduct._id}`,
          {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
            category: formData.category,
            image: formData.image,
          }
        );

        toast.success(
          response.data.message ||
            "Produit modifié avec succès"
        );
      } else {
        // AJOUT
        const response = await api.post("/products", {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
          category: formData.category,
          image: formData.image,
        });

        toast.success(
          response.data.message ||
            "Produit ajouté avec succès"
        );
      }

      closeModal();
      fetchProducts();
    } catch (error) {
      console.error("Erreur produit :", error);

      toast.error(
        error.response?.data?.message ||
          "Une erreur est survenue"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUPPRIMER PRODUIT
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(
        `/products/${id}`
      );

      toast.success(
        response.data.message ||
          "Produit supprimé avec succès"
      );

      fetchProducts();
    } catch (error) {
      console.error("Erreur suppression :", error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression"
      );
    }
  };

  // =========================
  // RECHERCHE
  // =========================

  const filteredProducts = products.filter((product) => {
    const searchValue = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(searchValue) ||
      product.category
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div className="admin-products-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-products-header">

        <div>
          <span className="admin-section-label">
            ADMINISTRATION
          </span>

          <h1>Gestion des produits</h1>

          <p>
            Gérez votre catalogue de produits
            de parapharmacie.
          </p>
        </div>

        <button
          className="add-product-button"
          onClick={openAddModal}
        >
          <span>＋</span>
          Ajouter un produit
        </button>

      </div>

      {/* =========================
          BARRE RECHERCHE
      ========================= */}

      <div className="products-toolbar">

        <div className="products-count">
          <strong>{filteredProducts.length}</strong>
          <span>
            {filteredProducts.length > 1
              ? " produits"
              : " produit"}
          </span>
        </div>

        <div className="product-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Rechercher un produit ou une catégorie..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* =========================
          TABLEAU
      ========================= */}

      <div className="products-table-container">

        {filteredProducts.length === 0 ? (

          <div className="empty-products">

            <div className="empty-products-icon">
              📦
            </div>

            <h2>Aucun produit trouvé</h2>

            <p>
              Aucun produit ne correspond à votre recherche.
            </p>

          </div>

        ) : (

          <table className="products-table">

            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr key={product._id}>

                  {/* PRODUIT */}

                  <td>

                    <div className="product-info">

                      <div className="product-image-wrapper">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                          />
                        ) : (
                          <div className="product-image-placeholder">
                            📦
                          </div>
                        )}

                      </div>

                      <div className="product-details">

                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          {product.description}
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* CATÉGORIE */}

                  <td>

                    <span className="category-badge">
                      {product.category}
                    </span>

                  </td>

                  {/* PRIX */}

                  <td>

                    <strong className="product-price">
                      {Number(product.price).toFixed(2)} DT
                    </strong>

                  </td>

                  {/* STOCK */}

                  <td>

                    <span
                      className={`stock-badge ${
                        product.stock === 0
                          ? "stock-empty"
                          : product.stock <= 5
                          ? "stock-low"
                          : "stock-ok"
                      }`}
                    >
                      {product.stock === 0
                        ? "Rupture"
                        : `${product.stock} unités`}
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="product-actions">

                      <button
                        className="edit-product-button"
                        onClick={() =>
                          openEditModal(product)
                        }
                        title="Modifier"
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-product-button"
                        onClick={() =>
                          handleDelete(product._id)
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

        )}

      </div>

      {/* =========================
          MODAL
      ========================= */}

      {showModal && (

        <div
          className="product-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="product-modal-header">

              <div>
                <span className="modal-label">
                  {editingProduct
                    ? "MODIFICATION"
                    : "NOUVEAU PRODUIT"}
                </span>

                <h2>
                  {editingProduct
                    ? "Modifier le produit"
                    : "Ajouter un produit"}
                </h2>
              </div>

              <button
                className="modal-close-button"
                onClick={closeModal}
              >
                ✕
              </button>

            </div>

            <form
              className="product-form"
              onSubmit={handleSubmit}
            >

              {/* NOM */}

              <div className="form-group">

                <label htmlFor="name">
                  Nom du produit *
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex : Crème hydratante"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="form-group">

                <label htmlFor="description">
                  Description *
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description du produit..."
                  rows="4"
                />

              </div>

              {/* PRIX / STOCK */}

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="price">
                    Prix (DT) *
                  </label>

                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="stock">
                    Stock *
                  </label>

                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />

                </div>

              </div>

              {/* CATÉGORIE */}

              <div className="form-group">

                <label htmlFor="category">
                  Catégorie *
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >

                  <option value="">
                    Sélectionner une catégorie
                  </option>

                  <option value="Soins du visage">
                    Soins du visage
                  </option>

                  <option value="Soins du corps">
                    Soins du corps
                  </option>

                  <option value="Cheveux">
                    Cheveux
                  </option>

                  <option value="Hygiène">
                    Hygiène
                  </option>

                  <option value="Bébé">
                    Bébé
                  </option>

                  <option value="Compléments alimentaires">
                    Compléments alimentaires
                  </option>

                </select>

              </div>

              {/* IMAGE */}

              <div className="form-group">

                <label htmlFor="image">
                  URL de l'image
                </label>

                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />

              </div>

              {/* BOUTONS */}

              <div className="product-form-actions">

                <button
                  type="button"
                  className="cancel-product-button"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="save-product-button"
                  disabled={loading}
                >
                  {loading
                    ? "Enregistrement..."
                    : editingProduct
                    ? "Enregistrer les modifications"
                    : "Ajouter le produit"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminProducts;
