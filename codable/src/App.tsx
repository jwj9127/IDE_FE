import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Study from './pages/Study/Study';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/study" element={<Study />} />
      </Routes>
    </Router>
  );
};

export default App;
