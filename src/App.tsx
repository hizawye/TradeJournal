import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Dashboard } from './components/Dashboard/Dashboard';
import { darkTheme } from './theme/darkTheme';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
