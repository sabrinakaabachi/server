module.exports = (app) => {
  const App = require("../controllers/cmdController.js");

  // Routes
  app.post("/createC", App.create); // Créer une commande
  app.get("/get-allc", App.findAll); // Récupérer toutes les commandes
  app.get("/commande/:commandeID", App.findOne); // Récupérer une commande par ID
  app.put("/commande/:commandeID", App.update); // Mettre à jour une commande par ID
  app.delete("/commande/:commandeID", App.delete); // Supprimer une commande par ID
};
