import React, { useState } from 'react';
import Header from './components/Header';
import ResourceFinder from './components/ResourceFinder';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='mx-container'>
      <Header setIsModalOpen={setIsModalOpen} />
      <ResourceFinder isModalOpen={isModalOpen} />
    </div>
  );
};

export default App;
