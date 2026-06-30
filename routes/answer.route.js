const express = require("express");
const router = express.Router();

const {
  createAnswer,
  getAnswerById,
  getAnswersByQuestion,
  updateAnswer,
  deleteAnswer,
  addComment,
} = require("../controller/answer.controller");

// Décommente si tu as un middleware d'authentification
// const { protect } = require("../middlewares/auth.middleware");

// Créer une réponse pour une question donnée
router.post("/:id", createAnswer); // POST /api/answer/:id  (id = questionId)

// Récupérer toutes les réponses d'une question
router.get("/question/:questionId", getAnswersByQuestion);

// Récupérer / modifier / supprimer une réponse précise
router.get("/:id", getAnswerById);
router.put("/:id", updateAnswer);
router.delete("/:id", deleteAnswer);

// Ajouter un commentaire à une réponse
router.post("/:id/comment", addComment); // POST /api/answer/:id/comment

module.exports = router;