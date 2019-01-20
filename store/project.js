
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		device: {},
		components: [],
		graphs: [],
		variables: []
	},

	mutations: {
		emptyState() {
			this.replaceState({ nodes: [], links: [] });
		},
		
		addGraph: function(state, data){
			data.type = 'graph';
			state.graphs.push(data);
		},

		addFunction: function(state, data){
			data.type = 'function';
			data.inputs = {};
			data.outputs = {};
			state.graphs.push(data);
		},

		addVariable: function(state, data){
			state.variables.push(data);
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
		getGraph: (state) => (name) => {
			//console.log(state.graphs);
			//return {name: 'toto'};
			return state.graphs.find(gr => gr.name == name)
		},
		
		eeegetGraph: state => name => state.graphs.find(item => item.name == name),
		
		zzzgetGraph: function(state, name){
			return state.graphs.find(gr => gr.name == name)
		},

		nameExists: function(name){
			return this;
		}
	}
})
