const Answer = require("../models/answer.model");

// ➕ ajouter réponse
const createAnswer = async (req, res) => {
  try {
    const { contenu, auteur, questionId } = req.body;

    const answer = await Answer.create({
      contenu,
      auteur,
      questionId,
    });

    res.status(201).json({
      success: true,
      message: "Réponse ajoutée avec succès",
      answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📥 récupérer réponses d’une question
const getAnswersByQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({
      questionId: req.params.questionId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      answers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 👍 like réponse
const likeAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({
        success: false,
        message: "Réponse introuvable",
      });
    }

    answer.likes = (answer.likes || 0) + 1;

    await answer.save();

    res.status(200).json({
      success: true,
      message: "Like ajouté",
      answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 👎 dislike réponse
const dislikeAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({
        success: false,
        message: "Réponse introuvable",
      });
    }

    answer.dislikes = (answer.dislikes || 0) + 1;

    await answer.save();

    res.status(200).json({
      success: true,
      message: "Dislike ajouté",
      answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 💬 ajouter commentaire
const addComment = async (req, res) => {
  try {
    const { answerId, auteur, contenu } = req.body;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      return res.status(404).json({
        success: false,
        message: "Réponse introuvable",
      });
    }

    answer.comments.push({
      auteur,
      contenu,
    });

    await answer.save();

    res.status(200).json({
      success: true,
      message: "Commentaire ajouté",
      answer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAnswer,
  getAnswersByQuestion,
  likeAnswer,
  dislikeAnswer,
  addComment,
};