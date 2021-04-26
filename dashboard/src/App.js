import './App.css';
import Map from './components/map';
import NavBar from './components/navbar'
import Homepage from './components/pages/homepage'
import Info from './components/pages/info'
import Footer from './components/footer'
import About from './components/pages/about'
import Team from './components/pages/team'
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
            <Redirect to="/homepage" />
          </Route>
          <Route path="/homepage">
            <Homepage />
            <Info />
            <Footer/>
          </Route>
          <Route path="/map">
              <Map />
          </Route>
          <Route path="/about">
              <About />
              <Team />
              <Footer/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
