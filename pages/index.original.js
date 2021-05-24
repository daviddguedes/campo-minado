import Head from 'next/head'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import items from './../data.json';
import useResizeObserver from '../hooks/resizeObserver';

export async function getStaticProps(context) {
  return {
    props: { data: items },
  }
}

function generateMegaSena() {
  let arr = [];
  while (arr.length < 6) {
    let num = Math.floor(Math.random() * 100) + 1;
    if (!arr.includes(num)) {
      arr.push(num);
    }
  }
  return arr;
}

export default function Home({ data }) {
  const containerRef = useRef();
  const svgRef = useRef();
  const svgGroupRef = useRef();
  const dimensions = useResizeObserver(containerRef);
  const margin = { top: 5, right: 25, bottom: 30, left: 25 };

  useEffect(() => {
    if (!dimensions) return;

    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    let arr = [];
    while (arr.length < 5) {
      let num = Math.floor(Math.random() * data.length) + 1;
      if (!arr.includes(num)) {
        arr.push(num);
      }
    }

    d3.select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)

    const svgGroup = d3.select(svgGroupRef.current)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xData = d3.map(data, function (d) { return d.group; });
    const yData = d3.map(data, function (d) { return d.variable; });

    const x = d3.scaleBand()
      .range([0, width])
      .domain(xData)
      .padding(0.05)
    d3.select(".x-axis")
      .style("font-size", 12)
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3.axisBottom(x)
          .tickSize(0)
      )
      .select(".domain").remove()
      .select(".tick").remove()

    const y = d3.scaleBand()
      .range([height, 0])
      .domain(yData)
      .padding(0.05)
    d3.select(".y-axis")
      .style("font-size", 12)
      .call(
        d3.axisLeft(y)
          .tickSize(0)
      )
      .select(".domain").remove()
      .select(".tick").remove()

    const mousemove = function (event, d) {
      event.preventDefault();
      const value = data.findIndex(el => el.value === d.value);
      if (arr.includes(value + 1)) {
        d3.select(this)
          .attr("xlink:href", "https://previews.123rf.com/images/fil101/fil1011109/fil101110900010/10589503-furbul-cg-character-with-a-question-mark-hovering-above-his-head-.jpg")
      } else {
        d3.select(this).attr("opacity", 0.1)
      }
    }
    const mouseleave = function (event) {
      event.preventDefault();
    }

    const groups = svgGroup.selectAll()
      .data(data)
      .join("g")
      .attr("transform", d => `translate(${x(d.group)},${y(d.variable)})`)

    groups.each(function (d) {
      d3.select(this)
        .append("defs").selection()
        .append("clipPath").attr("id", d.value).selection()
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("fill", "steelblue")

      d3.select(this)
        .append("image")
        .attr("xlink:href", "https://previews.123rf.com/images/blankstock/blankstock1605/blankstock160503065/56324157-question-mark-sign-icon-help-symbol-faq-sign-orange-circle-button-with-icon-vector.jpg")
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("clip-path", `url(#${d.value})`)
        .on("click", mousemove)
        .on("mouseleave", mouseleave);
    })

    return () => null;

  }, [dimensions, data]);

  return (
    <div className="container-app">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div ref={containerRef} className="container-ref">
        <svg id="svg-container" ref={svgRef}>
          <g ref={svgGroupRef} className="group-1">
            <g className="x-axis"></g>
            <g className="y-axis"></g>
          </g>
        </svg>
      </div>

    </div>
  )
}
