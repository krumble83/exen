

export default {
	state: {
		nodes: [],
		datatypes: []
	}
	
	
	mutations: {
		defineNode: function(state, data){
		
		},
		
		defineDataType: function(state, data){
		
		}
	},
	
	
	getters: {
		getNode(state, name){
			if(typeof name === 'function')
				return state.nodes.filter(name);
			return state.nodes.find(n => n.name == name);
		},
		
		getDataType(state, name){
			if(typeof name === 'function')
				return state.datatypes.filter(name);
			return state.datatypes.find(n => n.name == name);			
		}
		
	}

}

