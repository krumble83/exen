
import stateMerge from '../../cmon-js/statemerge.js'

var module = {
	mutations: {
		addBlueprint: function(state, data){
			
			//data.panelCtor = 'blueprint';
			data.flags = (data.flags || 0) | F_CLOSABLE;
			
			var store = new Vuex.Store(BlueprintStore);
			store.commit('setData', data);
			var d = store.getters.Data;

			var cat = this.getters.Library.Category({name: d.name});
			store.commit('setLibrary', cat);

			d.store = store;			
			data.store = store;
			this.commit('addComponent', d);
		}
	},
	
	getters: {
		getBlueprint : (state, getters, rootState) => (name) => {
			if(name)
				return rootState.components.find(item => item.name == name);
			else
				return rootState.components;
		},
	},
}

var BlueprintStore = {
	state: function(){
		return {
			data: {panelCtor: 'blueprint', flags: F_CLOSABLE},
			library: false,
			files: [],
			variables: [],
			devices: [],
			undoredo: [],
		};
	},
	
	mutations: {
		
		setLibrary: function(state, data){
			state.library = data;
		},
		
		setData: function(state, data){
			stateMerge(state.data, data);		
		},
		
		addUndoRedo: function(state, data){
			state.undoredo.push(data);
		},
		
		addFile: function(state, data){

			var d = {
				tabOrder: 0, 
			};
			stateMerge(d, data);
			//d.name = this.getters.getFreeName(data.name);
			//data.name = d.name;
			state.files.push(d);
		},
		
		updateFile: function(state, data){
			var n = this.getters.getFile(data.name);
			console.assert(n);
			stateMerge(n, data.props);
		},
		
		deleteFile: function(state, data){
			var n = this.getters.getFile(data.name);
			console.assert(n);
			state.files.splice(state.files.indexOf(n), 1);
		},
		
		duplicateFile: function(state, data){
			var n = this.getters.getFile(data.name);
			console.assert(n);
		},
		
		/*
		addVariable: function(state, data){
			var me = this;
			const undo = {
				oldname: data.name,
				do: function(){
					data.name = me.getters.getFreeName(data.name);
					state.variables.push(data);
				},
				undo: function(){
					data.name = this.oldname;
					state.variables.splice(state.variables.indexOf(data), 1);
				}
			}
			this.commit('addUndoRedo', undo);
			undo.do();
		},

		updateVariable: function(state, data){
			var n = this.getters.getVariable(data.name);
			console.assert(n);
			console.log(data);
			
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
						Vue.set(state.files.indexOf(n), index, this.olddata[index]);
					}					
				}
			}
			
			this.commit('addUndoRedo', undo);
			undo.do();
			
		},
		*/
	},
	
	getters: {
		getFreeName:  (state, getters) => (name) => {
			if(!getters.nameExist(name))
				return name;
			
			var a = 1;
			while(getters.nameExist(name + a))
				a++;
			return name + a;
		},
		
		nameExist:  (state, getters) => (name) => {
			return getters.getFile(name) || getters.getVariable(name);
		},
		
		getFile: state => name => state.files.find(item => item.name == name),
		getVariable: state => name => state.variables.find(item => item.name == name),
		Library: state => state.library,
		Data: state => state.data,
	}
}

export {module}

export {BlueprintStore as default}

