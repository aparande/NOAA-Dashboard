import Map from './pages/Map';
import NavBar from './components/navbar'
import About from './pages/About'
import Resources from './pages/Resources'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hero from './components/Hero';

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
                imgUrl: "/images/home.png", user_link: "https://www.pexels.com/@earano",
                link: "https://www.pexels.com/", name: "Emiliano Arano", website: "Pexels"
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
