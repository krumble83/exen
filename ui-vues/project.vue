<template>
	<div>Project</div>
</template>

<script>
	import './blueprint.vue';

	//import * as name from '../testlib.js';
	//import {Package} from '../testlib.js';

	import App from './app.vue';
		
	App.mixins.push({
		provide: function(){
			const me = this;
			return {
				$project: function(){return me},
			}
		},
		
		methods: {
			getProject: function(){
				return;
			},
			
			createProject: function(){
				//this.addComponent({name: 'Project', type:'project'});
				var bb;
				this.addBlueprint(null, function(bp){
					//console.log(bp);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addGraph({}, false);
					bp.addFunction({name: 'setup', flags: 0}, false);
					bp.addFunction({name: 'loop', flags: F_LOCK_INPUTS}, false);
					bb = bp
					//console.log(ok);
				});
				this.addBlueprint(null, function(){
					setTimeout(function(){
						bb.$parent.select();
					}, 100);
				});
				
			},
			
			addComponent: function(data, callback){
				console.assert(data.type);
				this.$store.commit('addComponent', data);
				//this.$store.state.tabs.push(data)
			},

			getComponent: function(name){
				//console.log('=>', this.$store.getters);
				return this.$store.getters.getComponent(name);
			}
		}
	});


	const Project = {
		//components: {Package},
		
		data: function(){
			return {
			}
		},
		
		provide: {
			getProject: function(){
				return this;
			}
		},
		
		mounted: function(){

		},
	}


	import {module} from '../store/modules/store.blueprint.js'
	App.store.registerModule('blueprint', module);

	import tab from './tabs.tab.vue';
	tab.components.Project = Project;
	
	export default Project;
	
</script>