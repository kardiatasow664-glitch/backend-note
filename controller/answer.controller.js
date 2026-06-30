const Answer = require("../models/answer.model");
const Question = require("../models/question.model");

// POST /api/answer/:id  (id = id de la question)
exports.createAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenu } = req.body;

    if (!contenu || !contenu.trim()) {
      return res.status(400).json({ message: "Le contenu de la réponse est requis" });
    }

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question introuvable" });
    }

    const newAnswer = await Answer.create({
      contenu,
      question: id,
      auteur: req.user?._id || null, // si tu as un middleware d'authentification
    });

    // Lie la réponse à la question (si ton schéma Question a un tableau "reponses")
    question.reponses = question.reponses || [];
    question.reponses.push(newAnswer._id);
    await question.save();

    return res.status(201).json({ answer: newAnswer });
  } catch (error) {
    console.error("Erreur création réponse :", error);
    return res.status(500).json({ message: "Erreur serveur lors de la création de la réponse" });
  }
};

// GET /api/answer/:id  (id = id de la réponse)
exports.getAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id).populate("auteur", "nom email");

    if (!answer) {
      return res.status(404).json({ message: "Réponse introuvable" });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Erreur récupération réponse :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/answer/question/:questionId  (toutes les réponses d'une question)
exports.getAnswersByQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const answers = await Answer.find({ question: questionId })
      .populate("auteur", "nom email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ answers });
  } catch (error) {
    console.error("Erreur récupération réponses :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/answer/:id
exports.updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenu } = req.body;

    const answer = await Answer.findById(id);
    if (!answer) {
      return res.status(404).json({ message: "Réponse introuvable" });
    }

    if (contenu !== undefined) answer.contenu = contenu;
    await answer.save();

    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Erreur modification réponse :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/answer/:id
exports.deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;

    const answer = await Answer.findByIdAndDelete(id);
    if (!answer) {
      return res.status(404).json({ message: "Réponse introuvable" });
    }

    // Retire la référence de la question parente
    await Question.findByIdAndUpdate(answer.question, {
      $pull: { reponses: id },
    });

    return res.status(200).json({ message: "Réponse supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression réponse :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/answer/:id/comment  (id = id de la réponse)
exports.addComment = async (req, res) => {
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

    const newComment = {
      contenu,
      auteur: req.user?._id || null,
    };

    answer.commentaires.push(newComment);
    await answer.save();

    // Récupère le commentaire fraîchement créé (avec son _id et timestamps générés)
    const savedComment = answer.commentaires[answer.commentaires.length - 1];

    return res.status(201).json({ comment: savedComment });
  } catch (error) {
    console.error("Erreur ajout commentaire :", error);
    return res.status(500).json({ message: "Erreur serveur lors de l'ajout du commentaire" });
  }
};