
import BluePrintStore from './blueprint.js'
import _ from 'amd!lodash';

//const store = Object.assign({}, BluePrintStore);

const store = _.merge({}, BluePrintStore, {
	state: {
		inputs: [],
		outputs: []
	},
	mutations: {
		addInput: function(state, data){
			state.inputs.push(data);
		},
		
		addOutput: function(state, data){
			state.outputs.push(data);
		}
	}
});

/*
store.mutations.addInput = function(state, data){
	state.inputs.push(data);
}

store.mutations.addOutput = function(state, data){
	state.outputs.push(data);
}
*/

export default store;



