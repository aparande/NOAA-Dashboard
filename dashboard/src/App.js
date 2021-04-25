import './App.css';
import Map from './components/map';
import NavBar from './components/navbar'
import Homepage from './components/pages/homepage'
import Footer from './components/footer'
import About from './components/pages/about'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/pages/homepage">
            <Homepage />
          </Route>
          <Route path="/map">
              <Map />
          </Route>
          <Route path="/pages/about">
              <About />
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
