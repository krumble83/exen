
<script>

	function createState(){
		return {
			nodes: [],
			links: []
		}		
	}


	export default {
		namespaced: true,
		
		state: createState,
		
		actions: {
			init: function(){
				this.undoRedo = {
					done: [],
					undone: [],
					newMutation: true,
					sequence: 0
				}
			},
			
			addNode: function({commit, state}, data){
				commit('addNode', data);
			},
			
			undo: function({commit, state}){
				
			},
			
			redo: function({commit, state}){
				
			},
			
			clearState: function({commit, state}){
				this.replaceState(createState());
			},
		},
		
		mutations: {
			addNode: function(state, data){
				state.nodes.push(data);
			},
		},
		
		getters: {
			canUndo: function(state){
				
			},
			
			canRedo: function(state){
				
			}
			
		},
		
		registered(store) {
			console.log(store);
		}
	}
</script>