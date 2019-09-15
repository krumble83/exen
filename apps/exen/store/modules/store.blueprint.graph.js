

import img from '../../ui-img/graph.png';

var module = {
	namespaced: true,
	mutations: {
		add: function(state, data){
			data = data || {};
			data.flags = (data.flags || 0) | F_CLOSABLE;
			data.type = F_GRAPH;
			data.name = this.getters.getFreeName(data.name || 'newGraph');
			data.panelCtor = data.panelCtor || 'graphfile'
			data.icon = data.icon || img;
			this.commit('addFile', data);
		},
		
		delete: function(state, data){
			this.commit('deleteFile', data);
		},
		
	
	},
	
	getters: {
		getGraph : (state, getters, rootState) => (name) => {
			if(name)
				return rootState.files.find(item => item.name == name && item.type == F_GRAPH);
			else
				return rootState.files.filter(g => g.type == F_GRAPH);
		},
	},
}

var GraphStore = {
	state: function(){
		return {
		};
	},
	
	mutations: {
		
	},
	
	getters: {
		
	}
}

export {GraphStore as default}
export {module}