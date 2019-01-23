
import BluePrintStore from './blueprint.js'
import FunctionStore from './function.js'

export default {
	state: {
		device: {},
		components: [],
		graphs: [],
		variables: [],
		datatypes: {},
		templates: {
			'function': {description: '', type: 'function', flags: F_IS_FUNCTION, data: {nodes: [], links: []}}
		},
		patterns: {
			name: '[A-Za-z$]{1,}'
		}
	},

	mutations: {
		emptyState() {
			this.replaceState({ nodes: [], links: [] });
		},
		
		addGraph: function(state, data){
			//data.type = 'graph';
			data.description = data.description || '';
			data.flags = (data.flags || 0) | F_IS_BLUEPRINT | F_IS_GRAPH;
			state.graphs.push(data);
		},

		addFunction: function(state, data){
			data.props = data.props || {};
			data.props.description = data.props.description || '';
			data.flags = (data.flags || 0) | F_IS_FUNCTION | F_IS_GRAPH;
			data.$data = new Vuex.Store(FunctionStore);
			data.$data.replaceState({ nodes: [], links: [], inputs:[], outputs:[] });
			state.graphs.push(data);
		},

		addVariable: function(state, data){
			data.props = data.props || {};
			data.props.description = data.props.description || '';
			data.flags = (data.flags || 0) | F_IS_VARIABLE;

			if(!data.data.datatype){
				data.data.datatype = 'core.int';
				data.data.color = '#0f0';
			}
			state.variables.push(data);
		},

		addMacros: function(state, data){
			data.type = 'macro';
			data.flags = data.flags || 0;
			state.graph.push(data);
		},
		
		addTemplate: function(state, data){
			var no = Object.assign({}, data);
			state.templates[no.name] = no.data;
		},
		
		changeGraph: function(state, data){
			var n = state.graphs.find(gr => gr.name === data.name);
			console.assert(n);
			var nn = Object.assign({}, n);
			for(var index in data.props) { 
				if (data.props.hasOwnProperty(index)) {
					//n[index] = data.props[index];
					Vue.set(nn, index, data.props[index]);
				}
			}
			Vue.set(state.graphs, state.graphs.indexOf(n), nn);			
		}
		
	},
	
	getters: {
		getGraph: state => name => state.graphs.find(item => item.name == name),

		getVariable: state => name => state.variables.find(item => item.name == name),
		
		nameExists: (state) => (name) => {
			if(state.graphs.find(item => item.name == name))
				return true;
			if(state.variables.find(item => item.name == name))
				return true;
			return false;
		}		
	}
}
