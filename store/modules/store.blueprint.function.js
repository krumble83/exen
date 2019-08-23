

import img from '../../ui-img/function.png';
import {Observable} from '../../ui-js/utils.js';

var module = {
	namespaced: true,
	mutations: {
		add: function(state, data){ 											// function/add
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
			
			//this.commit('addOutput', {name: node.name});
			console.assert(node);
			Vue.set(data, 'datas', {});
			Vue.set(data.datas, 'inputs', node.inputs);
			Vue.set(data.datas, 'outputs', node.outputs);
			
			var pin = newPin();
			pin.name = '@exit';
			pin.pinCtor = 'PinExec';
			pin.datatype = 'core.exec';
			pin.type = F_OUTPUT;
			data.datas.outputs.push(pin);

			pin = newPin();
			pin.name = 'entry';
			//pin.pinCtor = 'core.type.bool';
			pin.datatype = 'core.type.bool';
			pin.type = F_INPUT;
			pin.optional = true;
			data.datas.inputs.push(pin);


		},
		
		delete: function(state, data){
			this.commit('deleteFile', data);
		},
		
		
		
		addInput: function(state, data){ 										//function/addInput
			var func = this.getters['function/getFunction'](data.name);
			console.assert(func, func.datas, func.datas.inputs);

			var n = 'newInput'
			, a = 1;
			
			if(func.datas.inputs.find(it => it.name == n)){
				while(func.datas.inputs.find( it => it.name == n + a))
					a++;
				n += a;
			}
			
			var undo = {
				do: function(){
					var pin = newPin();
					pin.name = n
					pin.type = F_INPUT;
					pin.datatype = data.datatype;
					if(data.editor)
						pin.editor = data.editor
					
					func.datas.inputs.push(pin);
					//item.datas.ios.push({name: n, type: F_INPUT});
				},
				
				undo: function(){
					func.datas.inputs.splice(func.datas.inputs.indexOf(func.datas.inputs.find(it => it.name == n)), 1);
				}
			}
			
			this.commit('addUndoRedo', undo);
			undo.do();			
			
		},
		
		addOutput: function(state, data){ 										//function/addOutput
			var func = this.getters['function/getFunction'](data.name);
			console.assert(func, func.datas, func.datas.outputs);

			var n = 'newOutput'
			, a = 1;
			
			if(func.datas.outputs.find(it => it.name == n)){
				while(func.datas.outputs.find( it => it.name == n + a))
					a++;
				n += a;
			}
			
			var undo = {
				do: function(){
					var pin = newPin();
					pin.name = n
					pin.type = F_OUTPUT;
					pin.datatype = data.datatype;
					
					func.datas.outputs.push(pin);
					//item.datas.ios.push({name: n, type: F_OUTPUT});
				},
				
				undo: function(){
					func.datas.outputs.splice(func.datas.outputs.indexOf(func.datas.outputs.find(it => it.name == n)), 1);
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


var newPin = function(){
	return {
		_linked: false,
		name: 'default',
		label: null,
		type: F_INPUT, 
		color: '#fff', 
		datatype: 'core.test', 
		optional: false,
		description: null,
		isarray: false,
	}
}

var newNode = function(){
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
			data.color = '#7f2197';
			data.flags = data.flags | 0;
			//data.subtitle = 'Target is me!';
			data.inputs = data.inputs || [];
			data.outputs = data.outputs || [];
			state.nodes.push(data);
		},
		
		addInput: function(state, data){
			
		},
		
		addOutput: function(state, data){
			
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