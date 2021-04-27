import HomeButton from '../components/homebutton'
import './info.css';

const Homepage = () => {
    return(
      <>
      <div className="homepage">
        <h1 className="heading">Visualize Soundscape Data</h1>
        <p className="heading-text">
          A tool for marine resource managers made in collaboration between UC Berkeley's Fung Fellowship
          program and the National Oceanic and Atmospheric Administration
        </p>
        <HomeButton
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--medium'
            link='/map'>
            View Map
          </HomeButton>
      </div>
      <div>
        <div className="info">
          <div className="fung-noaa">
            <img src="/fung.png" alt="Fung Fellowship Logo" className="fung"></img>
            <p className="plus"> + </p>
            <img src="/noaa.png" width="250" height="250" alt="NOAA Logo" className="noaa"></img>
          </div>
        </div>
      </div>
      </>
    );
}
export default Homepage;
