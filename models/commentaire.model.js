const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    answer: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
      required: false, // rempli si le commentaire concerne une réponse
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: false, // rempli si le commentaire concerne directement une question
    },
  },
  { timestamps: true } // ajoute createdAt / updatedAt automatiquement
);

// Un commentaire doit être lié à au moins une réponse OU une question
commentSchema.pre("validate", function (next) {
  if (!this.answer && !this.question) {
    return next(new Error("Le commentaire doit être lié à une réponse ou à une question"));
  }
  next();
});

module.exports = mongoose.model("Comment", commentSchema);