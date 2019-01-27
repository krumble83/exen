
Exen.Template.define('node', {
	id: false,
	name: 'undefined',
	flags: F_IS_NODE,
	description: '',
	inputs: [],
	outputs: []
});

Exen.Template.define('pin', {
	name: 'undefined',
	label: false,
	datatype: 'undefined',
	color: '#f00',
});

export default {
	state: function(){
		return {
			nodes: [],
			links: []
		}
	},

	mutations: {
		emptyState() {
			this.replaceState({ nodes: [], links: [] });
		},
		
		addNode: function(state, data){
			data.inputs = data.inputs || [];
			data.outputs = data.outputs || [];
			state.nodes.push(data);
		}
	},
	
	getters: {
		getNode: function(state, name){
			return state.nodes.find(n => n.name == name);
		}
	}
}
