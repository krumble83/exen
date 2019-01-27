
import BluePrintStore from './blueprint.js'
import FunctionStore from './function.js'

Exen.Template.define('function', {
	id: 'undefined',
	name: 'undefined',
	flags: F_IS_FUNCTION | F_IS_GRAPH,
	props: {description: ''},
})


Exen.Template.define('project', {
	device: {},
	components: [],
	graphs: [],
	variables: [],	
});

Exen.Template.define('graph', {
	nodes: [], 
	links: [], 
})

export default {
	state: Exen.Template.merge('project', {}),
	
	modules: {
		'function': {
			actions: {
				addFunc({commit, state}, data){
					var f = Exen.Template.merge('function', data);
					f.flags = f.flags | F_IS_FUNCTION | F_IS_GRAPH;
					f.$data = new Vuex.Store(FunctionStore);
					f.$data.replaceState({ nodes: [], links: [], inputs:[], outputs:[] });
					var n = Exen.Template.merge('node', {name: 'entry'});
					f.$data.state.nodes.push(n);
					commit('addGraph', f);
					//console.log('rrr', this);
				}				
			},
			registered: function(){
				console.log('coucou :)');
			}
		},
		
		undoRedo: {
			namespaced: true,
			
			state: function(){
				return {
					done: [],
					undone: [],
					newMutation: true,
					ignoreMutations: ['changeNodePropertyShadow'],
					sequence: 0,
				}
			},
			
			actions: {			
				initUndo: {
					root: true,
					handler: function(context){
						this.subscribe(mutation => {
							//console.log('mutationnnn', context);
							if (context.state.ignoreMutations.indexOf(mutation.type) === -1) {
								context.state.done.push(mutation);
							}
							if (context.state.newMutation) {
								context.state.undone = [];
							}
						});
						
					}
					
				},
				
				undo: {
					root: true,
					handler: function(context){
						context.state.undone.push(context.state.done.pop());
						context.state.newMutation = false;
						context.dispatch('emptyState', undefined, {root: true});
						context.state.done.forEach(mutation => {
							//console.log(mutation.sequence);
							switch (typeof mutation.payload) {
								case 'object':
									context.commit(`${mutation.type}`, Object.assign({}, mutation.payload), {root: true});
									break;
								default:
									context.commit(`${mutation.type}`, mutation.payload, {root: true});
							}
							context.state.done.pop();
						});
						context.state.newMutation = true;
					}
				},
				
				redos: {
					root: true,
					handler: function(context){
						//console.log(context);
						let commit = context.state.undone.pop();
						context.state.newMutation = false;
						switch (typeof commit.payload) {
							case 'object':
								context.commit(`${commit.type}`, Object.assign({}, commit.payload), {root: true});
								break;
							default:
								context.commit(`${commit.type}`, commit.payload, {root: true});
						}
						context.state.newMutation = true;						
					}
				},
			},
			
			getters: {
				canUndo: function(state){
					return state.done.length == 0;
				},
				
				canRedo: function(state){
					return state.undone.length == 0;
				}
			}
		}
	},
	
	actions: {
		emptyState: function(context){
			console.log('---', context);
			this.replaceState({ devices: {}, graphs: [], components: [], variables: [], undoRedo: context.rootState.undoRedo });
		}
	},

	mutations: {

		addGraph: function(state, data){
			state.graphs.push(data);
		},
		
		changeGraph: function(state, data){
			var n = state.graphs.find(gr => gr.name === data.name);
			console.assert(n);
			var nn = Object.assign({}, n);
			for(var index in data.props) { 
				if (data.props.hasOwnProperty(index)) {
					//n[index] = data.props[index];
					Vue.set(nn, index, data.props[index]);
				}
			}
			Vue.set(state.graphs, state.graphs.indexOf(n), nn);			
		},
		
		changeGraphProp: function(state, data){
			var n = state.graphs.find(gr => gr.name === data.name);
			console.assert(n);
			var nn = Object.assign({}, n);
			Vue.set(state.graphs, state.graphs.indexOf(n), nn);			
			for(var index in data.props) { 
				if (data.props.hasOwnProperty(index)) {
					//n[index] = data.props[index];
					Vue.set(nn.props, index, data.props[index]);
				}
			}
		},

		deleteGraph: function(state, name){
			const graph = state.graphs.find(item => item.name == name);
			console.assert(graph);
			const id = state.graphs.indexOf(graph);
			console.assert(id);
			state.graphs.splice(id, 1);
		},

		addVariable: function(state, data){
			data.props = data.props || {};
			data.props.description = data.props.description || '';
			data.flags = (data.flags || 0) | F_IS_VARIABLE;

			if(!data.data.datatype){
				data.data.datatype = 'core.int';
				data.data.color = '#0f0';
			}
			state.variables.push(data);
		},

		addMacros: function(state, data){
			data.type = 'macro';
			data.flags = data.flags || 0;
			state.graph.push(data);
		},
		
		addTemplate: function(state, data){
			var no = Object.assign({}, data);
			state.templates[no.name] = no.data;
		},
		
	},
	
	getters: {
		getGraph: state => name => state.graphs.find(item => item.name == name),

		getVariable: state => name => state.variables.find(item => item.name == name),
				
		getOption: state => name => state.device[name],
		
		nameExists: (state) => (name) => {
			if(state.graphs.find(item => item.name == name))
				return true;
			if(state.variables.find(item => item.name == name))
				return true;
			return false;
		}		
	}
}
