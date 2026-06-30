const mongoose = require("mongoose");
const { Schema } = mongoose;

// Sous-schéma pour les commentaires (intégrés directement dans la réponse)
const commentSchema = new Schema(
  {
    contenu: {
      type: String,
      required: [true, "Le contenu du commentaire est requis"],
      trim: true,
    },
    auteur: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false, // mets à true si l'authentification est obligatoire
    },
  },
  { timestamps: true } // ajoute createdAt / updatedAt automatiquement
);

const answerSchema = new Schema(
  {
    contenu: {
      type: String,
      required: [true, "Le contenu de la réponse est requis"],
      trim: true,
    },
    auteur: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    commentaires: {
      type: [commentSchema],
      default: [],
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);