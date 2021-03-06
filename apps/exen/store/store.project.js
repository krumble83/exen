
function oState(){
	return {
		name: 'default',
		components: [],
		library: false,
	}
}


export default {
	state: oState,
	
	actions: {
		create ({ state, commit }) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					commit('createComponent');
					resolve();
				}, 1000);
			});
		}
	},
	
	mutations: {
		
		createComponent: function(state, name){
			
		},
		
		addComponent: function(state, data){
			data.tabOrder = 1;
			data.flags = data.flags || 0;
			data.name = this.getters.getFreeName(data.name);
			state.components.push(data);
		},
		
		deleteComponent: function(state, name){
			const obj = this.getters.getComponent(name);
			console.assert(obj);
			
			const id = state.components.indexOf(obj);
			console.assert(id);
			state.components.splice(id, 1);
		},

		updateComponent: function(state, data){
			var n = this.getters.getComponent(data.name);
			console.assert(n);
			//var nn = Object.assign({}, n);
			//Vue.set(state.components, state.components.indexOf(n), nn);
			for(var index in data.props) { 
				if(!data.props.hasOwnProperty(index))
					continue;
				Vue.set(n, index, data.props[index]);
			}
		},
		
		setLibrary: function(state, data){
			state.library = data.Category({name: '[' + state.name + ']'});
		},
	},
	
	getters: {
		getComponent: state => name => state.components.find(item => item.name == name),

		getFreeName:  (state) => (name) => {
			if(!state.components.find(item => item.name == name))
				return name;
			
			var a = 1;
			while(state.components.find(item => item.name == name + a))
				a++;
			return name + a;
		},
		
		Library: (state) => state.library,
	}
}
