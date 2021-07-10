import { LegendContainer, Legend } from './Legend';
import Layer from './layer';

/**
 * 
 * @param {layers} layers A dictionary whose entries are {data, priority, gradient, legend: {colors: Arra}}
 */
const HeatLayer = ({ layers, legendClassName }) => {
  const keys = Object.keys(layers);
  keys.sort((a, b) => layers[a].priority < layers[b].priority);

  const stops = [3.5, 23.5, 43.5, 63.5, 83.5, 103.5];
  return (
    <>
      { keys.map((key, index) => 
        <Layer data={layers[key].data} gradient={layers[key].gradient} key={index} />
      )}
      <LegendContainer className={legendClassName} height="50vh">
        {
          keys.map((key) => {
            <Legend colors={layers[key].legend.colors} stops={stops} maxVal={1.0}/>
          })
        }
      </LegendContainer>
    </>
  );
};

HeatLayer.LegendContainer = LegendContainer;
HeatLayer.Legend = Legend;

export default HeatLayer