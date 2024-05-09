// App.js
// import Cards from './components/Cards';
import Header from './components/Header';
import ResourceFinder from './components/ResourceFinder';
// import MapInterface from './components/MapInterface';
import Toggle from './components/Toggle';

function App() {
  return (
    <div className='mx-4 md:mx-0'>
      <Header />
      <ResourceFinder />
      {/* <Cards />
      <MapInterface /> */}
    </div>
  );
}

export default App;
