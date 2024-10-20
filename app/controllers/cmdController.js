const Commande = require("../models/comModel.js");

// Créer et sauvegarder une nouvelle commande
exports.create = (req, res) => {
  // Valider la requête
  if (!req.body.date || !req.body.client || !req.body.produit) {
    return res.status(400).send({
      message: "Le contenu de la commande ne peut pas être vide.",
    });
  }

  // Créer une commande
  const commande = new Commande({
    date: req.body.date,
    client: req.body.client,
    produit: req.body.produit,
  });

  // Sauvegarder la commande dans la base de données
  commande
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la création de la commande.",
      });
    });
};

// Récupérer toutes les commandes de la base de données
exports.findAll = (req, res) => {
  Commande.find().populate('produit.product')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récupération des commandes.",
      });
    });
};

// Trouver une seule commande avec l'ID commandeID
exports.findOne = (req, res) => {
  Commande.findById(req.params.commandeID).populate('produit.product')
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Commande non trouvée avec l'ID " + req.params.commandeID,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Commande non trouvée avec l'ID " + req.params.commandeID,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la récupération de la commande avec l'ID " + req.params.commandeID,
      });
    });
};

// Mettre à jour une commande identifiée par l'ID commandeID
exports.update = (req, res) => {
  // Valider la requête
  if (!req.body.date || !req.body.client || !req.body.produit) {
    return res.status(400).send({
      message: "Le contenu de la commande ne peut pas être vide.",
    });
  }

  // Trouver la commande et la mettre à jour avec le contenu de la requête
  Commande.findByIdAndUpdate(
    req.params.commandeID,
    {
      date: req.body.date,
      client: req.body.client,
      produit: req.body.produit,
    },
    { new: true } // Retourner la commande mise à jour
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Commande non trouvée avec l'ID " + req.params.commandeID,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Commande non trouvée avec l'ID " + req.params.commandeID,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la mise à jour de la commande avec l'ID " + req.params.commandeID,
      });
    });
};

// Supprimer une commande avec l'ID commandeID
exports.delete = (req, res) => {
  Commande.findByIdAndDelete(req.params.commandeID)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Commande non trouvée avec l'ID " + req.params.commandeID,
        });
      }
      res.send({ message: "Commande supprimée avec succès!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Commande non trouvée avec l'ID " + req.params.commandeID,
        });
      }
      return res.status(500).send({
        message: "Impossible de supprimer la commande avec l'ID " + req.params.commandeID,
      });
    });
};
