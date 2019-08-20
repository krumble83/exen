

import img from '../../ui-img/function.png';
import {Observable} from '../../ui-js/utils.js';

var module = {
	namespaced: true,
	mutations: {
		add: function(state, data){
			var node;
			data = data || {};
			
			data.name = this.getters.getFreeName(data.name || 'newFunction');
			
			Observable(data, 'name', function(val){
				if(node) node.title = val;
			});
			
			
			data.description = data.description || 'description';
			data.flags = (data.flags || 0) | F_DRAGGABLE | F_CLOSABLE;
			data.type = F_FUNCTION;
			data.panelCtor = data.panelCtor || 'functionfile'
			data.icon = data.icon || img;

			this.commit('addFile', data);
			data.store = new Vuex.Store(FunctionStore);
						
			data.store.commit('addNode', {name: 'entryPoint2', title: 'zzz', flags: F_READ_ONLY, x:400, y:400});

			data.store.commit('addNode', {name: 'entryPoint', title: data.name, flags: F_READ_ONLY});
			node = data.store.getters.getNode('entryPoint');
			console.assert(node);
			Vue.set(data, 'datas', {});
			Vue.set(data.datas, 'inputs', node.inputs);
			Vue.set(data.datas, 'outputs', node.outputs);
		},
		
		delete: function(state, data){
			this.commit('deleteFile', data);
		},
		
		
		
		addInput: function(state, data){
			var item = this.getters['function/getFunction'](data.name);
			console.assert(item, item.datas, item.datas.inputs);

			var n = 'newInput'
			, a = 1;
			
			if(item.datas.inputs.find(it => it.name == n)){
				while(item.datas.inputs.find( it => it.name == n + a))
					a++;
				n += a;
			}
			
			var undo = {
				do: function(){
					item.datas.inputs.push({name: n, type: F_INPUT, color: '#fff', datatype:''});
					//item.datas.ios.push({name: n, type: F_INPUT});
				},
				
				undo: function(){
					item.datas.inputs.splice(item.datas.inputs.indexOf(item.datas.inputs.find(it => it.name == n)), 1);
				}
			}
			
			this.commit('addUndoRedo', undo);
			undo.do();			
			
		},
		
		addOutput: function(state, data){
			var item = this.getters['function/getFunction'](data.name);
			console.assert(item, item.datas, item.datas.outputs);

			var n = 'newOutput'
			, a = 1;
			
			if(item.datas.outputs.find(it => it.name == n)){
				while(item.datas.outputs.find( it => it.name == n + a))
					a++;
				n += a;
			}
			
			var undo = {
				do: function(){
					item.datas.outputs.push({name: n, type: F_OUTPUT, color: '#fff', datatype:''});
					//item.datas.ios.push({name: n, type: F_OUTPUT});
				},
				
				undo: function(){
					item.datas.outputs.splice(item.datas.outputs.indexOf(item.datas.outputs.find(it => it.name == n)), 1);
				}
			}
			
			this.commit('addUndoRedo', undo);
			undo.do();			
		},		
	},
	
	getters: {
		getFunction: (state, getters, rootState) => (name) => {
			if(name)
				return rootState.files.find(item => (name && item.name == name) && item.type == F_FUNCTION);
			else
				return rootState.files.filter(it => it.type == F_FUNCTION);
		},
		
		getIo: (state, getters, rootState) => (item, name) => {
			return getters.getFunction(item).datas.inputs.find(it => it.name == name);
		},
		
		getInput: (state, getters, rootState) => (item, name) => {
			return getters.getFunction(item).datas.inputs.find(it => it.name == name);
		},

		getOutput: (state, getters, rootState) => (item, name) => {
			return getters.getFunction(item).datas.outputs.find(it => it.name == name);
		},


	},
}

var node = function(){
	return {
		name: '',
		label: '',
		pos: {x: 0, y: 0},
		inputs: [],
		outputs: [],
	}
};

var FunctionStore = {
	state: function(){
		return {
			nodes: [],
			links: [],
		};
	},
	
	mutations: {
		addNode: function(state, data){
			data = data || {};
			data.x = data.x || 200;
			data.y = data.y || 200;
			color: '#7f2197';
			data.flags = data.flags | 0;
			data.subtitle = 'Target is me!';
			data.inputs = [];
			data.outputs = [];
			state.nodes.push(data);
		},
		
		changeNodeProperty: function(state, data){
			
		},
	},
	
	getters: {
		getNode: (state, getters, rootState) => (name) => {
			if(name)
				return rootState.nodes.find(it => it.name == name);
			else
				return rootState.nodes;
		},
		
		getLink: (state, getters, rootState) => (pinIn, pinOut) => {
			if(pinIn)
				return rootState.nodes.find(it => it.name == name);
			else
				return rootState.links;
		},
		
	}
}

export {FunctionStore as default}
export {module}