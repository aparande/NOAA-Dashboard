import Hero from '../../components/Hero';
import styles from './about.module.css';
import team from "../../data/team.json";
import ReactGA from 'react-ga';
import { useEffect } from 'react';

const TeamMember = ({ picture, memberName, major }) => {
  return (
    <div className={styles.member}>
      <img src={`/team-members/${picture}.jpg`} width="250" height="250" alt={memberName} className={styles.profilePic}></img>
      <div className="m-auto">
        <p className={styles.name}>{memberName.toUpperCase()}</p>
        <p className={styles.major}>{major}</p>
      </div>
    </div>
  )
}

const About = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

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
      <h1 className={styles.subtitle}>Team</h1>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-around align-items-start flex-wrap">
        { team.members.map((member) => <TeamMember picture={member.picture} memberName={member.name} major={member.major}/> ) }
        </div>
      </div>
      <h1 className={styles.subtitle}>Partner</h1>
      <div className={styles.partner}>
        <img src="/team-members/as.jpg" width="250" height="250" alt="Anne Simonis" className={styles.profilePic}/>
        <p className={styles.description}>Anne Simonis is an ecologist, educator and mentor. Her current research is focused on using long term acoustic recordings to study marine ecosystems. She looks for patterns in the presence and behavior of animals in an area, and relates those patterns to environmental conditions and human activities, with the hope of deciphering what is important to the species. If we understand that, hopefully we can minimize the negative impacts our (fishing, shipping, construction, etc) activities have on the ecosystem.</p>
      </div>
      <h1 className={styles.subtitle}>Advisors</h1>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-around align-items-start">
          { team.advisors.map((advisor) => <TeamMember picture={advisor.picture} memberName={advisor.name} major={advisor.major}/> ) }
        </div>
      </div>
    </>
  );
}
export default About;
