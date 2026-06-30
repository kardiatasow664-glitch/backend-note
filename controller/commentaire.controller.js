const Comment = require("../models/commentaire.model");
const Answer = require("../models/answer.model");
const Question = require("../models/question.model");

exports.addCommentToAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenu } = req.body;

    if (!contenu || !contenu.trim()) {
      return res.status(400).json({ message: "Le contenu du commentaire est requis" });
    }

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ message: "Réponse introuvable" });
    }

    const newComment = await Comment.create({
      contenu,
      answer: id,
      auteur: req.user?._id || null,
    });

    return res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error("Erreur ajout commentaire (réponse) :", error);
    return res.status(500).json({ message: "Erreur serveur lors de l'ajout du commentaire" });
  }
};

exports.addCommentToQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenu } = req.body;

    if (!contenu || !contenu.trim()) {
      return res.status(400).json({ message: "Le contenu du commentaire est requis" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question introuvable" });
    }

    const newComment = await Comment.create({
      contenu,
      question: id,
      auteur: req.user?._id || null,
    });

    return res.status(201).json({ comment: newComment });
  } catch (error) {
    console.error("Erreur ajout commentaire (question) :", error);
    return res.status(500).json({ message: "Erreur serveur lors de l'ajout du commentaire" });
  }
};

exports.getCommentsByAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ answer: id }).sort({ createdAt: 1 });
    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Erreur récupération commentaires (réponse) :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getCommentsByQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ question: id }).sort({ createdAt: 1 });
    return res.status(200).json({ comments });
  } catch (error) {
    console.error("Erreur récupération commentaires (question) :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenu } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }

    if (contenu !== undefined) comment.contenu = contenu;
    await comment.save();

    return res.status(200).json({ comment });
  } catch (error) {
    console.error("Erreur modification commentaire :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire introuvable" });
    }
    return res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression commentaire :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};