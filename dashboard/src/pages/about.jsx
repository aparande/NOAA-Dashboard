import Team from './team'
const About = () => {
    return(
    <div className="page-container">
      <div className="about">
        <h1 className="heading">About</h1>
        <p className="heading-text">
          CalSound is an independent, non-profit group of students that formed out
          of the Conservation + Tech track of the Fung Fellowship program at the
          University of California, Berkeley. Drawing from the principles of
          human-centered design, our prototype helps marine resource managers to
          visualize the impacts of manmade noise pollution in the ocean and
          provides a clear way of visualizing ocean soundscapes.
        </p>
      </div>
      <p className="photo-credit">Photo by <a href="https://unsplash.com/@erastus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Erastus McCart</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
      <Team />
    </div>
    );
}
export default About;
