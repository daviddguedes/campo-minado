import { map } from "d3-array";
import { axisBottom } from "d3-axis";
import { scaleBand } from "d3-scale";
import { select } from "d3-selection";
import { useContext, useEffect } from "react";
import { ChartContext } from "./ChartContext";

const AxisBottom = ({ dataKey }) => {
  const [contextData, setContextData] = useContext(ChartContext);

  useEffect(() => {
    const { data, size } = contextData;
    const xData = map(data, function (d) { return d[dataKey]; });
    const xScale = scaleBand()
      .range([0, size.width])
      .domain(xData)
      .padding(0.05);

    select(".x-axis")
      .style("font-size", 12)
      .attr("transform", "translate(0," + size.height + ")")
      .call(
        axisBottom(xScale)
          .tickSize(0)
      )
      .select(".domain").remove();
  }, [contextData.size]);

  return (
    <g className="x-axis" />
  )
}

export default AxisBottom;