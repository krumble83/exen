<template>
	<div>graph</div>
</template>

<script>

	import Blueprint from './blueprint.vue';
	import {module} from '../store/modules/store.blueprint.graph.js'
	
	Blueprint.mixins.push({
		computed: {	
			//graphs: function(){return _.orderBy(this.store.state.files, 'tabOrder');
			graphs: function(){return this.store.getters['graph/getGraph']()},
		},
		
		created: function(){
			this.store.registerModule('graph', module);
		},
		
		mounted: function(){
			var me = this;
			this.$refs.graphsTree.$on('button:addGraph', this.addGraph);

			this.addGraph({
				name: 'Default', 
				flags: F_READ_ONLY | F_NO_CLIPBOARD
			}, false);
		},
		
		beforeDestroy: function(){
			this.$refs.graphsTree.$off('button:addGraph', this.addGraph);
		},
		
		methods: {
			addGraph: function(data, callback){
				data = data || {};
				this.store.commit('graph/add', data);
				
				if(typeof callback == 'function'){
					this.$nextTick(function(){
						var n = this.$refs.graphsTree.getItem(data.name);
						console.assert(n);
						callback(n);
					}, this);
				}
				else if(callback != false){
					this.$nextTick(function(){
						var n = this.$refs.graphsTree.getItem(data.name);
						console.assert(n);
						n.rename();
					}, this);
				}
			},
			
			deleteGraph: function(item, evt){
				this.deleteFile(item, evt);				
			},
			
			graphsTreeSelect: function(item, evt){
				//console.log('--', item);
				this.fileSelect(item);
			},
			
			graphsTreeContextMenu: function(item, menu, evt){
				var me = this;
				
				menu.addTitle('Graph');
				
				menu.addItem({
					title: 'Open',
					callback: function(){
						me.$nextTick(function(){
							item.open(evt);
						});
					},
				});
				menu.addItem({
					title: 'Rename',
					shortcut: 'F2',
					disabled: (item.$hasFlag(F_NO_RENAME)) ? true: false,
					callback: function(){
						me.$nextTick(function(){
							item.rename();
						});
					},
				});
				menu.addItem({
					title: 'Delete',
					shortcut: 'Del',
					disabled: (item.$hasFlag(F_NO_DELETE)) ? true: false,
					callback: function(){
						item.delete();
					},
				});
				menu.addItem({
					title: 'Find references',
					callback: function(){
						item.findReferences();
					},
				});
			}
		}
	});



	var ex = {
		components: {},
		mixins: [],
		
		props: {
		},
		
		data: function(){
			return {
				store: Object,
			}
		},
		mounted: function(){
		},
		
		computed: {		
		},

		methods: {

		}
	}

	import tab from './tabs.tab.vue';
	tab.components.graphfile = ex;
	
	export default ex;
</script>