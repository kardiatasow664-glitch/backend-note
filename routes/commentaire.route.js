const express = require("express");
const router = express.Router();

const {
  addCommentToAnswer,
  addCommentToQuestion,
  getCommentsByAnswer,
  getCommentsByQuestion,
  updateComment,
  deleteComment,
} = require("../controller/commentaire.controller");

router.post("/answer/:id", addCommentToAnswer);
router.get("/answer/:id", getCommentsByAnswer);

router.post("/question/:id", addCommentToQuestion);
router.get("/question/:id", getCommentsByQuestion);

router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;