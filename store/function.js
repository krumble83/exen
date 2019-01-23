
import BluePrintStore from './blueprint.js'

const store = Object.assign({}, BluePrintStore);

store.state.inputs = [];
store.state.outputs = [];

store.mutations.addInput = function(state, data){
	state.inputs.push(data);
}

store.mutations.addOutput = function(state, data){
	state.outputs.push(data);
}


export default store;
