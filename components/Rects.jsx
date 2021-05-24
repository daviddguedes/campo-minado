import { map } from "d3-array";
import { scaleBand } from "d3-scale";
import { select } from "d3-selection";
import { Fragment, useContext } from "react";
import { ChartContext } from "./ChartContext";

const Rects = ({ dataXKey, dataYKey }) => {
  const [contextData, setContextData] = useContext(ChartContext);

  const { data, size } = contextData;

  if (!data.length) {
    return <h3>Loading...</h3>
  }

  const xData = map(data, function (d) { return d[dataXKey]; });
  const yData = map(data, function (d) { return d[dataYKey]; });
  const xScale = scaleBand().range([0, size.width]).domain(xData).padding(0.05);
  const yScale = scaleBand().range([size.height, 0]).domain(yData).padding(0.05);
  const width = xScale.bandwidth();
  const height = yScale.bandwidth();

  let arr = [];
  while (arr.length < 5) {
    let num = Math.floor(Math.random() * data.length) + 1;
    if (!arr.includes(num)) {
      arr.push(num);
    }
  }

  const mousemove = function (event, d) {
    event.preventDefault();
    const value = data.findIndex(el => el.value === select(this).attr("class"));
    if (arr.includes(value + 1)) {
      select(this)
        .attr("xlink:href", "https://previews.123rf.com/images/fil101/fil1011109/fil101110900010/10589503-furbul-cg-character-with-a-question-mark-hovering-above-his-head-.jpg")
    } else {
      select(this).attr("opacity", 0.1)
    }
  }

  const mouseleave = function (event) {
    event.preventDefault();
  }

  data.forEach(d => {
    select(`.${d.value}`)
      .on("click", mousemove)
      .on("mouseleave", mouseleave);
  });

  return (
    <Fragment>
      {data.map((d, i) => {
        return (
          <g key={d.value} transform={`translate(${xScale(d.group)},${yScale(d.variable)})`}>
            <defs>
              <clipPath id={d.value}>
                <rect width={width} height={height} fill="steelblue" />
              </clipPath>
            </defs>
            <image
              className={d.value} 
              xlinkHref="https://previews.123rf.com/images/blankstock/blankstock1605/blankstock160503065/56324157-question-mark-sign-icon-help-symbol-faq-sign-orange-circle-button-with-icon-vector.jpg"
              width={width}
              height={height}
              clipPath={`url(#${d.value})`}
            />
          </g>
        )
      })}
    </Fragment>
  )
}

export default Rects;
