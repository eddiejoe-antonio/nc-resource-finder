// App.js
import Cards from './components/Cards';
import MapInterface from './components/MapInterface';
import Toggle from './components/Toggle';

function App() {
  return (
      <div className="container mx-auto p-4">
        <Toggle />
            <Cards />
            <MapInterface />
      </div>
  );
}

export default App;
