import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ResourceFinder from './components/ResourceFinder';
import About from './components/About';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='mx-container'>
      <Router>
        <Header setIsModalOpen={setIsModalOpen} />
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/' element={<ResourceFinder isModalOpen={isModalOpen} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
