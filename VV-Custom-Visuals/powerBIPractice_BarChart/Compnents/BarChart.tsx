import * as React from "react";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface BarChartProps {
  data: { category: string; measure: number; columnName: string; valueName: string }[];
}

const BarChart: React.FunctionComponent<BarChartProps> = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const w = 400;
    const h = 300;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "45px")
      .style("margin-left", "65px");

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, w])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.measure)])
      .range([h, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.category))
      .attr("y", (d) => yScale(d.measure))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => h - yScale(d.measure))
      .attr("fill", (_, i) => colorScale(i.toString()))
      .on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`<strong>${d.columnName + " : " + d.category}<br/></strong> ${d.valueName + " : " + d.measure}`)
          .style("left", event.pageX + "px")
          .style("background-color", "#c5c5d2")
          .style("padding", "1rem")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        const tooltip = d3.select("#tooltip");
        tooltip.transition().duration(500).style("opacity", 0);
      });
  }, [data]);

  return (
    <div>
      <h1>Bar Chart</h1>
      <svg ref={svgRef}></svg>
      <div id="tooltip" style={{ opacity: 0, position: "absolute" }}></div>
    </div>
  );
};

export default BarChart;
