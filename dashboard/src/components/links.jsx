import { Card, Button} from 'react-bootstrap';

const Links = () => {
    return(
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
    );
}
export default Links;