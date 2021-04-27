import './App.css';
import Map from './pages/map';
import NavBar from './components/navbar'
import Homepage from './pages/homepage'
import Footer from './components/footer'
import About from './pages/about'
import Team from './pages/team'
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
              <Team />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
