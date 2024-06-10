// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/roll-dice', (req, res) => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  res.json([dice1, dice2]);
});

app.post('/calculate-result', (req, res) => {
  const { dice, bet, choice } = req.body;
  const total = dice[0] + dice[1];
  let updatedPoints = 5000; // Initial points, should come from a database or session
  let message;

  if (choice === '7up' && total > 7) {
    updatedPoints += bet * 2;
    message = 'You win!';
  } else if (choice === '7down' && total < 7) {
    updatedPoints += bet * 2;
    message = 'You win!';
  } else if (choice === '7' && total === 7) {
    updatedPoints += bet * 5;
    message = 'Lucky 7! You win big!';
  } else {
    updatedPoints -= bet;
    message = 'You lose!';
  }

  res.json({ message, updatedPoints });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
