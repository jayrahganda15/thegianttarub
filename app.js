const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const questions = require('./questions');

const app = express();
let currentLevel = 1;
let score = 0;
let difficulty = 'diamond';

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const getDifficulty = (level) => {
  if (level <= 25) return 'diamond';
  if (level <= 50) return 'crystal';
  if (level <= 75) return 'ruby';
  return 'emerald';
};

app.get('/', (req, res) => {
  res.render('index', {
    question: questions[currentLevel - 1],
    level: currentLevel,
    score: score,
    difficulty: difficulty,
    notification: currentLevel % 25 === 1 && currentLevel !== 1
  });
});

app.post('/answer', (req, res) => {
  const { answer } = req.body;
  if (answer === questions[currentLevel - 1].correctAnswer) {
    score++;
    currentLevel++;
    difficulty = getDifficulty(currentLevel);
    res.redirect('/');
  } else {
    res.send("<script>alert('Oops, you got it wrong!'); window.location.href='/';</script>");
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
