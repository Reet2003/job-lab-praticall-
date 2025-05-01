import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import JobApplicationList from './components/JobApplicationList';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <JobApplicationList />
      </Container>
    </ThemeProvider>
  );
}

export default App; 