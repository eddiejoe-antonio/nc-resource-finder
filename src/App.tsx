import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ResourceFinder from './components/ResourceFinder';
import About from './components/About'; // Import About page

const App: React.FC = () => {
  const [selectedView, setSelectedView] = React.useState('list');

  return (
    <Router>
      <Header selectedView={selectedView} setSelectedView={setSelectedView} />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/' element={<ResourceFinder selectedView={selectedView} />} />
      </Routes>
    </Router>
  );
};

export default App;
