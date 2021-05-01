import './App.css';
import Map from './pages/map';
import NavBar from './components/navbar'
import Homepage from './pages/homepage'
import Footer from './components/footer'
import About from './pages/about'
import Resources from './pages/resources'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>  
          <Route path="/map">
              <Map />
          </Route>
          <Route path="/about">
              <About />
          </Route>
          <Route path="/resources">
              <Resources />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
