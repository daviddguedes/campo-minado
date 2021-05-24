import { map } from "d3-array";
import { axisLeft } from "d3-axis";
import { scaleBand } from "d3-scale";
import { select } from "d3-selection";
import { useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";

const AxisLeft = ({ dataKey }) => {
  const [contextData, setContextData] = useContext(ChartContext);

  useEffect(() => {
    const { data, size } = contextData;
    const yData = map(data, function (d) { return d[dataKey]; });
    const yScale = scaleBand()
      .range([size.height, 0])
      .domain(yData)
      .padding(0.05);

    select(".y-axis")
      .style("font-size", 12)
      .call(
        axisLeft(yScale)
          .tickSize(0)
      )
      .select(".domain").remove();
  }, [contextData.size]);

  return (
    <g className="y-axis" />
  )
}

export default AxisLeft;