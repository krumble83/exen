


import {Observable} from '../../ui-js/utils.js';
import stateMerge from '../../cmon-js/statemerge.js'

var BluePrintFunctionModule = {
	state: function(){
		return {
			library: false,
		}
	},
	namespaced: true,
	mutations: {
		add: function(state, data){ 											// function/add
			var node
				, store = new Vuex.Store(FunctionStore);
			
			data = data || {};
			data.name = this.getters.getFreeName(data.name || 'newFunction');
			
			store.commit('setLibrary', this.getters.Library);
			
			var nd = store.getters.Datas;
			console.log(nd);
			stateMerge(nd, data);
			console.log(nd);
			this.commit('addFile', nd);
			var file = this.getters['function/getFunction'](nd.name);
			console.assert(file);
			file.store = store;
			store.commit('setData', file);
			//store.commit('setData', data);
			//var d = store.getters.Datas;
			//d.name = 'zzzzz';
			//console.assert(d);
			//var d = this.getters['function/getFunction'](data.name);
			//d.store = store;

			//d.store = new Vuex.Store(FunctionStore);
			//var lib = this.getters.Library.Function(d.name);

			store.commit('addNode', {name: 'entryPoint2', title: 'zzz', flags: F_READ_ONLY, x:400, y:400, subtitle: 'Target is me!!'});


		},
		
		delete: function(state, data){
			this.commit('deleteFile', data);
		},
		
		setLibrary: function(state, data){										//function/setLibrary
			state.library = data;
		},
		
		addInput: function(state, data){ 										//function/addInput
			var func = this.getters['function/getFunction'](data.name);
			console.assert(func);			
			func.store.commit('addInput', data);
		},
		
		addOutput: function(state, data){ 										//function/addOutput
			var func = this.getters['function/getFunction'](data.name);
			console.assert(func);
			console.log(data);
			func.store.commit('addOutput', data);
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
		type: F_INPUT, 
		datatype: 'core.test', 
		optional: false,
	}
}



function uid(prefix){
	prefix = prefix || 'uid';
	return prefix + 'xxxxxxxxxxxxxxxx'.replace(/./g, function(c) {
		var r = Math.random() * 16 | 0;
		return r.toString(16);
	});
}
		
function newNode(){
	return {
		uid: uid(),
		name: '',
		flags: 0,
		x: 200,
		y: 200,
		inputs: [],
		outputs: [],
	}
};

import img from '../../ui-img/function.png';
import {Category, Function, In, Out} from '../../exlibs/default.export.js';
var FunctionStore = {
	state: function(){
		return {
			uid: uid(),
			datas: {
				type: F_FUNCTION,
				flags: F_DRAGGABLE | F_CLOSABLE,
				panelCtor: 'functionfile',
				icon: img,
				inputs: [],
				outputs: [],
			},
			watchers: [],
			library: false,
			nodes: [],
			links: [],
		};
	},
	
	mutations: {
		
		setData: function(state, data){
			//stateMerge(state.datas, data);
			state.datas = data;
			
			var n = {
				uid: state.uid + '_entryPoint',
				name: 'entryPoint', 
				title: state.datas.name, 
				flags: F_READ_ONLY, 
				img: 'graph-img/function.png', 
				color: '#7f2197',
			};
			this.commit('addNode', n);
			n = this.getters.EntryPointNode;
			Vue.set(n, 'outputs', state.datas.outputs);
			Vue.set(n, 'inputs', state.datas.inputs);

			var i = {
				name: '@exit',
				type: F_OUTPUT,
				datatype: 'core.exec',
			};
			this.commit('addOutput', i);
			/*			
			if(state.library)
				state.library.Function(state.datas.name);
			*/
			var w = this.watch(
				state => state.datas.name,
				() => {
					//console.log('Watcher works', arguments[1].name);
					Vue.set(n, 'title', arguments[1].name);
					//n.label = arguments[1].name;
				}
			);
			state.watchers.push(w);	
		},
		
		addNode: function(state, data){
			var d = newNode();
			stateMerge(d, data);
			data.uid = d.uid;
			state.nodes.push(d);
		},
		
		addInput: function(state, data){
			var i = newPin();
			stateMerge(i, data);
			state.datas.inputs.push(i);
		},
		
		addOutput: function(state, data){
			var i = newPin();
			stateMerge(i, data);
			state.datas.outputs.push(i);
		},

		changeNodeProperty: function(state, data){
			
		},
		
		setLibrary: function(state, data){
			state.library = data;
		}
	},
	
	getters: {
		getNode: (state, getters, rootState) => (uid) => {
			if(uid)
				return state.nodes.find(it => it.uid == uid);
			else
				return state.nodes;
		},
		
		Datas: (state, getters) => {
			//console.log(state);
			return state.datas;
		},
		
		getOutput: (state, getters) => (name) => {
			if(name)
				return state.inputs.find(it => it.name == name);
			return state.inputs;
		},
		
		getOutput: (state, getters) => (name) => {
			if(name)
				return state.outputs.find(it => it.name == name);
			return state.outputs;
		},

		EntryPointNode: (state, getters) => getters.getNode(state.uid + '_entryPoint'),
		
		getLink: (state, getters, rootState) => (pinIn, pinOut) => {
			if(pinIn)
				return state.nodes.find(it => it.name == name);
			else
				return state.links;
		},

		getLibraryMenu: (state, getters) => {
			var el = document.createElement('div')
				, ComponentClass = Vue.extend(Category);
			var instance = new ComponentClass({propsData: {id: state.library.fullPath}});
			var ret = instance.Function(state.datas.name);
			return [ret];
		},
		
	}
}

export {FunctionStore as default}
export {BluePrintFunctionModule}