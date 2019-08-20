<template>
	<div>Project</div>
</template>

<script>
	import './blueprint.vue';
	
	import App from './app.vue';		
	App.mixins.push({
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
					bp.addFunction({name: 'setup', flags: F_LOCK_INPUTS}, false);
					bp.addFunction({name: 'loop', flags: F_READ_ONLY | F_LOCK_IO}, false);
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

	import {module} from '../store/modules/store.blueprint.js'
	App.store.registerModule('blueprint', module);

	var ex = {
		components: { },
		
		provide: {
			getProject: function(){
				return this;
			}
		},
		
		mounted: function(){
			this.$root.project = this;
			var me = this;
			this.$parent.$on('close', function(tab, evt){
					console.log('closed');
					me.$parent.store.test();
				}
			);
		},
	}

	import tab from './tabs.tab.vue';
	tab.components.project = ex;
	
	export default ex;
	
</script>