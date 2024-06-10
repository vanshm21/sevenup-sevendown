// src/components/GameComponent.jsx
import React, { useState } from 'react';
import { Button, Typography, Select, MenuItem, FormControl, InputLabel, Box, Paper} from '@mui/material';
import axios from 'axios';

const GameComponent = () => {
  const [points, setPoints] = useState(5000);
  const [bet, setBet] = useState(100);
  const [choice, setChoice] = useState('7up');
  const [dice, setDice] = useState([1, 1]);
  const [result, setResult] = useState(null);

  const handleRollDice = async () => {
    try {
      const response = await axios.post('http://localhost:5000/roll-dice');
      const diceResult = response.data;
      setDice(diceResult);
      
      const resultResponse = await axios.post('http://localhost:5000/calculate-result', { dice: diceResult, bet, choice });
      const gameResult = resultResponse.data;
      setResult(gameResult.message);
      setPoints(gameResult.updatedPoints);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        7 Up 7 Down Game
      </Typography>
      <Typography variant="h6" gutterBottom>
        Points: {points}
      </Typography>

      <Box mb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="bet-amount-label">Bet Amount</InputLabel>
          <Select
            labelId="bet-amount-label"
            value={bet}
            onChange={(e) => setBet(e.target.value)}
            label="Bet Amount"
          >
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={500}>500</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="choice-label">Choose Option</InputLabel>
          <Select
            labelId="choice-label"
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
            label="Choose Option"
          >
            <MenuItem value="7up">7 Up</MenuItem>
            <MenuItem value="7">Lucky 7</MenuItem>
            <MenuItem value="7down">7 Down</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button variant="contained" color="primary" onClick={handleRollDice} sx={{ mb: 2 }}>
        Roll Dice
      </Button>

      {dice && (
        <Typography variant="h5" gutterBottom>
          Dice: {dice[0]} + {dice[1]}
        </Typography>
      )}
      {result && (
        <Typography variant="h6" gutterBottom>
          Result: {result}
        </Typography>
      )}
    </Paper>
  );
};

export default GameComponent;
