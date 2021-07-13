import styles from "./map.module.css";
import "../../styles/leaflet.css";

export const step_var =[{
    content: <div><h2>Welcome to CalSound!</h2><p>This tool is meant to help visualize the impacts of manmade noise pollution in the ocean and provide a clear way of visualizing ocean soundscapes.</p></div>,
    position: 'center'
  },
  {
    content: <div className={styles.stepContent}><img src="/images/buoy_path.jpg" className='photo' width='100%' height='100%' /><p>The markers in the ocean are buoys placed by NOAA to collect data on sound, and the grey lines are the paths the buoys have taken over time.</p></div>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20
  },
  {
    content: <div className={styles.stepContent}><img src="/images/hover_path.jpg" className='photo' width='100%' height='100%' /><p>Hover over the path to find out see the Broadband 20Hz - 20kHz measurement over the lifecycle of the buoy.</p></div>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
  },
  {
    content: <div className={styles.stepContent}><img src="/images/click_buoy.jpg" className='photo' width='100%' height='100%' /><p>Click on the buoy itself to see third octave level measurements, which show how much noise energy exists in different frequency bands.</p></div>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20
  },
  {
    content: <p>See how the sound data changes over time by scrubbing through the timeline. The window of time for which you are seeing the data is changed via the different buttons.</p>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
    selector: '#slider',
  },
  {
    content: <p>Discover the impact of these noise levels by enabling different layers such as habitats or species detections.</p>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
    selector: '#menu',
    resizeObservables: ['#menu']
  },
  {
    content: <div><h2>Start Exploring!</h2><p>Check out the Resources tab for information on the source of the data on this map or for relevant links on soundscapes.</p></div>,
    position: 'center'
  }];