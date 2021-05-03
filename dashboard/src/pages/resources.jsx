import './resources.css';
import { Tabs, Tab } from 'react-bootstrap';
import Overview from '../components/overview';
import Links from '../components/links';
import Hero from '../components/Hero/hero';

const Homepage = () => {

  return (
    <>
      <Hero title="Soundscape Resources"
        photo={{
          imgUrl: '/images/resources.png',
          link: 'https://unsplash.com/photos/ZaZhmR63_X8?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink',
          user_link: 'https://unsplash.com/@almosbech?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
          name: 'Almos Bechtold',
          website: 'Unsplash'
        }}
      />
      <div className="info">
        <div id="container">
          <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
            <Tab eventKey="overview" title="Overview">
              <Overview />
            </Tab>
            {/* <Tab eventKey="data" title="Map Data">

            </Tab> */}
            <Tab eventKey="links" title="Featured Links">
              <Links />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default Homepage;
