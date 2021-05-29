import './resources.css';
import { Tabs, Tab, Accordion, Card, Button } from 'react-bootstrap';
import data_descriptions from '../data/data-descriptions.json';
import LitReview from '../components/lit_review';
import Hero from '../components/Hero/hero';

const Resources = () => {

  return (
    <>
      <Hero title="Soundscape Resources"
        description={
          `The following resources provide more background information and research on soundscapes from an ecology, policy and technical perspective. The Literature Review was written by the CalSound team with support from Anne Simonis by summarizing all the sources linked below.`}
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
              <LitReview />
            </Tab>
            <Tab eventKey="data" title="Map Data">
              <div className="info-container">
                {
                  data_descriptions.map((dd) => (
                    <Card>
                      <Card.Header>{dd.title}</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          {dd.description}
                        </Card.Text>
                        <Button variant="primary" href="{dd.link}">{dd.link_text}</Button>
                      </Card.Body>
                    </Card>
                  ))
                }
              </div>
            </Tab>
            <Tab eventKey="links" title="Featured Links">
              <div className="info-container">
                <Card>
                  <Card.Header>NOAA</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      The National Oceanic and Atmospheric Administration is an American scientific agency within the United States Department of Commerce that focuses on the conditions of the oceans, major waterways, and the atmosphere. NOAA’s mission to better understand our natural world and help protect its precious resources extends beyond national borders to monitor global weather and climate, and work with partners around the world.
            </Card.Text>
                    <Button variant="primary" href="https://www.noaa.gov/">Explore more</Button>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>ADRIFT</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Passive acoustic monitoring (listening!) is an effective way to study marine mammals. Towing hydrophones behind a ship gives good geographic resolution, while seafloor hydrophones give good temporal resolution. ADRIFT's passive acoustic drifting buoys record ~30 days and their low cost allows us to deploy more buoys so that we can improve our study area (in both time and space).
            </Card.Text>
                    <Button variant="primary" href="https://www.fisheries.noaa.gov/west-coast/science-data/adrift-california-current">Explore more</Button>
                  </Card.Body>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default Resources;
