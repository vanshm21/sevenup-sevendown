// src/App.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import GameComponent from './components/gameComponent';
import Footer from './components/footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box mt={5}>
          <GameComponent />
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
