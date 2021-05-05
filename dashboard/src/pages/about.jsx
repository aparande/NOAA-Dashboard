import Team from './team';
import Advisors from './advisors';
import Hero from '../components/Hero/hero';

const About = () => {
  return (
    <>
      <Hero title="About"
        description={
          `CalSound is an independent, non-profit group of students that formed out of the Conservation + Tech track of the Fung Fellowship program at the University of California, Berkeley. Drawing from the principles of
          human-centered design, our prototype helps marine resource managers to
          visualize the impacts of manmade noise pollution in the ocean and
          provides a clear way of visualizing ocean soundscapes.`}
        photo={{
          imgUrl: "/images/about.png", user_link: "https://unsplash.com/@seefromthesky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
          link: "https://unsplash.com/@seefromthesky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText", name: "Ishan @seefromthesky", website: "Unsplash"
        }}
      />
      <h1 className="subtitle">Team</h1>
      <Team />
      <h1 className="subtitle">Partner</h1>
      <div id="partner">
        <img src="/team-members/as.jpg" width="250" height="250" alt="Image of Anne" className="profile-pic"></img>
        <p className="important-body">Anne Simonis is an ecologist, educator and mentor. Her current research is focused on using long term acoustic recordings to study marine ecosystems. She looks for patterns in the presence and behavior of animals in an area, and relates those patterns to environmental conditions and human activities, with the hope of deciphering what is important to the species. If we understand that, hopefully we can minimize the negative impacts our (fishing, shipping, construction, etc) activities have on the ecosystem.</p>
      </div>
      <h1 className="subtitle">Advisors</h1>
      <Advisors />
    </>
  );
}
export default About;
