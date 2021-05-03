import { Accordion, Card, Button } from 'react-bootstrap';
import Citations from '../components/citations';

const Overview = () => {
    return(
        <div className="info-container">
            <h1>Overview of Marine Soundscape Technology and its Implications</h1>
            <p><b>Authors:</b> Audrey Kuptz, Yueyi Che, Anmol Parande, Sara Kopunova, Justin Hogenauer, Choyang Ponsar, Edgar Hildebrandt Rojo, Leena Elzeiny, Sindhu Goli</p>
            <br />
            <p><b>Abstract:</b> The biological, anthropogenic, and geologic sounds that make up a soundscape can inform theconservation and management of protected species and habitats. The biological components ofsoundscapes can be useful to characterize biodiversity and monitor the distribution and behavior ofindividual species. Anthropogenic sound in the ocean is increasing and has been recognized as athreat to marine mammals for decades. In order to understand the impacts of this ocean noise, it isimperative to establish baseline conditions of natural soundscapes, understand how changingsoundscapes impact species, and quantify those changes to the soundscapes. As such, marineresource managers require current, comprehensible information to make well-informed decisions.However, despite their wide use in terrestrial ecosystems, soundscape assessments are still a relatively new tool for marine ecosystem management. Based on a series of interviews we conductedwith researchers, policymakers, and environmental lobbyists, we decided to portray spectralsoundscape metrics alongside the context of animal and human activities in a map format. We thencreated a digital hub for marine soundscape information that researchers, policymakers, and thepublic can use to easily understand, analyze, and synthesize marine-sourced soundscape data. Our hub is an open-source website displaying spatial and temporal soundscape data, acoustic detectionsof marine mammals, and mapped species habitats. The platform not only displays ocean soundscapedata, but also relevant research, news, and baselines on the map. This new product will facilitateecosystem-scale conservation policy by helping researchers and policymakers access and understandsoundscape data. Our website will help to better guide conservation efforts in complex oceanecosystems experiencing intense soundscape transformations.</p>
            <Accordion>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    1. Introduction
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <p>Acoustic ecology was first used by Raymond Murray Schafer in 1977 as a way to analyze the impacts of sounds with a human-centered focus. However, the concept then evolved into that of soundscape ecology in 1987, which, instead, focuses on how biological, geological, and anthropogenic acoustics can affect ecosystems and its organisms. The sounds within a landscape can provide essential insight into the health of the ecosystem, especially when spatial-temporal patterns, frequencies, and disturbances are considered. </p>
                    <p>While the field of soundscape ecology is continuing to evolve, the technology and use of collected data is simultaneously expanding. Once a foundation of understanding the technology behind the field of soundscape ecology has been established, we will delve into the impact of sounds from an ecological perspective and discuss how this data can be used by policymakers to ensure that they are well-informed in their decision making. </p>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    2. Ecology Implications 
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <b>2.1 Introduction</b>
                    <p>Soundscape ecology data is a vital component in understanding the interactions and health of an ecosystem. Biological, geological, and anthropogenic sounds are collected and analyzed to map spatial and temporal patterns, identify species and natural processes, and better understand the extent of impacts of and on the ecosystem. In this section, ecosystem soundscape data is divided into the sources of the sound - anthropogenic, geological and biological.</p>
                    <p>When considering ecosystems, it is also important to understand the concept of temporal variability - ecosystems change over time at a variety of rates according to many interdependent ecological factors. The most simple example would be the variation in biological activity during the day vs. during the night. Since researchers must make a choice when they choose their recording periods, they naturally must take temporal variability into account because this variability is made evident by the change in biophony between sampling intervals. There are four broad classifications of ecosystem temporal variability based on the standard deviation (SD) and autocorrelation range (AR) of acoustic indices (Francomano et al., 2020). Class I are soundscapes with lots of variation but are predictable; Class II soundscapes have minimal variability and are very predictable; Class III soundscapes are minimal variability but low predictability; finally, Class IV soundscapes vary quite a bit and are highly unpredictable. Daytime soundscapes tend to be Class IV, whereas dusk and night soundscapes tend to be Class II.</p>
                    <p>When choosing sampling intervals to properly capture temporal variability, researchers should maximize the number of subdivisions and make sure that between 33% and 67% of the desired recording time is captured (Francomano et al., 2020). A subdivision is a block of time for which the entire duration is recorded. So long as these requirements are met, there is a negligible error in the computed soundscape metrics which capture temporal variability (standard deviation and autocorrelation range).</p>
                    <b>2.2 Anthropogenic sounds</b>
                    <p>Anthropogenic sounds are sound generated by human activities in the soundscape. One of the greatest anthropogenic sounds in the marine coastal environment is from shipping traffic. Vessels traversing the Pacific Ocean near the coast of San Francisco shipping lanes exceeded average ambient sound levels by 15-20 dB (Haver et. al, 2020). This traffic separation scheme was altered to reroute ships in 2013 to preserve the soundscape of the Cordell Bank National Marine Sanctuary. However, some argue that rerouting shipping lanes will “not necessarily decrease vessel-related noise there because low-frequency sound easily propagates into the sanctuary from sources outside of the boundary” (Haver et. al, 2020). However, the speed and size of the vessel heavily impacts the intensity of the sound it produces. Thus, Haver et. al (2020) promotes reducing the speed at which a vessel travels as a possible solution to minimize noise as ships come into the San Francisco Bay. Since 2016, voluntary vessel speed reduction programs have been established and provide incentives for shipping companies to make changes, such as slow down ship speed.</p>
                    <p>Another concern in anthropogenic sound is wind farms. There are three factors that influence the sound levels of a wind turbine: distance from the wind turbine, size of the wind turbine, and wind speed. In comparison to the noise produced by a single ship, an individual wind turbine has a very small impact on the marine environment. Nevertheless, wind farms have many wind turbines which collectively create an impact similar to that of a large cargo ship, with the largest impact at the center of the wind farm (Tougaard et al., 2020). This is especially alarming because, unlike ships that simply pass an area, a wind farm is a permanent infrastructure, producing a continual environmental impact on a region. It is also important to consider previous or current underwater noise disturbances within the ecosystem since introducing wind farms to regions without previous exposure to comparable noise will result in a more drastic change to the local soundscape.</p>
                    <b>2.3 Geological sounds</b>
                    <p>Various geological sounds play a significant role in the marine soundscape. Haver et. al (2020) collected data from the NOAA National Data Buoy Center database and the Bodega Ocean Observing Node to monitor wind speed and daily rainfall in order to study how those variables affect the soundscape. On top of recording distance, wind speed around the hydrophone can also influence the received sound level just as significant. Despite the complications in each individual case, the common trend is the higher the wind speed, the higher the sound pressure level (Tougaard et al., 2020). Haver et. al (2020) states, “the oceanography, density profile, bathymetry, and bottom substrate directly influence the soundscape by facilitating sound transmission from coastal and offshore sound sources”. As an addition to the soundscape data, visual observations were compiled from the Southeast Farallon Islands and the Applied California Current Ecosystem Studies’ database. The relationship between different geological sound sources, sound frequencies, and spectrum levels is summarized in the Wenz Curve (Figure.1). Although geological sounds are not of as significant conservation interest as anthropogenic and biological sounds, they are critical for understanding the background soundscape, for data correction and estimating other sounds’ impacts on the local environment. </p>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    3. Citations 
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                <Card.Body>
                    <Citations />
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion>
        </div>
    );
}
export default Overview;