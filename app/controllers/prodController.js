const Produit = require("../models/proModel.js");

// Créer et sauvegarder un nouveau produit
exports.create = (req, res) => {
  // Valider la requête
  if (!req.body.nom || !req.body.description || !req.body.prix || !req.body.image) {
    return res.status(400).send({
      message: "Le contenu du produit ne peut pas être vide.",
    });
  }

  // Créer un produit
  const produit = new Produit({
    nom: req.body.nom,
    description: req.body.description,
    prix: req.body.prix,
    image: req.body.image,
  });

  // Sauvegarder le produit dans la base de données
  produit
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la création du produit.",
      });
    });
};

// Récupérer tous les produits de la base de données
exports.findAll = (req, res) => {
  Produit.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des produits.",
      });
    });
};

// Trouver un produit avec un productId
exports.findOne = (req, res) => {
  Produit.findById(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la récupération du produit avec l'ID " + req.params.productId,
      });
    });
};

// Mettre à jour un produit identifié par le productId dans la requête
exports.update = (req, res) => {
  // Valider la requête
  if (!req.body.nom || !req.body.description || !req.body.prix) {
    return res.status(400).send({
      message: "Le contenu du produit ne peut pas être vide.",
    });
  }

  // Trouver le produit et le mettre à jour avec le contenu de la requête
  Produit.findByIdAndUpdate(
    req.params.productId,
    {
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
      image: req.body.image,
    },
    { new: true } // Retourner le produit mis à jour
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la mise à jour du produit avec l'ID " + req.params.productId,
      });
    });
};

// Supprimer un produit avec l'ID productId spécifié dans la requête
exports.delete = (req, res) => {
  Produit.findByIdAndDelete(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      res.send({ message: "Produit supprimé avec succès!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Produit non trouvé avec l'ID " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Impossible de supprimer le produit avec l'ID " + req.params.productId,
      });
    });
};
