

import img from '../../ui-img/variable.png';

var module = {
	namespaced: true,
	mutations: {
		add: function(state, data){
			data = data || {};
			data.type = F_VARIABLE;
			data.datas = {
				dataType: 'core.bool',
			};
			data.flags = (data.flags || 0) | F_DRAGGABLE | F_CLOSABLE;
			data.name = this.getters.getFreeName(data.name || 'newVariable');
			data.icon = data.icon || img;
			this.commit('addVariable', data);
		},
		
		update: function(state, data){
			var n = this.getters.getVariable(data.name);
			console.assert(n);
			
			const undo = {
				olddata: {},
				
				do: function(){
					//backup old values;
					for(var index in data.props) { 
						if (!data.props.hasOwnProperty(index))
							continue;
						this.olddata[index] = n[index];
					}
					
					//set new values
					for(var index in data.props) { 
						if (!data.props.hasOwnProperty(index))
							continue;
						Vue.set(n, index, data.props[index]);
					}
					
				},
				
				undo: function(){
					for(var index in this.olddata) { 
						if (!this.olddata.hasOwnProperty(index))
							continue;
						Vue.set(state.variables.indexOf(n), index, this.olddata[index]);
					}					
				}
			}
			
			this.commit('addUndoRedo', undo);
			undo.do();
			
		},

		delete: function(state, data){
			this.commit('deleteFile', data);
		},
		
	
	},
	
	getters: {
		getVariable : (state, getters, rootState) => (name) => {
			if(name)
				return rootState.variables.find(it => it.name == name);
			else
				return rootState.variables;
		},
	},
}


export {module}