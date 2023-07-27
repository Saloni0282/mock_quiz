const express = require("express")

const { QuizModel } = require("../model/quiz.model")

const QuizRouter = express.Router()

QuizRouter.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await QuizModel.find().populate('creator', 'username');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


QuizRouter.post('/quizzes', async (req, res) => {
    try {
        const { creator, title, description, questions } = req.body;
        const quiz = await QuizModel.create({ creator, title, description, questions });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


QuizRouter.put('/quizzes/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const quiz = await QuizModel.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

QuizRouter.delete('/quizzes/:id', async (req, res) => {
    try {
        const quiz = await QuizModel.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

QuizRouter.get('/quizzes/:id/leaderboard', async (req, res) => {
    try {
        const quiz = await QuizModel.findById(req.params.id).populate('leaderboard.user', 'username');
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        const leaderboard = quiz.leaderboard.sort((a, b) => b.score - a.score);
        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { QuizRouter }