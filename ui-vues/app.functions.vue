<script>

	import App from './app.vue';
	import Properties from './properties.vue';
	import functionImg from '../ui-img/function.png';
	import {hasFlag} from '../utils';
	
	App.mixins.push({
		computed: {	
			functions: function(){return this.$store.state.graphs.filter(g => (g.flags & F_IS_FUNCTION) == F_IS_FUNCTION)}
		},
		
		mounted: function(){
			this.$refs.functionsTree.$on('contextmenu', this.functionContextMenu);
			this.$refs.functionsTree.$on('rename', this.functionRename);
			this.$refs.functionsTree.$on('dblclick', this.functionDblclick);
			this.$refs.functionsTree.$on('select', this.functionShowProperties);
			this.$refs.functionsTree.$on('action:addFunction', this.addFunction);
			
			this.$refs.properties.$on('action:addInput', this.addInput);
			this.$refs.properties.$on('action:addOutput', this.addOutput);
		},
		
		beforeDestroy: function(){
			this.$refs.functionsTree.$off('contextmenu', this.functionContextMenu);
			this.$refs.functionsTree.$off('rename', this.functionRename);
			this.$refs.functionsTree.$off('dblclick', this.functionDblclick);
			this.$refs.functionsTree.$off('select', this.functionShowProperties);
			this.$refs.functionsTree.$off('action:addFunction', this.addFunction);
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
				//data.$tabOrder = 0;
				this.$store.commit('addFunction', data);
				
				if(doReaname === false)
					return;
				
				this.$nextTick(function(){
					var n = this.$refs.functionsTree.findNode(name);
					this.functionRename(n, n.data);
				});
			},
			
			functionDblclick: function(evt, data){
				if(!data.$tabOrder || data.$tabOrder == 0)
					Vue.set(data, '$tabOrder', this.tabsId++);
				this.$nextTick(function(){
					this.focusTab(data);
				});
			},
			
			functionContextMenu: function(evt, data){
				var me = this;
				//console.log(evt);
				const menu = me.$refs.contextmenu;
				console.assert(menu);
				//menu.clear();
				menu.addTitle('Function');
				
				menu.addItem({id: 'rename', title: 'rename', callback: function(){
					me.functionRename(evt, data);
				}, disabled: ((data.flags & F_NO_RENAME) == F_NO_RENAME), shortcut: 'F2'});
				
				menu.addItem({id: 'delete', title: 'delete', callback: function(){
					me.graphDelete(data);
				}, disabled: ((data.flags & F_NO_DELETE) == F_NO_DELETE), shortcut: 'Del'});

				menu.addItem({id: 'duplicate', title: 'duplicate', callback: function(){
					
				}, disabled: ((data.flags & F_NO_COPY) == F_NO_COPY), shortcut: 'Ctrl+D'});

				menu.addItem({id: 'refs', title: 'find references', callback: function(){
					
				}});
				
				menu.showAt(evt);
			},
			
			functionRename: function(evt, data){
				//console.log('functionRename');
				const me = this;
				console.assert(data.name);
				this.rename(data, evt.target)
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
						
			functionShowProperties: function(evt, data){
				const proptree = this.$refs.properties;
				
				proptree.items.splice(0);
				proptree.items.push({
					ctor: 'uitree', 
					label: 'General', 
					items: data.props
				},
				{
					ctor: 'uitree', 
					label: 'Inputs', 
					button: {text: 'Input', action: 'addInput', disabled: hasFlag(data, F_LOCK_INPUTS)},
					items: data.$data.state.inputs						
				},
				{
					ctor: 'uitree', 
					label: 'Outputs', 
					button: {text: 'Output', action: 'addOutput', disabled: hasFlag(data, F_LOCK_OUTPUTS)},
					items: data.$data.state.outputs					
				});				
				console.log(proptree.$refs);
				proptree.$mount();
				proptree.$refs.props[1].$on('action:addInput', this.addInput);
				proptree.$refs.props[2].$on('action:addOutput', this.addOutput);
			},
			
			isFunction: function(data){
				return hasFlag(data, F_IS_FUNCTION);
				
			},
			
			addInput: function(){
				const data = this.$store.getters.getGraph(this.treeSelected.getAttribute('name'));
				console.assert(data && data.$data);
				data.$data.commit('addInput', {name: 'test'});
			},

			addOutput: function(){
				const data = this.$store.getters.getGraph(this.treeSelected.getAttribute('name'));
				console.assert(data && data.$data);
				data.$data.commit('addOutput', {name: 'test'});
			},
					
		}
	});
		
	
</script>