import React from "react";
import * as d3 from "d3";
import { select } from "d3-selection";

// const ForceLayout = () => (
//   <div className={styles.ForceLayout} data-testid="ForceLayout">
//     ForceLayout Component
//   </div>
// );

// ForceLayout.propTypes = {};

// ForceLayout.defaultProps = {};

class ForceLayout extends React.Component {
  componentDidMount() {
    const { width, height, data } = this.props;

    const force = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .nodes(data.nodes)
      .on("tick", ticked);

    force.force("link").links(data.links);

    const svg = select(this.refs.mountPoint)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const link = svg
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .style("stroke", "#999999")
      .style("stroke-opacity", 0.6)
      .style("stroke-width", (d) => Math.sqrt(d.value));

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const node = svg
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 5)
      .style("stroke", "#FFFFFF")
      .style("stroke-width", 1.5)
      .style("fill", (d) => color(d.group))
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function dragstarted(event, d) {
      if (!event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  render() {
    const { width, height } = this.props;
    const style = {
      width,
      height,
      border: "1px solid #323232",
    };

    return <div ref="mountPoint" style={style}></div>;
  }
}

export default ForceLayout;
