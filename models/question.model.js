const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description est obligatoire"],
    },
    categorie: {
      type: String,
      required: [true, "La catégorie est obligatoire"],
    },
    // optionnel (tu l’as dans le body mais tu ne l’utilises pas encore)
    auteur: {
      type: String,
    },
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt
  }
);

// ✅ IMPORTANT : export du modèle mongoose
module.exports = mongoose.model("Question", questionSchema);