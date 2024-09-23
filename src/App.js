import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;