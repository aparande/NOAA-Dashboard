import './App.css';
import Map from './components/map';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';




function App() {
  return (
    <div className="App">
			<Map />
    </div>
  );
}

export default App;
