const express = require("express");
const router = express.Router();

const {
  createAnswer,
  getAnswersByQuestion,
  likeAnswer,
  dislikeAnswer,
  addComment,
} = require("../controller/answer.controller");

// ➕ créer réponse
router.post("/", createAnswer);

// 📥 réponses d’une question
router.get("/:questionId", getAnswersByQuestion);

// 👍 like
router.post("/like/:id", likeAnswer);

// 👎 dislike
router.post("/dislike/:id", dislikeAnswer);

// 💬 commentaire
router.post("/comment", addComment);

module.exports = router;