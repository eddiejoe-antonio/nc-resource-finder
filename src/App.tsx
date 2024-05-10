// App.js
// import Cards from './components/Cards';
import { MantineProvider } from '@mantine/core';
import Header from './components/Header';
import ResourceFinder from './components/ResourceFinder';
// import MapInterface from './components/MapInterface';

function App() {
  return (
    <div className='mx-4 md:mx-0'>
      <MantineProvider>
        <Header />
        <ResourceFinder />
      </MantineProvider>
    </div>
  );
}

export default App;
