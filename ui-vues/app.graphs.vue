<script>

	import App from './app.vue';
	import graphImg from '../ui-img/graph.png';
	
	App.mixins.push({
		computed: {	
			graphs: function(){return this.$store.state.graphs.filter(g => (g.flags & F_IS_BLUEPRINT) == F_IS_BLUEPRINT)}
		},
		
		methods: {
			addGraph: function(data, doReaname){
				var a = 0
				, name = (data && data.name) ? data.name : 'NewGraph';
				if(this.graphs.find(v => v.name == name)){
					while(this.graphs.find(v => v.name == name + '_' + a))
						a++;
					name += '_' + a;
				}
				this.$store.commit('addGraph', {name: name, img:graphImg, tabOrder: 0});
				if(doReaname === false)
					return;
				this.$nextTick(function(){
					var n = this.$refs.graphsTree.findNode(name);
					this.rename(n.data, n.el);
				});
			},
			
			graphDblclick: function(data, evt){
				if(data.tabOrder == 0)
					data.tabOrder = this.tabsId++;
				this.$nextTick(function(){
					this.focusTab(data);
				});
			},
						
			zzzgetGraph: function(name){
				return this.graphs.find(graph => graph.name == name && graph.type == 'graph');
			}		
		}
	});
	
</script>