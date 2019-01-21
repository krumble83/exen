<script>

	import App from './app.vue';
	import functionImg from '../ui-img/function.png';
	
	App.mixins.push({
		computed: {	
			functions: function(){return this.$store.state.graphs.filter(g => g.type=='function')}
		},
		
		methods: {
			addFunction: function(data, doReaname){
				var a = 0
				, name = (data && data.name) ? data.name : 'NewFunction';
				if(this.functions.find(v => v.name == name)){
					while(this.functions.find(v => v.name == name + '_' + a))
						a++;
					name += '_' + a;
				}
				this.$store.commit('addFunction', {name: name, img:functionImg, tabOrder: 0});
				if(doReaname === false)
					return;
				this.$nextTick(function(){
					var n = this.$refs.functionsTree.findNode(name);
					this.rename(n.data, n.el);
				});
			},
			
			functionDblclick: function(data, evt){
				if(data.tabOrder == 0)
					data.tabOrder = this.tabsId++;
				this.$nextTick(function(){
					this.focusTab(data);
				});
			},
						
			zzzgetFunction: function(name){
				return this.functions.find(func => func.name == name && func.type == 'function');
			}					
		}
	});
	
</script>