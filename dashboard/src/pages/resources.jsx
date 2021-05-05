import './resources.css';
import { Tabs, Tab, Accordion, Card, Button } from 'react-bootstrap';
import Overview from '../components/overview';
import Links from '../components/links';
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
              <Overview />
            </Tab>
            <Tab eventKey="data" title="Map Data">
              <div className="info-container">
                <Card>
                  <Card.Header>N.O.A.A CCES</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      In 2018, the National Oceanic Atmospheric Association (N.O.A.A) conducted the California Current Ecosystem Survey (C.C.E.S). They attached microphones to drifting buoys and set them in the California currrent. The buoys recorded 2 minutes of sound at a time. From these recordings, reseachers computed various metrics such as Third Octave Levels and the Broadband measurement. They also searched the data for beaked and sperm whale sounds.
                    </Card.Text>
                    <Button variant="primary" href="https://repository.library.noaa.gov/view/noaa/27223">Read Report</Button>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Cetacean Density</Card.Header>
                  <Card.Body>
                    <Card.Text>
											Becker et. al (2020) estimated the density of cetaceans in the California Current Ecosystem using survey data from 1991-2018. The density is measured in animals per square kilometer.
                    </Card.Text>
                    <Button variant="primary" href="https://repository.library.noaa.gov/view/noaa/27826">Read Report</Button>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Sea Lion Density</Card.Header>
                  <Card.Body>
                    <Card.Text>
											Welch and Hazen et. al. (2019) generated a density map of Sea Lions in the California Current Ecosystem using Boosted Regression Tree Models.
                    </Card.Text>
                    <Button variant="primary" href="https://conbio.onlinelibrary.wiley.com/doi/10.1111/cobi.13417">Read Report</Button>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Shipping Density</Card.Header>
                  <Card.Body>
                    <Card.Text>
											N.O.A.A and B.O.E.M maintain a dataset of vessel traffic data, also known as Automatic Identification System (AIS) data. The shipping density is measured by counting the number of unique ships passing through 0.1 latitude by 0.1 longitude square over the course of the month.
                    </Card.Text>
                    <Button variant="primary" href="https://marinecadastre.gov/ais/">View Data</Button>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Oil and Natural Gas Platforms</Card.Header>
                  <Card.Body>
                    <Card.Text>
											The Department of Homeland Security maintains a dataset of Oil and Natural Gas platforms off the coast of the United States.
                    </Card.Text>
                    <Button variant="primary" href="https://hifld-geoplatform.opendata.arcgis.com/datasets/oil-and-natural-gas-platforms/geoservice?geometry=-132.124%2C30.121%2C-100.812%2C36.541">View Data</Button>
                  </Card.Body>
                </Card>
              </div>
            </Tab>
            <Tab eventKey="links" title="Featured Links">
              <Links />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
export default Resources;
