import { useState } from 'react';
import Header from './components/Header';
import ResourceFinder from './components/ResourceFinder';

function App() {
  const [selectedView, setSelectedView] = useState('list'); // Maintain view state at App level

  return (
    <div className='mx-4 md:mx-0'>
      <Header selectedView={selectedView} setSelectedView={setSelectedView} />
      <ResourceFinder selectedView={selectedView} />
    </div>
  );
}

export default App;
