import './info.css';

const Info = () => {
    return(
    <div className="info">
      <div className="fung-noaa">
        <img src="/fung.png" alt="Fung Fellowship Logo" className="fung"></img>
        <p className="plus"> + </p>
        <img src="/noaa.png" width="250" height="250" alt="NOAA Logo" className="noaa"></img>
      </div>
      <p className="heading-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et
        mi ut libero molestie eleifend eget lacinia ligula. Morbi ullamcorper
        nulla nec mauris hendrerit, vitae dictum enim finibus. Sed in massa
        tincidunt, sollicitudin ipsum in, venenatis ante. Sed molestie viverra
        lorem, a iaculis ex fringilla facilisis.
      </p>
    </div>
    );
}
export default Info;
