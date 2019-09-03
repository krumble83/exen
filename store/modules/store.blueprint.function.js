


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
			//console.log(nd);
			stateMerge(nd, data);
			//console.log(nd);
			this.commit('addFile', nd);
			
			var file = this.getters['function/getFunction'](nd.name);
			console.assert(file);
			file.store = store;
			store.commit('setData', file);
			store.commit('addNode', {name: 'entryPoint2', flags: F_READ_ONLY, x:400, y: 400});
		},
		
		delete: function(state, data){
			this.commit('deleteFile', data);
		},
		
		setLibrary: function(state, data){										//function/setLibrary
			state.library = data;
		},
		
		addInput: function(state, data){ 										//function/addInput
			var func = this.getters['function/getFunction'](data.func);
			console.assert(func);			
			func.store.commit('addInput', data.props);
		},
		
		addOutput: function(state, data){ 										//function/addOutput
			var func = this.getters['function/getFunction'](data.func);
			console.assert(func);
			func.store.commit('addOutput', data.props);
		},
		
		update: function(state, data){ 											//function/update
			console.log('store:function/update', data);
			var func = this.getters['function/getFunction'](data.func);
			console.assert(func);
			this.commit('updateFile', {name: data.func, props: data.props});
		}
		
	},
	
	getters: {
		getFunction: (state, getters, rootState) => (name) => {
			if(name)
				return rootState.files.find(item => (name && item.name == name) && item.type == F_FUNCTION);
			else
				return rootState.files.filter(it => it.type == F_FUNCTION);
		},
		
		getIo: (state, getters, rootState) => (func, name) => {
			return getters.getFunction(func).datas.inputs.find(it => it.name == name);
		},
		
		getInput: (state, getters, rootState) => (func, name) => {
			return getters.getFunction(func).store.getters.getInput(name);
		},

		getOutput: (state, getters, rootState) => (func, name) => {
			return getters.getFunction(func).store.getters.getOutput(name);
		},

	},
}


var newPin = function(){
	return {
		_linked: false,
		name: 'default',
		//type: F_INPUT, 
		flags: 0,
		datatype: 'core.type.bool', 
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
//import EventBus from '../../cmon-js/event-bus.js'

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
				img: 'exlibs/img/start.png', 
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
			EventBus.$on('librarymenu:get', function(data, query, context){
				console.log('ok');
			});
			*/

			var w = this.watch(
				state => state.datas.name,
				() => {
					//console.log('Watcher works', arguments[1].name);
					Vue.set(n, 'title', arguments[1].name);
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
			data = data || {};
			data.name = this.getters.getIoFreeName(data.name || 'newInput');
			data.flags = (data.flags || 0) | F_INPUT;
			data.type = F_INPUT;
			stateMerge(i, data);
			state.datas.inputs.push(i);
		},
		
		addOutput: function(state, data){
			var i = newPin();
			data = data || {};
			data.name = this.getters.getIoFreeName(data.name || 'newOutput');
			data.flags = (data.flags || 0) | F_OUTPUT;
			data.type = F_OUTPUT;
			stateMerge(i, data);
			state.datas.outputs.push(i);
		},
		
		changeInputProperty: function(state, data){
			stateMerge(state.datas.inputs.find(it => it.name == data.name), data.props);
		},

		changeOutputProperty: function(state, data){
			stateMerge(state.datas.outputs.find(it => it.name == data.name), data.props);
		},

		changeNodeProperty: function(state, data){
			
		},
		
		setLibrary: function(state, lib){
			const me = this;
			state.library = lib;
			state.library.Library.$on('getNodes', function(data, query){
				//console.log(data);
				var el = document.createElement('div')
					, ComponentClass = Vue.extend(Category)
					, instance = new ComponentClass({propsData: {id: state.library.fullPath}})
					, ret = instance.Function(state.datas.name);
					
				ret.Symbol('exlibs/img/function.png');
				data.push(ret.$el);
				
				return;
				
				if(query.context == me){
					ComponentClass = Vue.extend(Function);
					instance = new ComponentClass({propsData: {id: 'exitPoint', title: 'Add Return Node...'}});
					data.push(instance.$el);
				}
				//console.log(data);
			});
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
		
		getInput: (state, getters) => (name) => {
			if(name)
				return state.datas.inputs.find(it => it.name == name);
			return state.datas.inputs;
		},
		
		getOutput: (state, getters) => (name) => {
			if(name)
				return state.datas.outputs.find(it => it.name == name);
			return state.datas.outputs;
		},

		EntryPointNode: (state, getters) => getters.getNode(state.uid + '_entryPoint'),
		
		getLink: (state, getters, rootState) => (pinIn, pinOut) => {
			if(pinIn)
				return state.nodes.find(it => it.name == name);
			else
				return state.links;
		},
		/*
		getLibraryMenu: (state, getters) => {
			var el = document.createElement('div')
				, ComponentClass = Vue.extend(Category);
			var instance = new ComponentClass({propsData: {id: state.library.fullPath}});
			var ret = instance.Function(state.datas.name);
			return [ret];
		},
		*/
		getIoFreeName:  (state, getters) => (name) => {
			if(!getters.IoNameExist(name))
				return name;
			
			var a = 1;
			while(getters.IoNameExist(name + a))
				a++;
			return name + a;
		},		

		IoNameExist:  (state, getters) => (name) => {
			return getters.getInput(name) || getters.getOutput(name);
		},
	}
}

export {FunctionStore as default}
export {BluePrintFunctionModule}