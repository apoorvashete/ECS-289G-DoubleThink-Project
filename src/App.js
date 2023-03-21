import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import ReactDOM from "react-dom";
import ForceLayout from "./components/ForceLayout/ForceLayout";
import Slider from "./components/ForceLayout/Slider";

function App() {
  const [numNodes, setNumNodes] = useState(50);
  const [data, setData] = useState({ nodes: [], links: [] });

  const handleButtonClick = () => {
    console.log(`numNodes: ${numNodes}`);
    console.log(data)
  };

  const handleSliderChange = (value) => {
    setNumNodes(value);
  };

  const nodeGroups = [1, 2];
  const linkValueRange = [2, 10];


  useEffect(() => {
    // Generate nodes
    const nodes = [];
    for (let i = 0; i < numNodes; i++) {
      const node = {
        id: i + 1,
        group: nodeGroups[Math.floor(Math.random() * nodeGroups.length)],
      };
      nodes.push(node);
    }

    // Generate links
    const links = [];
    for (let i = 0; i < numNodes; i++) {
      const source = nodes[i].id;
      for (let j = i + 1; j < numNodes; j++) {
        const target = nodes[j].id;
        if (Math.random() < 0.05) {
          // randomly decide if there should be a link between nodes
          const value = Math.floor(
            Math.random() * (linkValueRange[1] - linkValueRange[0] + 1) +
              linkValueRange[0]
          );
          const link = {
            source,
            target,
            value,
          };
          links.push(link);
        }
      }
    }

    setData({ nodes, links });
  }, [numNodes]);

  const theme = {
    blue: {
      default: "#3f51b5",
      hover: "#283593",
    },
    pink: {
      default: "#e91e63",
      hover: "#ad1457",
    },
  };

  const Button = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
      background-color: ${(props) => theme[props.theme].hover};
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;
  Button.defaultProps = {
    theme: "blue",
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1> DoubleThink</h1>
      <ForceLayout width={500} height={500} data={data} />
      <Slider onChange={handleSliderChange} />
      <Button onClick={handleButtonClick}>Start Propagation</Button>
    </div>
  );
}

export default App;
