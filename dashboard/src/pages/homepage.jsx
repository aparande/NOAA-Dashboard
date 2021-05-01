import HomeButton from '../components/homebutton'
import './info.css';

const Homepage = () => {

    return(
      <div className="page-container">
      <div className="homepage">
        <h1 className="heading" >Visualize Soundscape Data</h1>
        <p className="heading-text">
          A tool for marine resource managers made in collaboration between UC Berkeley's Fung Fellowship
          program and the National Oceanic and Atmospheric Administration
        </p>
        <HomeButton
            className='btns'
            buttonSize='btn--medium'
            link='/map'>
            View Map
        </HomeButton>
      </div>
      <p className="photo-credit">Photo by <a href="https://unsplash.com/@taliacohen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Talia Cohen</a> on <a href="https://unsplash.com/s/photos/dolphin-underwater?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
      <div>
        <div className="info">
          <div className="fung-noaa">
            <img src="/fung.png" alt="Fung Fellowship Logo" className="fung"></img>
            <p className="plus"> + </p>
            <img src="/noaa.png" width="250" height="250" alt="NOAA Logo" className="noaa"></img>
          </div>
        </div>
      </div>
      </div>
    );
}
export default Homepage;
