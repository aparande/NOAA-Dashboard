import ReactGA from 'react-ga';

const events = {
  HeroButton: (text) => ReactGA.event({ category: "Navigation", action: `Click "${text}"`, label: "Hero Button" }),
  TimeScaleChange: (value) => ReactGA.event({ category: "MapEvent", action: `Change Time Scale`, value: value }),
  TOLPopup: (drift_num) => ReactGA.event({ category: "MapEvent", action: "View TOL", value: drift_num }),
  BBPopup: (drift_num) => ReactGA.event({ category: "MapEvent", action: "View BB", value: drift_num }),
}

export default events;