const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter number of nodes (between 50 and 150): ', (numNodes) => {
  if (numNodes < 50 || numNodes > 150) {
    console.log('Number of nodes must be between 50 and 150');
    rl.close();
    return;
  }

  const nodeGroups = [1, 2];
  const linkValueRange = [2, 10];

  // Generate nodes
  const nodes = [];
  for (let i = 0; i < numNodes; i++) {
    const node = {
      id: i + 1,
      group: nodeGroups[Math.floor(Math.random() * nodeGroups.length)]
    };
    nodes.push(node);
  }

  // Generate links
  const links = [];
  for (let i = 0; i < numNodes; i++) {
    const source = nodes[i].id;
    for (let j = i + 1; j < numNodes; j++) {
      const target = nodes[j].id;
      if (Math.random() < 0.05) { // randomly decide if there should be a link between nodes
        const value = Math.floor(Math.random() * (linkValueRange[1] - linkValueRange[0] + 1) + linkValueRange[0]);
        const link = {
          source,
          target,
          value
        };
        links.push(link);
      }
    }
  }

  // Create graph object
  const graph = {
    nodes,
    links
  };

  console.log(graph);

  rl.close();
const jsonString = JSON.stringify(graph);
fs.writeFileSync("users1.json", jsonString);
});
