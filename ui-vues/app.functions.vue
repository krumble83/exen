<script>

	import App from './app.vue';
	import functionImg from '../ui-img/function.png';
	
	App.mixins.push({
		computed: {	
			functions: function(){return this.$store.state.graphs.filter(g => g.type=='function')}
		},
		
		mounted: function(){
			//var me = this;
			this.$refs.functionsTree.$on('contextmenu', this.functionContextMenu);
			this.$refs.functionsTree.$on('rename', this.functionRename);
		},
		
		beforeDestroy: function(){
			this.$refs.functionsTree.$off('contextmenu', this.functionContextMenu);
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
				data = data || {};
				data.name = name;
				data.img = functionImg;
				data.tabOrder = 0;
				this.$store.commit('addFunction', data);
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
			
			functionContextMenu: function(evt, data){
				var me = this;
				//console.log(evt);
				const menu = me.$refs.contextmenu;
				console.log('cmenu');
				menu.clear();
				menu.addTitle('Function');
				
				menu.addItem({id: 'rename', title: 'rename', callback: function(){
					me.rename(data, evt.target);
				}, disabled: ((data.flags & F_NO_RENAME) == F_NO_RENAME)});
				
				menu.addItem({id: 'delete', title: 'delete', callback: function(){
					
				}, disabled: ((data.flags & F_NO_DELETE) == F_NO_DELETE)});

				menu.addItem({id: 'duplicate', title: 'duplicate', callback: function(){
					
				}, disabled: ((data.flags & F_NO_COPY) == F_NO_COPY)});

				menu.addItem({id: 'refs', title: 'find references', callback: function(){
					
				}});
				
				menu.showAt(evt);
			},
			
			functionRename: function(evt, data){
				const t = this.rename(data, evt.target)
					.success(function(value){
						console.log('ok');
					})
					.validate(function(){
						return;
					});
					//console.log(t);
			},
			
			isFunction: function(data){
				return ((data.flags & F_IS_FUNCTION) == F_IS_FUNCTION);
				
			},
					
		}
	});
	
</script>