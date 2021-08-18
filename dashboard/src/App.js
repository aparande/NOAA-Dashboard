import Map from './pages/Map';
import NavBar from './components/navbar'
import About from './pages/About'
import Upload from './pages/Upload'
import Resources from './pages/Resources'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Hero from './components/Hero';
import ReactGA from 'react-ga';
import {useEffect} from 'react';
import { CookiesProvider } from "react-cookie";

ReactGA.initialize("UA-201396402-1", { debug: process.env.NODE_ENV !== "production" });

const Index = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])
  
  return (
    <>
      <NavBar variant="transparent" />
      <Hero title="Visualize Soundscape Data"
        description="A tool for marine resource managers made in collaboration between UC Berkeley's Fung Fellowship program and the National Oceanic and Atmospheric Administration"
        button={{ link: "/map", text: "View Map" }}
        photo={{
          imgUrl: "/images/home.png", user_link: "https://www.pexels.com/@earano",
          link: "https://www.pexels.com/", name: "Emiliano Arano", website: "Pexels"
        }}
      />
    </>
  )
}
function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Index />
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
            <Route path="/upload">
              <NavBar variant="transparent" />
              <Upload />
            </Route>
          </Switch>
        </Router>
      </div>
    </CookiesProvider>
  );
}

export default App;
