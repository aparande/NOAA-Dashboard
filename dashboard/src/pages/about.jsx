import Team from './team';
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
      <Team />
    </>
  );
}
export default About;
