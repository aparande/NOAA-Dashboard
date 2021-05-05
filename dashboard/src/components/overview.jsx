import { Accordion, Card, Button, Table } from 'react-bootstrap';
import Citations from '../components/citations';

const MetricTable = () => {
    return(
        <Table striped bordered size="sm">
            <caption>Table 1: Important acoustic metrics used in soundscape data collection</caption>
            <thead>
            <tr>
                <th>Metric</th>
                <th>Abbreviation</th>
                <th>Description</th>
                <th>Unit</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Power Spectral Density</td>
                <td>PSD</td>
                <td>The power spectral density measures how much sound energy is present at each frequency in a given recording.</td>
                <td>dB</td>
            </tr>
            <tr>
                <td>Octave Level</td>
                <td>OL</td>
                <td>An octave band is a range of frequencies where the maximum frequency in the band is twice the minimum frequency in the band (“Octave Band”, 2020). OL measurements give how much sound energy is present in a particular octave band.</td>
                <td>dB</td>
            </tr>
            <tr>
                <td>Third Octave Level</td>
                <td>TOL</td>
                <td>A third octave band is one-third of an octave band (“Octave Band”, 2020). TOL measurements give how much sound energy is present in a particular third octave band.</td>
                <td>dB</td>
            </tr>
            <tr>
                <td>Broadband</td>
                <td>BB</td>
                <td>A BB measurement gives how much sound energy  is present in a large range of frequencies (typically 20Hz - 20kHz). They are useful for characterizing ambient sound level.</td>
                <td>dB</td>
            </tr>
            <tr>
                <td>Acoustic Complexity Index</td>
                <td>ACI</td>
                <td>Originally developed to infer the singing activity of birds. Performs well despite anthropogenic noise (Pieretti et al., 2011).</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Acoustic Diversity Index</td>
                <td>ADI</td>
                <td>Measures the entropy of each species contribution to the soundscape (Villaneuva-Rivera et al., 2011).</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Acoustic Evenness Index</td>
                <td>AEI</td>
                <td>Measures how equal species are in the soundscape. A few species contributing a lot of noise compared to the rest is uneven, while many species contributing is even (Villaneuva-Rivera et al., 2011).</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Acoustic Entropy Index</td>
                <td>H</td>
                <td>The product of the temporal and spectral entropies of the signal. Serves as a measure of diversity in the audio recording. Logarithmically correlates with the number of species in a recording (Sueur et al., 2008).</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Median of Amplitude Envelope</td>
                <td>M</td>
                <td>Computes the median of the amplitude envelope of the audio recording. Measures number of animal vocalizations (Depraetere et al., 2012)</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Normalized Difference Soundscape Index</td>
                <td>NDSI</td>
                <td>Computes the ratio of anthrophony to biophony in an acoustic recording by defining anthrophony and biophony frequency ranges. Measures the level of anthropogenic disturbance in a recording (Kasten et al., 2012).</td>
                <td>--</td>
            </tr>
            <tr>
                <td>Number of Peaks</td>
                <td>NP</td>
                <td>Number of major frequency peaks in a spectrogram. Estimates the level of acoustic activity in a recording (Gasc et al., 2013).</td>
                <td>Count</td>
            </tr>
            </tbody>
        </Table>
    )
}

const Overview = () => {
    return(
        <div className="info-container">
            <h1>Overview of Marine Soundscape Technology and its Implications</h1>
            <p><b>Authors:</b> Audrey Kuptz, Yueyi Che, Anmol Parande, Sara Kopunova, Justin Hogenauer, Choyang Ponsar, Edgar Hildebrandt Rojo, Leena Elzeiny, Sindhu Goli</p>
            <br />
            <p><b>Abstract:</b> The biological, anthropogenic, and geologic sounds that makeup a soundscape can inform the conservation and management of protected species and habitats. The biological components of soundscapes can be useful to characterize biodiversity and monitor the distribution and behavior of individual species. Anthropogenic sound in the ocean is increasing and has been recognized as a threat to marine mammals for decades. In order to understand the impacts of this ocean noise, it is imperative to establish baseline conditions of natural soundscapes, understand how changing soundscapes impact species, and quantify those changes to the soundscapes. As such, marine resource managers require current, comprehensible information in order to make well-informed decisions. However, despite their wide use in terrestrial ecosystems, soundscape assessments are still a relatively new tool for marine ecosystem management. Based on a series of interviews we conducted with researchers, policymakers, and environmental lobbyists, we decided to portray spectral soundscape metrics alongside the context of animal and human activities in a map format. We then created a digital hub for marine soundscape information that researchers, policy makers, and the public can use to easily understand, analyze, and synthesize marine-sourced soundscape data. Our hub is an open-source website displaying spatial and temporal soundscape data, acoustic detections of marine mammals, and mapped species habitats. The platform not only displays ocean soundscape data, but also relevant research, news, and baselines on the map. This new product will facilitate ecosystem-scale conservation policy by helping researchers and policymakers access and understand soundscape data. Our website will help to better guide conservation efforts in complex ocean ecosystems experiencing intense soundscape transformations.</p>
            <Accordion>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    1. Introduction
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <p>Acoustic ecology was first used by Raymond Murray Schafer in 1977 as a way to analyze the impacts of sounds with a human-centered focus. However, the concept then evolved into that of soundscape ecology, a term coined by Krause in 1987. Soundscape ecology differs from acoustic ecology in that it instead focuses on how biological, geological, and anthropogenic acoustics can affect ecosystems and its organisms. Krause further defined the field of soundscape ecology by introducing the concepts of biophony (sounds produced by organisms), geophony (sounds produced by non-biological sources such as rain), and anthrophony (sounds produced by humans). The sounds within a landscape can provide essential insight into the health of the ecosystem, especially when spatial-temporal patterns, frequencies, and disturbances are considered.</p>
                    <p>While the field of soundscape ecology is continuing to evolve, the technology and use of collected data is simultaneously expanding. Once a foundation of understanding the technology behind the field of soundscape ecology has been established, we will delve into the impact of sounds from an ecological perspective and discuss how this data can be used by policymakers to ensure that they are well-informed in their decision making.</p>
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
                    <p>Soundscape ecology data is a vital component in understanding the interactions and health of an ecosystem. Biological, geological, and anthropogenic sounds are collected and analyzed to map spatial and temporal patterns, identify species and natural processes, and better understand the extent of impacts on the ecosystem. In this section, ecosystem soundscape data is divided into the sources of the sound - anthropogenic, geological and biological.</p>
                    <p>When considering ecosystems, it is also important to understand the concept of temporal variability - ecosystems change over time at a variety of rates according to many interdependent ecological factors. The simplest example would be the variation in biological activity between night and day. Since researchers must make a choice when they choose their recording periods, they naturally must take temporal variability into account because the observed differences are made evident by the change in biophony between sampling intervals. There are four broad classifications of ecosystem temporal variability based on the standard deviation (SD) and autocorrelation range (AR) of acoustic indices (Francomano et al., 2020). Class I are soundscapes with great, yet predictable, variation; Class II soundscapes have minimal variability and are very predictable; Class III soundscapes experience minimal, but unpredictable, variability; and Class IV soundscapes vary immensely and are highly unpredictable. Daytime soundscapes tend to be Class IV, whereas dusk and night soundscapes tend to be Class II.</p>
                    <p>When choosing sampling intervals to properly capture temporal variability, researchers should maximize the number of subdivisions and ensure that between 33% and 67% of the desired recording time is captured (Francomano et al., 2020). A subdivision is a block of time for which the entire duration is recorded. As long as these requirements are met, there is a negligible error in the computed soundscape metrics which capture temporal variability (standard deviation and autocorrelation range).</p>
                    <b>2.2 Anthropogenic sounds</b>
                    <p>Anthropogenic sounds are sound generated by human activities in the soundscape. One of the most impactful anthropogenic sources of sound in marine coastal environments comes from shipping traffic. Vessels traversing the Pacific Ocean near the coast of San Francisco exceed average ambient sound levels by 15-20 decibels (dB) (Haver et. al, 2020). This traffic separation scheme was altered to reroute ships in 2013 to preserve the soundscape of the Cordell Bank National Marine Sanctuary. However, some argue that rerouting shipping lanes will “not necessarily decrease vessel-related noise there because low-frequency sound easily propagates into the sanctuary from sources outside of the boundary” (Haver et. al, 2020). Despite this, the speed and size of the vessel heavily impacts the intensity of the sound it produces. Thus, Haver et. al (2020) promotes reducing the speed at which a vessel travels as a possible solution to minimize noise produced by ships coming into the San Francisco Bay. Since 2016, voluntary vessel speed reduction programs have been established and provide incentives for shipping companies to promote their vessels to travel at slower speeds.</p>
                    <p>Another important anthropogenic sound source is wind farms. There are three factors that influence the sound levels of a wind turbine: distance from the wind turbine, size of the wind turbine, and wind speed. In comparison to the noise produced by a single ship, an individual wind turbine has a very small impact on the marine environment. Nevertheless, wind farms have many wind turbines, which collectively create an impact similar to that of a large cargo ship, with the largest impact at the center of the wind farm (Tougaard et al., 2020). This is especially alarming because, unlike ships that simply pass an area, a wind farm is a permanent infrastructure, producing a continual environmental impact on a region. It is also important to consider previous or current underwater noise disturbances within the ecosystem since introducing wind farms to regions without previous exposure to comparable noise will result in a more drastic change to the local soundscape.</p>
                    <b>2.3 Geological sounds</b>
                    <p>Various geological sounds play a significant role in the marine soundscape. Haver et. al (2020) collected data from the NOAA National Data Buoy Center database and the Bodega Ocean Observing Node to monitor wind speed and daily rainfall in order to study how those variables affect the soundscape. On top of the distance from the recorder, the speed at which wind is traveling around the hydrophone can also influence the level of sound recorded. Despite complexities in each individual case, the common trend indicates that higher wind speeds result in higher sound pressure levels (Tougaard et al., 2020). Haver et. al (2020) also discusses several factors that can affect the perceived sound by stating, “the oceanography, density profile, bathymetry, and bottom substrate directly influence the soundscape by facilitating sound transmission from coastal and offshore sound sources”. To further support and contextualize the collected soundscape data, visual observations were compiled from the Southeast Farallon Islands and the Applied California Current Ecosystem Studies’ database. The relationship between different geological sound sources, sound frequencies, and spectrum levels is summarized in the Wenz Curve (Figure 1). Although geological sounds are often not of significant conservation interest in comparison to anthropogenic and biological sounds, they remain critical for understanding the background soundscape, correcting data, and estimating the impact of other sounds on the local ecosystem.</p>
                    <figure>
                        <img src="/figures/figure1.png" />
                        <figcaption>Figure 1: The Wenz Curve</figcaption>
                    </figure>
                    <b>2.4 Biological sounds</b>
                    <p>The ability to communicate through sound in an ecosystem can have a profound influence on the lives and behavioral patterns of organisms. Since sound has been linked to mating, locating, and warning practices, if other sounds disrupt the communication taking place, organisms must adapt both spatially and temporally to find an open window. Despite the myriad of sound sources that can be heard at a single time, there is very little overlap between species due to the capitalization of specific frequency ranges. The availability of resources can also dictate differences in species communication both spatially and temporally. Although species can adapt to utilize different frequencies or communicate at different times, the anthropogenic sound pollution of a certain marine organism’s frequency bin can cause hearing loss and behavioral changes for the marine species, a phenomenon called acoustic masking (Clark et al., 2009). For example, whales such as the blue whale, fin whale, and humpback whale use low frequency calls for feeding, navigation, and reproduction. Increases in anthropogenic sounds can interfere with species communication, causing temporal patterns to diminish inversely with increasing anthrophony (Pijanowski et. al, 2011).</p>
                    <p>An analysis by Haver et al. (2020) of the hydrophones placed in Cordell Bank National Marine sanctuary monitored humpback whales, blue whales, fin whales, and grey whales. Humpback whales generate sounds across many frequencies, overlapping with vessel noise and weather event frequencies. While humpback calls were difficult to detect acoustically, blue whale and fin whale calls are easier to detect due to their higher energy and narrower band. A blue whale’s B-calls are males singing for mating season, with acoustic detection peaking in late fall (Haver et al., 2020). A blue whale’s D-calls are reserved for social interaction and its peak in spring and summer overlaps with the peak in visual sightings within the same months (Haver et al., 2020). The lack of visual sightings, but the abundance of the audio detections of D-calls, attributes to “a larger geographic distance from shore with less frequent and predictable surfacing intervals, which presumably makes them more difficult for visual observers to detect, but still places them within acoustic detection range.” On the other hand, a grey whale’s M3 calls coincide with migration. Although these whales had visual sightings, no calls were found on the acoustic recordings. This may be a result of their low energy range, which can be easily masked by other noise.</p>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    3. Acoustic Recording and Data Processing 
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                <Card.Body>
                    <b>3.1 Introduction</b>
                    <p>Passive acoustic monitoring (PAM) involves passively recording marine audio. It is passive because it does not transmit any sound into the environment and only records when it detects any sounds from outside sources. As Towsey et al. (2018) mention, PAM is effective for studying marine environments because it has a longer duration, wider coverage, more permanence, and is less obtrusive when compared to visual observation (Towsey et al., 2018). It has also been successful in various tasks such as characterizing the impact of unknown motorized vessels near Australian marine parks within a one month period (Kline et al., 2020).</p>
                    <p>PAM data is collected when sounds are picked up by hydrophones and stored by acoustic recorders. Since these recorders are drifting, the distance and velocity at which these recorders travel is highly dependent on ocean currents and wind. There are three common methods to record sounds: hydrophones attached to vehicles or hydrophone arrays towed behind ships, hydrophones moored to the sea floor, and hydrophones on drifting buoys. Towed arrays of hydrophones cover a large spatial area, such as the entire California coastline, but only capture a snapshot of the soundscape environment for the moment at which they pass through the area. By contrast, a hydrophone moored to the sea floor records how the soundscape changes through time, but only at a single location. Moored hydrophone can also be limited by the depth of the ocean, making it difficult to collect data in waters that are too deep and have too high of pressure. The middle ground of these two methods is the use of drifting buoys, which is the method we selected for our prototype. Drifting buoys float on the surface of the ocean, cover a distance on the scale of hundreds to thousands of meters, and record in a single area longer than towed arrays depending on the speed of ocean currents and wind. We chose drifting buoys as our soundscape data collection method because it can provide insight into the evolution of the soundscape within a region over time, but also cover a respectable amount of area.</p>
                    <p>When collecting soundscape data, sampling rate is an important parameter to consider. To detect sound of different frequencies, we want to sample at similar frequencies because too high sampling frequency may fill up storage space too quickly, and too low frequency are not sensitive enough for higher frequency sounds. We also need to sample twice as frequently as the target sound’s frequency. For example, the highest frequency of interest to researchers is 1 kilohertz (kHz), which requires a hydrophone to sample at 2 kHz. All three sampling methods described above must be collected for data processing in a laboratory once sounds have been recorded. Due to the remoteness of open and deep ocean waters, the hydrophones are incapable of simultaneously recording and uploading soundscape data while deployed in the field. Additionally, storage capacity can be a limiting factor and must also be considered since towed arrays attached to ships generally have more storage space than the other two methods.</p>
                    <b>3.2 Acoustic Metrics</b>
                    <p>Once the hydrophones are collected from the ocean, raw acoustic data can be downloaded and visualized by spectrograms. Various metrics can be computed from the raw data, such as the sound pressure levels at different frequencies.</p>
                    <p>One way to analyze the immense amount of data collected through PAM is to produce acoustic metrics, which focus on different aspects of sound energy. In terrestrial ecosystems, acoustic metrics have been used to assess biodiversity, model community assemblage patterns, describe habitats and spatial heterogeneity, quantify human noise pollution, and gauge ecological condition (Roca et al, 2020). Both models trained on acoustic metrics and models trained on raw collected audio can provide additional insight into the acoustic environment of an ecosystem.</p>
                    <p>However, because recorders detect all sounds within an ecosystem, raw audio and, thus, acoustic metrics, can be impacted by other unwanted acoustic noise, such as geophony. For example, Sánchez‐Giraldo et al. (2020) outlined the importance of studying rainfall’s effect on acoustic indices. A frequent practice in many studies is to ignore or remove data associated with rainfall with a low-frequency filter. Since an efficient process of rainfall data removal has yet to be developed, large portions of data can be discarded, thus creating inconsistency or gaps in the data. Sánchez‐Giraldo et al. (2020) found that the acoustic complexity index (ACI) and the bioacoustic index (BI) experienced the least change after rain was filtered out from the original audio (both below 5%), making them reliable metrics in studies involving rainfall.</p>
                    <MetricTable />
                    <b>3.3 Source Identification and Separation</b>
                    <p>Broadly defined, a sound source is something which produces noise. It can be an individual organism or object (e.g a single dolphin or boat) or an event (e.g rainfall). Although some sound sources can be recognized by distinct spectral and temporal features, others require additional independent identifications, such as through visuals or genetics, to classify the source. Some marine mammals and fish species’ vocal properties have been described for sound source identification (Baumann-Pickering et al., 2013; Soldevilla et al., 2008). As opposed to classifying individual signals (Oswald et al., 2007), classification performance may be optimized by analyzing aggregations of different call types (Rankin et al., 2017). Different call types of certain species can also be used for identifying behavioral states, such as foraging and reproduction (Oleson et al., 2007). Nevertheless, there are many sound signal sources that remain unknown (Baumann-Pickering et al., 2013).</p>
                    <p>The main tasks necessary to process soundscape data are source identification and source separation. Source identification determines what the source of the sound detected. The main point of interest are sound anomalies that stand out among the sound of the background environment. For example, an increase of energy in a third octave level band centered at 40 Hz could be due to the presence of baleen whales. However, different sound sources may produce third octave level anomaly in the same frequency. Thus, the 40 Hz anomaly described above could also be produced by ships or both baleen whales and ships. Currently, scientists have come up with different methods of source identification, some of which will be described below.</p>
                    <p>One approach, taken by Sethi et al. (2020), is to train supervised classifiers to search for irregular sounds in the ecosystem, such as chainsaws and gunshots (Sethi et al., 2020). However, as found by the researchers, this approach lacks transferability between marine environments, achieving high local accuracy at the expense of generality. In other words, the algorithms used are so specific to the training set that many sounds go unnoticed and unclassified (e.g. if a recorded chainsaw sound differs slightly from the chainsaw sound used within the training set). Additionally, this approach often requires laborious data annotation and transfers inaccurately from one ecosystem to another.</p>
                    <p>In their paper, Towsey et al. (2018)  presented an example of this type of source identification. Using a State Vector Machine and the Waikato Environment for Knowledge Analysis (WEKA) machine learning packet, they were able to train a classifier to identify the calls of the Lewin Rail, a bird found in Australia, Wallacea, and New Guinea (Towsey et al., 2018). The classifier operated on a long duration, false color spectrogram and could identify calls of birds the human observers had trouble identifying visually. One drawback Towsey et al. (2018) observed was that acoustic monitoring proved ineffective when several different animal calls occur simultaneously or when the sound signals have low amplitude (Towsey et al., 2018).</p>
                    <p>Sethi et al. (2020) used a pre-trained general-purpose audio classification convolutional neural network to characterize the soundscape across spatial, temporal, and ecological scales (Sethi et al., 2020). By creating automated summaries of data that highlight the most typical sounds at a given site, any sound that does not match the typical sounds is considered anomalous and a cause for concern. Figure 2 below shows the process of data collection and processing using this approach. Ultimately, one application of this type of data processing is the creation of real-time warning systems. These systems automatically warn the right people of unpredicted rapid change to the environment or anomalous sounds that may indicate illegal activities, such as unregulated fishing.</p>
                    <figure>
                        <img src="/figures/figure2.png" />
                        <figcaption>Figure 2: Soundscape characterization across spatial, temporal, and ecological scales utilizing a pre-trained general-purpose audio classification convolutional neural network (Sethi et al., 2020)</figcaption>
                    </figure>
                    <p>Sometimes multiple sounds or sound sources can occur in the same soundscape. While metrics like the Acoustic Complexity Index (Sánchez‐Giraldo et al., 2020) and spectrograms can be used to characterize how many sources are contributing to the soundscape, they give no insight into which sounds are coming from which sources. To identify each sound source, one must employ sound separation methods. For example, if there are three animals heard in the recording, source separation allows researchers to isolate the sounds made by each animal. </p>
                    <p>There are two types of source separation: blind source separation and model-based source separation. Blind source separation (BSS) separates a mixture of signals without knowledge of pre-existing labels for those sources. BSS works by finding a basis of signals which best encompasses the mixture. BSS techniques include Principal Component Analysis (PCA), Independent Component Analysis (ICA), and Non-negative Matrix Factorization (NMF). In order to determine which method to use, it is important to have prior information (such as a good model for system noise, the number of sources, etc.) since each has its own set of assumptions or requirements. For example, ICA assumes sources are statistically independent, whereas PCA makes no such assumption.</p>
                    <p>When there are pre-existing labels for source signals of interest, then they can be used for model-based source separation. ICA and NMF can also be used in this “supervised” setting where there is existing labeled data to train on. Deep Learning has only recently been applied to acoustic data and the problem of source separation (Lin and Tsao, 2020). These networks often learn from the spectrogram of acoustic data. However, while powerful, deep learning approaches require lots of training signals as well as both mixed and pure source sounds.</p>
                    <p>Once sources have been separated, they can be used to analyze the diversity of the soundscape. Examples include distinguishing between biological and anthropogenic noise (using PCA) or separating out animal vocalizations. So far, model-based source separation has proved to be a challenging process due to the lack of source signals without interference from another source (Lin and Tsao, 2020). Applying source separation in a “semi-supervised” fashion (using small amounts of existing labeled data for model building, but allowing new labels to be discovered) might also be useful for identifying unknown species based on the sounds they make (Lin and Tsao, 2020).</p>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                    4. Science-Informed Policy 
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="4">
                <Card.Body>
                    <p>Soundscape ecology has been researched for nearly fifty years, but the formal study of marine soundscapes has existed for much less than that. Consequently, the field of marine soundscapes has yet to create an accepted standard for data processing, modeling, and reporting. This issue of lack of standards causes a “misinterpretation of analyses, creation of policy that may be either too conservative or liberal, and create obstacles for collaboration across past, current, and future monitoring studies” (IQOE Workshop Report). The ocean community acknowledges the need to converge on a framework for the collection, processing, and reporting of data. Therefore, there have been attempts to gather experts for discussion.</p>
                    <p>One project aiming to set a standard through its research was the Baltic Sea Information on the Acoustic Soundscape (BIAS). Established in 2012, the project was a regional partnership to assess the understanding of underwater sounds in the Baltic Sea. BIAS raised awareness among local authorities and managers, established a regional implementation, led to the creation of informed soundscape maps, and established regional standards and tools for cross-border cooperation. The five-year project involved extensive planning, field work, data analysis, modelling, GIS-work and writing reports. Such an initiative is one of the first of its kind in the field to measure anthropogenic sound in a shallow sea environment.</p>
                    <p>In another study, the Atlantic Deepwater Ecosystem Observatory Network (ADEON) sought to establish a similar standard for the Atlantic Ocean. Launched in the fall of 2017, ADEON aimed to measure both the natural and human factors active in the region, which would ultimately assist federal agencies including NOAA, BOEM, SFA in creating data-driven public policies. The report outlined the types of quantitative and qualitative data measured in their multi-year project. The main soundscape measurement products were (1) monthly and annual statistics of 24-hour temporal observation windows, (2) hourly, daily, monthly and annual statistics of 60-second temporal observation windows and (3) hourly, daily statistics of 1-second temporal observation windows. These different types of measurements will provide comprehensive insights into the ecosystem’s soundscape and each temporal observation window will measure different types of sound.</p>
                    <p>The goal of the project was to quantify the contribution from different sources and measure the proportion of time for which the contribution from a specific source dominates for a specific temporal observation window duration. Using this method and different observation window durations, ADEON will be able to measure geophysical sounds, including wind, rain, turbidity currents and geophysical events, biological sounds, such as fish choruses and whistle and click detectors for various types of whales, and man-made sounds, including vessels and airgun pulses.</p>
                    <p>The SanctSound collaboration, including NOAA and the US Navy, expressed appreciation for both the BIAS and ADEON projects for their methodology which could be used as a baseline for similar projects and documentation. A SanctSound  workshop in 2018 discussed and compared analytical approaches to soundscape measurement in the US National Marine Sanctuary System to support dialog among colleagues working in this field. Three regions, East coast, West coast, and Pacific, were selected as sanctuaries with likely to represent different noise contribution levels totaling eight monitoring locations. Participants were provided with the list of questions then asked to summarize approaches they have used or are using within their soundscape research to address these needs.</p>
                    <figure>
                        <img src="/figures/figure3.png" />
                        <figcaption>Figure 3: US National Marine Sanctuary System</figcaption>
                    </figure>
                    <p>The 2018 collaboration with NOAA and the Navy concluded that there is also a preference to ensure compatibility with a subset of ADEON’s identified products as it would lead to standardization in the field and lead to more collaboration. Participants emphasized that acoustic propagation analysis should be conducted early so that the data will be coherent and can be analyzed. There was also a desire for the program to support more innovation in the field in regards to developing advanced tools to parse through and process coarse data. These guiding principles will be used in the future as groups continue to work with soundscape data and develop the program.</p>
                    <p>Other groups are also working hard to create a standardized soundscape environment. In the summer of 2019, the IQOE Workshop Report brought together researchers from all over the world to a one-day conference to standardize soundscape data collection. As part of this conference they agreed to a standard for data frequency bands for broadband quantities and time-zones (UTC). Still, as the IQOE Workshop Report mentions, there are many other points to discuss, such as data analysis/modeling techniques, measurement depth standards, data processing benchmarks, and quantifying uncertainty levels.</p>
                    <p>In summary, for the future of ocean management, it will be essential to establish a baseline for monitoring and modeling ocean soundscapes and their relationship to marine species. The significance of such standardization is to ensure compatibility between the different soundscape measurements and existing models. By setting a metadata standard for measured and predicted ocean soundscapes, researchers and institutes will be able to facilitate comparisons between soundscapes metrics and different projects, contributing to existing efforts for both alternative energy production and biodiversity conservation.</p>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                    5. Discussion
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="5">
                <Card.Body>
                    <p>Aside from the literature review, we also conducted twelve interviews with experts in academia and industry to gain firsthand knowledge on soundscape methods and data being implemented in marine science management. The interviewees commonly expressed that information related to soundscape is scattered around in various places and it would be helpful to centralize the knowledge. For example, there is a clear divide within the industry between biologists (who know a lot about animal species) and physicists (who better understand sound acoustics). Common areas of improvements brought up by the interviewees include underwater acoustic principles are often confused with terrestrial acoustic principles, more acoustic research is needed for fish and crustaceans, and sound thresholds that are currently used in the Marine Mammal Protection Act need to be updated.</p>
                    <p>Current soundscape data analysis tools are too simple and cannot satisfy management needs management. Our interviewees expressed a need for a comprehensive platform that allows users to cross-compare different sounds at the same location at different times, such as temporal change of vessel or whale dominated sound anomalies at a coastal location. The coastal managers showed great interest in examining acoustic dynamics and distribution relative to the background environment. They also seek more up-to-date soundscape data, which means that it can reflect the current marine environment, but not necessarily a very recent data set. Many of our interviewees also need more than one kind of soundscape metrics to complete their job. For example, to judge the impact of a sound, they would need to know the location and range of the data source and receiver, frequency and intensity deviance from background, spatial distribution and propagation model, temporal frequency, impact metric on individual species, and accumulation in a 24 hour period. This soundscape data is only useful when it is contextualized with other information, like animal populations in the area, shipping lanes, local fishery activities, etc. Visualizing these data on one accessible platform will help policymakers understand the full context of soundscape dynamics in marine environments, and enforce more effective solutions to manage protected species and protect marine ecosystems.</p>
                    <p>With these previous studies and interviews, we tried to provide a comprehensive overview of marine soundscape data, from underwater soundscape technology methodology, to its application to understanding the marine environment, and further to the marine resource management policies motivated by these studies. Methodology, ecology, and policy on marine soundscape environments are three components that tightly relate to and have influence on each other. Being able to filter and compare different soundscape metrics under the context of local ecological and anthropogenic environments is the key for applying the soundscape technology to the industry.</p>
                    <p>Based on the literature review and interviews, our team developed a soundscape data visualization prototype, CalSound (https://calsound.herokuapp.com/homepage). We decided to portray spectral soundscape metrics alongside the context of animal and human activities in a map format. On the map, we display various data on the California coastline in different spatial and temporal scale: drifting buoys’ third octave level and broadband data and its drift path, anthropogenic sound source density such as oil rings and shipping routes, marine mammal detection events, marine sanctuaries, and marine animal habitats. On the CalSound website, we also have a resource page with science communication short passages on marine soundscape data, as well as the citations, data sources, and this literature review paper. These resources, together with the interactive map, can better inform different audiences, such as researchers, policymakers, managers, students and the public. The platform not only displays ocean soundscape data, but also relevant research, news, and baselines on the map. In the future, we are going to add on more features such as data upload and download functions to this website to make the data visualization more accessible. Our website will help to better guide conservation efforts in complex ocean ecosystems experiencing intense soundscape transformations.</p>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="6">
                    6. Citations 
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="6">
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