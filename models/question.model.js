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

    // ❌ on remplace categorie par tags (plus moderne)
    tags: [
      {
        type: String,
        required: true,
      },
    ],

    auteur: {
      type: String,
      default: "Anonyme",
    },

    //  nouveaux champs
    votes: {
      type: Number,
      default: 0,
    },

    reponsesCount: {
      type: Number,
      default: 0,
    },

    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  //  required: true,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);