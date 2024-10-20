module.exports = (app) => {
  const App = require("../controllers/prodController.js");

  app.post("/createP", App.create); // Créer un produit
  app.get("/get-allP", App.findAll); // Récupérer tous les produits
  app.get("/products/:productId", App.findOne); 
  app.put("/products/:productId", App.update); 
  app.delete("/products/:productId", App.delete); 
};
