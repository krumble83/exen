<script>

	var VariablePanel = function(){
		return {
			headerText: '',
			footerText: '',
			currentItem: false,
			items: [
				{
					label: 'Variable',
					items: [
						{name: 'Variable Name', dataid: 'name', editor:{ctor: 'texteditor', pattern: C_VARIABLE_NAME_PATTERN, required: true}},
						{name: 'Description'},
						{name: 'Access'},
					],
				},
			]
		};
	};
	
	import Blueprint from './blueprint.vue';
	import {module} from '../store/modules/store.blueprint.variable.js'
	import Menu from '../../../vues/contextmenu.vue';
	
	Blueprint.mixins.push({
		computed: {	
			variables: function(){return this.store.getters['variable/getVariable']()},
		},
		
		data: function(){
			return {
				variablePanel: {},
			}
		},
		
		created: function(){
			this.store.registerModule('variable', module);
			this.variablePanel = VariablePanel();
		},
		
		mounted: function(){
			this.$refs.variablesTree.$on('button:addVariable', this.addVariable);
			this.$refs.properties.addPanel(this.variablePanel);
		},
		
		beforeDestroy: function(){
			this.$refs.variablesTree.$off('button:addVariable', this.addVariable);
		},
		
		methods: {
			addVariable: function(data, callback){
				data = data || {};
				this.store.commit('variable/add', data);
				//return;
				if(typeof callback == 'function'){
					this.$nextTick(function(){
						var n = this.$refs.variablesTree.getItem(data.name);
						console.assert(n);
						callback(n);
					}, this);
				}
				else if(callback != false){
					this.$nextTick(function(){
						var n = this.$refs.variablesTree.getItem(data.name);
						console.assert(n);
						n.rename();
					}, this);
				}
			},
			
			deleteVariable: function(item, evt){
				this.deleteFile(item, evt);								
			},
			
			variablesTreeSelect: function(item){
				//console.log('--', item);
				this.fileSelect(item);
				this.variablePanel.currentItem = item;
				this.$refs.properties.showPanel(this.variablePanel, item);
			},
			
			variablesTreeContextMenu: function(item, menu, evt){
				var me = this;
				
				menu.addTitle('Variable');
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
				
			},

			onVariableWorksheetdrop: function(item, worksheet, evt){
				console.log(arguments);
				var ComponentClass = Vue.extend(Menu);
				var instance = new ComponentClass();
				instance.classObject.context = true;
				
				instance.addItem({title: 'Get'});
				instance.addItem({title: 'Set'});
				
				this.$emit('cmenu', this, instance, evt);
				instance.showAt(evt.clientX, evt.clientY);

			},
			
			onVariableRename: function(item, editor, evt){
				//console.log('+++', editor);
				var me = this;
				
				editor.setPattern(C_VARIABLE_NAME_PATTERN);
				
				function check(value, editor){
					if(value == item.name)
						return;
					if(me.store.getters.nameExist(value))
						editor.invalidate('name allready exists');					
				}
				
				editor.$on('change', check);
				
				editor.$once('end', function(value, editor){
					if(value == item.name || me.store.getters.nameExist(value))
						item.editor = false;
					else
						me.store.commit('variable/update', {name: item.name, props: {name: value}});
					editor.$off('change', check);
				});
			},
		}
	});
	
</script>