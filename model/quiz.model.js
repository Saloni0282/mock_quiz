
const mongoose = require('mongoose');

const questionSchema =  mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    answerOptions: {
        type: [String],
        required: true,
    },
    correctOptions: {
        type: [Number],
        required: true,
    },
});

const quizSchema = mongoose.Schema({
    creator: {
        type: String,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: [Limit, 'Quizzes must have between 2 & 10 questions.'],
    },
});

function Limit(val) {
    return val.length >= 2 && val.length <= 10;
}

const QuizModel = mongoose.model('Quiz', quizSchema);

module.exports = {QuizModel};
