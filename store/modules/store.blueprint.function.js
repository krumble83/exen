


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
			
			var n = this.getters.Library.Library.getNodeById('core.flow.sequence').toObject();
			n. x = 500;
			n.y = 300;
			store.commit('addNode', n);
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


const newNode = function (){
	return {
		uid: uid('node'),
		name: '',
		flags: 0,
		x: 200,
		y: 200,
		inputs: [],
		outputs: [],
	}
};


const newPin = function(){
	return {
		name: 'default',
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
		


const NodeModuleStore = function(state){
	return {
		state: state,
		namespaced: true,
		mutations: {

			remove: function(state, data){
				
			},
			
			update: function(state, data){
				
			},
			
			addPin: function(state, data){						
				if((data.props.flags & F_INPUT) == F_INPUT)
					state.inputs.splice(data.pos ? data.pos : state.inputs.length, 0, data.props);
				else
					state.outputs.splice(data.pos ? data.pos : state.outputs.length, 0, data.props);
			},
			
			removePin: function(state, pinName){
				var p = state.inputs.find(pin => pin.name == pinName);
				if(p){
					state.inputs.splice(state.inputs.indexOf(p), 1);
					return;
				}
				p = state.outputs.find(pin => pin.name == pinName);
				if(p)
					state.outputs.splice(state.outputs.indexOf(p), 1);
			}
		},
		
		getters: {
			getNode: (state) => {
				return state;
			},
			
			getInput: (state) => (name) => {
				if(name)
					return state.inputs.find(pin => pin.name == name);
				return state.inputs;
			},

			getOutput: (state) => (name) => {
				if(name)
					return state.outputs.find(pin => pin.name == name);
				return state.outputs;
			},

			getPin: (state, getters) => (name) => {
				if(name)
					return getters.getInput(name) || getters.getOutput(name);
				return state.inputs.concat(state.outputs);
			}
		}
	}
}

const PinModule = {
	
}

const LinkModule = {
	namespaced: true,
	mutations: {
		add: function(state, data){
			data.uid = data.uid || uid();
			this.commit('addLink', data);
		},
		
		remove: function(state, uid){
			this.commit('removeLink', uid);
		},
		
		update: function(state, uid, data){
			
		}
	},
	
	getters: {
		
		getPin: (state, getters) => (name) => {
			return getters.getInput(name) || getters.getOutput(name);
		},
		
		getInput: (state) => (name) => {
			if(name)
				return state.inputs.find(it => it.name == name);
			return state.inputs;
		},
		
		getOutput: (state) => (name) => {
			if(name)
				return state.outputs.find(it => it.name == name);
			return state.outputs;
		},		
	}
}

import img from '../../ui-img/function.png';
import {Category, Function, In, Out} from '../../exlibs/default.export.js';
//import EventBus from '../../cmon-js/event-bus.js'

const FunctionStore = {
	state: function(){
		return {
			uid: uid(),
			datas: {
				type: F_FUNCTION,
				flags: F_DRAGGABLE | F_CLOSABLE,
				panelCtor: 'functionfile',
				symbol: img,
				inputs: [],
				outputs: [],
			},
			watchers: [],
			library: false,
			nodes: [],
			links: [],
		};
	},
	
	modules: {
		link: LinkModule,
		//node: NodeModule,
		pin: PinModule
	},
		
	mutations: {
		
		setData: function(state, data){
			//stateMerge(state.datas, data);
			const me = this;
			state.datas = data;
			
			var n = state.library.Library.getNodeById('core.entryPoint').toObject();
			n.uid = state.uid + '_entryPoint'
			n.title = state.datas.name;
			n.flags = F_READ_ONLY;
			n.outputs.forEach(function(i){
				me.commit('addOutput', i);
			});			
			delete n.outputs;
			this.commit('addNode', n);

			n = this.getters.EntryPointNode;
			Vue.set(n, 'outputs', state.datas.outputs);
			Vue.set(n, 'inputs', state.datas.inputs);

			//TODO: remove this watcher
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
			this.registerModule(data.uid, NodeModuleStore(state.nodes[state.nodes.length-1]));
		},
		/*
		addNodeIo: function(state, data){
			var node = this.getters.getNode(data.node);
			console.assert(node && data.props.flags);
						
			if((data.props.flags & F_INPUT) == F_INPUT)
				node.inputs.splice(data.pos ? data.pos : node.inputs.length, 0, data.props);
				//node.inputs.push(data.props); //months.splice(1, 0, 'Feb');
			else
				node.outputs.splice(data.pos ? data.pos : node.outputs.length, 0, data.props);
				//node.outputs.push(data.props);
		},
		*/
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
		
		
		
		addLink: function(state, data){
			console.log('store:link/add', data);
			state.links.push(data);
		},
		
		removeLink: function(state, uid){
			var link = this.getters.getLink(uid);
			if(link)
				state.links.splice(state.links.indexOf(link), 1);
		},
		
		updateLink: function(state, data){
			
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
			state.library = lib;
			lib.$on('getNodesByQuery', this.getters.getLibraryNodes);
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
		
		getLink: (state, getters, rootState) => (uid) => {
			if(uid)
				return state.links.find(it => it.uid == uid);
			else
				return state.links;
		},

		getLibraryNodes: (state, getters) => (data, query) => {
			//TODO : remove event listener on Library
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
		},
		
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