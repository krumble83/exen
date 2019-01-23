<script>

	import App from './app.vue';
	import functionImg from '../ui-img/function.png';
	
	App.mixins.push({
		computed: {	
			functions: function(){return this.$store.state.graphs.filter(g => (g.flags & F_IS_FUNCTION) == F_IS_FUNCTION)}
		},
		
		mounted: function(){
			this.$refs.functionsTree.$on('contextmenu', this.functionContextMenu);
			this.$refs.functionsTree.$on('rename', this.functionRename);
			this.$refs.functionsTree.$on('dblclick', this.functionDblclick);
		},
		
		beforeDestroy: function(){
			this.$refs.functionsTree.$off('contextmenu', this.functionContextMenu);
			this.$refs.functionsTree.$off('rename', this.functionRename);
			this.$refs.functionsTree.$off('dblclick', this.functionDblclick);
		},
		
		methods: {
			addFunction: function(data, doReaname){
				var a = 0
				, name = (data && data.name) ? data.name : 'NewFunction';
				
				if(this.$store.getters.nameExists(name)){
					while(this.$store.getters.nameExists(name + '_' + a))
						a++;
					name += '_' + a;
				}
				
				data = data || {};
				data.name = name;
				data.img = functionImg;
				data.$tabOrder = 0;
				this.$store.commit('addFunction', data);
				
				if(doReaname === false)
					return;
				
				this.$nextTick(function(){
					var n = this.$refs.functionsTree.findNode(name);
					this.functionRename(n, n.data);
				});
			},
			
			functionDblclick: function(evt, data){
				if(data.$tabOrder == 0)
					data.$tabOrder = this.tabsId++;
				this.$nextTick(function(){
					this.focusTab(data);
				});
			},
			
			functionContextMenu: function(evt, data){
				var me = this;
				//console.log(evt);
				const menu = me.$refs.contextmenu;
				console.log('cmenu');
				//menu.clear();
				menu.addTitle('Function');
				
				menu.addItem({id: 'rename', title: 'rename', callback: function(){
					me.functionRename(evt, data);
				}, disabled: ((data.flags & F_NO_RENAME) == F_NO_RENAME), shortcut: 'F2'});
				
				menu.addItem({id: 'delete', title: 'delete', callback: function(){
					
				}, disabled: ((data.flags & F_NO_DELETE) == F_NO_DELETE), shortcut: 'Del'});

				menu.addItem({id: 'duplicate', title: 'duplicate', callback: function(){
					
				}, disabled: ((data.flags & F_NO_COPY) == F_NO_COPY), shortcut: 'Ctrl+D'});

				menu.addItem({id: 'refs', title: 'find references', callback: function(){
					
				}});
				
				menu.showAt(evt);
			},
			
			functionRename: function(evt, data){
				console.log('functionRename');
				const me = this;
				const t = this.rename(data, evt.target)
					.success(function(input){
						me.$store.commit('changeGraph', {name: data.name, props:{name: input.value}});
					})
					.validate(function(evt, input){
						if(input.value == data.name)
							return;
						if(me.$store.getters.nameExists(input.value))
							return false;
					});
			},
			
			isFunction: function(data){
				return ((data.flags & F_IS_FUNCTION) == F_IS_FUNCTION);
				
			},
					
		}
	});
	
</script>