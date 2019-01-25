<script>

	import App from './app.vue';
	import Properties from './properties.vue';
	import functionImg from '../ui-img/function.png';
	import texteditor from './editor.text.vue';
	
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
			
			this.$refs.properties.$off('action:addInput', this.addInput);
			this.$refs.properties.$off('action:addOutput', this.addOutput);
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
				}, disabled: hasFlag(data, F_NO_RENAME), shortcut: 'F2'});
				
				menu.addItem({id: 'delete', title: 'delete', callback: function(){
					me.graphDelete(data);
				}, disabled: hasFlag(data, F_NO_DELETE), shortcut: 'Del'});

				menu.addItem({id: 'duplicate', title: 'duplicate', callback: function(){
					
				}, disabled: hasFlag(data, F_NO_COPY), shortcut: 'Ctrl+D'});

				menu.addItem({id: 'refs', title: 'find references', callback: function(){
					
				}});
				
				menu.showAt(evt);
			},
			
			functionRename: function(evt, data){
				//console.log('functionRename', evt.target);
				const me = this;
				console.assert(data.name);
				
				if(hasFlag(data, F_NO_RENAME))
					return;
				
				var editorClass = Vue.extend(texteditor);
				var editor = new editorClass();
				editor.value = data.name;
				editor.required = true;
				editor.pattern = '[a-zA-Z_$][0-9a-zA-Z_$]*';
				editor.validate = function(evt, input){
					if(input.value == data.name)
						return;
					if(me.$store.getters.nameExists(input.value))
						return false;
				};
				
				editor.success = function(input){
					me.$store.commit('changeGraph', {name: data.name, props:{name: input.value}});
					editor.$destroy();
				};
				
				editor.$mount();
				editor.startEdit(evt.target, true);
			},
						
			functionShowProperties: function(evt, data){
				const me = this
				, proptree = this.$refs.properties;
				
				this.pData = data;
				
				proptree.items.splice(0);
				proptree.items.push({
					ctor: 'uitree', 
					label: 'General', 
					items: [{
						name: 'description', 
						editor: {
							ctor: 'texteditor',
							value: data.props.description,
							success: function(input){
								me.$store.commit('changeGraphProp', {name: data.name, props:{description: input.value}});
							}
						}
					}]
				},
				{
					ctor: 'uitree', 
					label: 'Inputs', 
					button: {text: 'Input', emit: 'addInput', disabled: hasFlag(data, F_LOCK_INPUTS)},
					items: data.$data.state.inputs						
				},
				{
					ctor: 'uitree', 
					label: 'Outputs', 
					button: {text: 'Output', emit: 'addOutput', disabled: hasFlag(data, F_LOCK_OUTPUTS)},
					items: data.$data.state.outputs					
				});				
			},
			
			isFunction: function(data){
				return hasFlag(data, F_IS_FUNCTION);
			},
			
			addInput: function(){
				//const data = this.$store.getters.getGraph(this.treeSelected.getAttribute('name'));
				console.assert(this.pData && this.pData.$data);
				this.pData.$data.commit('addInput', {name: 'input'});
			},

			addOutput: function(){
				//const data = this.$store.getters.getGraph(this.treeSelected.getAttribute('name'));
				console.assert(this.pData && this.pData.$data);
				this.pData.$data.commit('addOutput', {name: 'output'});
			},
					
		}
	});
		
	
</script>