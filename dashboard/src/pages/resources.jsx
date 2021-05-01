import './resources.css';
import { Tabs, Tab} from 'react-bootstrap';
import Overview from '../components/overview';
import Citations from '../components/citations';
import Links from '../components/links';

const Homepage = () => {

    return(
      <div className="page-container">
      <div className="resources">
        <h1 className="heading" >Soundscape Resources</h1>
      </div>
      <div className="info">
        <div id="container">
        <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
            <Tab eventKey="overview" title="Overview">
                <Overview />
            </Tab>
            <Tab eventKey="citations" title="Citations">
                <Citations />
            </Tab>
            <Tab eventKey="links" title="Links">
                <Links />
            </Tab>
        </Tabs>
        </div>
      </div>
      </div>
    );
}
export default Homepage;
