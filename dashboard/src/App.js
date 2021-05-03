import './App.css';
import Map from './pages/map';
import NavBar from './components/navbar'
import About from './pages/about'
import Resources from './pages/resources'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Hero from './components/Hero/hero';

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path="/">
            <NavBar variant="transparent" />
            <Hero title="Visualize Soundscape Data"
              description="A tool for marine resource managers made in collaboration between UC Berkeley's Fung Fellowship program and the National Oceanic and Atmospheric Administration"
              button={{ link: "/map", text: "View Map" }}
              photo={{
                imgUrl: "/images/home.png", user_link: "https://unsplash.com/@taliacohen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
                link: "https://unsplash.com/s/photos/dolphin-underwater?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", name: "Talia Cohen"
              }}
            />
          </Route>
          <Route path="/map">
            <NavBar variant="dark" />
            <Map />
          </Route>
          <Route path="/about">
            <NavBar variant="transparent" />
            <About />
          </Route>
          <Route path="/resources">
            <NavBar variant="transparent" />
            <Resources />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
