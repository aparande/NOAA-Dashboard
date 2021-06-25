export const step_var =[{
    content: <div><h2>Welcome to the CalSound tool!</h2><p>This tool is meant to help visualize the impacts of manmade noise pollution in the ocean and provides a clear way of visualizing ocean soundscapes.</p></div>,
    position: 'center'
  },
  {
    content: <p>The markers in the ocean are buoys placed by NOAA to collect data on sound and the grey lines are the paths the buoys have taken over time</p>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
    selector: '.leaflet-tile',
  },
  {
    content: <p>Hover over the path to find out the history of noise levels in that spot, also known as the broadband measurement</p>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
    selector: '.leaflet-tile',
  },
  {
    content: <p>Click on the buoy itself to see the third octave level, which divides up the sound into different frequencies shows the amount of noise for each frequency.</p>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
    selector: '.leaflet-tile',
  },
  {
    content: <p>See how the sound data changes over time by scrubbing through the time line on the left, or by changing the window of time on the right</p>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
    selector: '#slider',
  },
  {
    content: <p>Discover the impact of these noise levels by enabling layers, and clicking on the points that appear</p>,
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 20,
    selector: '#menu',
  },
  {
    content: <div><h2>Start Exploring!</h2><p>Check out the Resources tab for information on the source of the data on this map or for relevant links on soundscapes</p></div>,
    position: 'center'
  }];