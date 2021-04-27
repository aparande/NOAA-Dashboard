import HomeButton from '../components/homebutton'

const Homepage = () => {
    return(
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
          GET STARTED
        </HomeButton>
    </div>
    );
}
export default Homepage;
