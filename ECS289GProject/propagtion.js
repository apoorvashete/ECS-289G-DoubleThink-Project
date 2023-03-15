//SIE model for propagation 

//define alpha, beta for the model 
const beta= 0.5;
const alpha= 0.1; 
const threshold= 100;
const numNodes= graph.nodes.length;

//initialise S, E, I 
const S= new Array(numNodes).fill(1); //all values of S set to 1
const E= new Array(numNodes).fill(0); //all values of E to 0
const I= new Array(numNodes).fill(0); //all values of I to 0 

//Define initial conditions
const numsInitialNodesInfected=3; //we are giving 3 nodes the information and they will start propagating the news
const initialInfected=[];


//initialise the intially infected array with any 3 random nodes as the strating node
for(let i=0; i<numsInitialNodesInfected; i++){
 const randomIndex = Math.floor(Math.random() * numNodes);
  initialInfected.push(randomIndex);
}

//changing state of all initially infected nodes from S--> I
for (let i = 0; i < initialInfected.length; i++) {
  const nodeIndex = initialInfected[i];
  S[nodeIndex] = 0;
  I[nodeIndex] = 1;
  E[nodeIndex]= 1; 
}

//Propagation model
function sei_propagation(){
	const queue= [];

//Intialise queque with initalInfected
	for (let i = 0; i < initialInfected.length; i++) {
	    queue.push(initialInfected[i]);
	  }
	const visited= new Set(initialInfected)

	while (queue.length > 0) {
	    const currentNodeIndex = queue.shift();
	    const currentNode = graph.nodes[currentNodeIndex];
	    const neighbors = currentNode.neighbors;
	    const transmissionProb = []; // transmission rates to neighbors

	for (let i = 0; i < neighbors.length; i++) {
	  const neighborIndex = neighbors[i];
	  const neighbor = graph.nodes[neighborIndex];
	  const values = neighbor.value;
	  const transmissionProb = values * beta < threshold ? 0 : values * beta;
	  
	  if (!visited.has(neighborIndex)){

	  	if (Math.random() < transmissionProb) {
	    visited.add(neighborIndex);
	    queue.push(neighborIndex);
	    S[neighborIndex] = 0;
	    I[neighborIndex] = 1;
  		}

  		else{
  			E[neighborIndex]=1;
  		}

	  } 
	}
}
//Define time step and simulation parameters
	const fs = require('fs');
	const dt = 0.01;
	const numSteps = 100;
	// Define output object
	const output = [];

	// Run simulation
	for (let step = 1; step <= numSteps; step++) {
	  const S_next = [];
	  const E_next = [];
	  const I_next = [];


	  for (let i = 0; i < numNodes; i++) {
	    const dSdt = -alpha * S[i] * I[i];
	    const dEdt = alpha * S[i] * I[i] - beta * E[i];
	    const dIdt = beta * E[i];

	    S_next.push(S[i] + dt * dSdt);
	    E_next.push(E[i] + dt * dEdt);
	    I_next.push(I[i] + dt * dIdt);
	  }
    S = S_next;
	E = E_next;
	I = I_next;

	output.push({S: S, E: E, I: I});


	}

	fs.writeFileSync('output.json', JSON.stringify(output));

}


sei_propagation();











	  



