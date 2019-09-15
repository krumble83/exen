<template>
	<component 
		is="ExWorksheet" 
		style="position:absolute"
		:store="store"
		@edited="onEdited"
		@node:focus="Blueprint.$emit('node:focus', $event)"
		@node:blur="Blueprint.$emit('node:blur', $event)"
	>
		<ExTitleBar :title="name" slot="front" :toolbuttons="[]" :doToolbarAction="[]" />
	</component>
</template>


<script>

	var FunctionPanel = function(){
		var me = this;
		return {
			headerText: '',
			footerText: '',
			currentItem: false,
			items: [
				{
					label: 'Function',
					items: [
						{
							name: 'name', 
							label: 'Function Name', 
							tooltip: '',
							dataid: 'name', 
							editor:{
								ctor: 'texteditor', 
								pattern: C_FUNCTION_NAME_PATTERN, 
								required: true,
								validatefn : function(val, editor){
									//console.log('validate', me.store);
									return (me.store.getters.nameExist(val) == undefined || val == me.$refs.functionsTree.selected.name);
								},
								successfn: function(val, editor){
									me.store.commit('function/update', {func: me.$refs.functionsTree.selected.name, props: {name: val}});
									this.$nextTick(function(){
										editor.checkValue();
									});
								},
							}
						},
						{
							name: 'description', 
							tooltip: 'Short description of the purpose of this function',
							dataid: 'description', 
							editor:{
								ctor: 'texteditor',
								successfn: function(val, editor){
									me.store.commit('function/update', {func: me.$refs.functionsTree.selected.name, props: {description: val}});
								},
							}
						},
						{
							name: 'Access'
						},
					],
				},
				{
					label: 'Inputs', 
					ctor: 'ios',
					button: {text: 'Input', action: 'addFunctionInput', disabled: false, symbol: 'apps/exen/ui-img/add.png'},
					storeGetter: 'getInput',
					storeSetter: 'changeInputProperty',
				},
				{
					label: 'Outputs', 
					ctor: 'ios',
					button: {text: 'Output', action: 'addFunctionOutput', disabled: false, symbol: 'apps/exen/ui-img/add.png'},
					storeGetter: 'getOutput',
					storeSetter: 'changeOutputProperty',
				},
			]
		};
	};

	import Blueprint from './blueprint.vue';
	import {BluePrintFunctionModule} from '../store/modules/store.blueprint.function.js'
	
	import ExWorksheet from '../graph-vues/worksheet.vue'
	//import ExWorksheetGrid from '../graph-vues/worksheet.grid.vue'
	import ExTitleBar from '../graph-vues/worksheet.titlebar.vue';

	
	Blueprint.mixins.push({
		computed: {	
			//graphs: function(){return _.orderBy(this.store.state.files, 'tabOrder');
			functions: function(){return this.store.getters['function/getFunction']()},
		},
		
		data: function(){
			return {
				functionPanel: {},
			}
		},
		
		created: function(){
			this.store.registerModule('function', BluePrintFunctionModule);
			this.functionPanel = FunctionPanel.call(this);
		},
		
		mounted: function(){
			const me = this;
			
			me.$refs.functionsTree.$on('button:addFunction', me.addFunction);
			me.$refs.properties.$on('button:addFunctionInput', me.addInput);
			me.$refs.properties.$on('button:addFunctionOutput', me.addOutput);
			me.$refs.properties.addPanel(me.functionPanel);
			
			me.$on('node:focus', function(node){
				//console.log('focuuuuuuuuus', node);
				//me.functionsShowPanel();
			});
			
			me.$on('node:blur', function(node){
				//me.$refs.properties.hidePanels();
			});
		},
		
		beforeDestroy: function(){
			const me = this;
			
			me.$refs.functionsTree.$off('button:addFunction', me.addFunction);
			me.$refs.properties.$off('button:addFunctionInput', me.addInput);
			me.$refs.properties.$off('button:addFunctionOutput', me.addOutput);
		},
		
		methods: {
			addFunction: function(data, callback){
				const me = this;
							
				//data.ctor = 'fileTab';
				data = data || {};				
				me.store.commit('function/add', data);

				if(typeof callback == 'function'){
					me.$nextTick(function(){
						//console.dir(me);
						var n = me.$refs.functionsTree.getItem(data.name);
						console.assert(n);
						callback(n);
					}, me);
				}
				else if(callback != false){
					me.$nextTick(function(){
						//console.dir(me);
						var n = me.$refs.functionsTree.getItem(data.name);
						console.assert(n);
						n.rename();
					}, me);
				}
			},
			
			deleteFunction: function(item, evt){
				this.deleteFile(item, evt);
			},
			
			functionsTreeSelect: function(item){
				const me = this;				
				me.fileSelect(item);
				me.functionsShowPanel(item);
			},
			
			functionsShowPanel: function(item){
				const me = this;
				
				if(!item)
					item = me.$refs.functionsTree.selected;
				
				me.functionPanel.items.find(it => it.button && it.button.action == 'addFunctionInput').button.disabled = item.$hasFlag(F_LOCK_INPUTS);
				me.functionPanel.items.find(it => it.button && it.button.action == 'addFunctionOutput').button.disabled = item.$hasFlag(F_LOCK_OUTPUTS);
				me.functionPanel.currentItem = item;
				me.$refs.properties.showPanel(me.functionPanel, item);
				
			},
			
			functionsTreeContextMenu: function(item, menu, evt){
				const me = this;
				
				menu.addTitle('Function');
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
				
			},
			
			onFunctionWorksheetdrop: function(item, worksheet, evt){
				console.log(arguments);
				var coords = worksheet.mouseToSvg(evt);
				worksheet.store.commit('addNode', {name: 'zozo', title: item.name, x: coords.x, y: coords.y, outputs: item.datas.outputs});
			},

			addInput: function(item){
				//console.log('addInput');
				this.store.commit('function/addInput', {func: item.name, props: {}});
			},
			
			addOutput: function(item){
				//console.log('addOutput');
				this.store.commit('function/addOutput', {func: item.name, props: {}});
			},
		}
	});


	var ex = {
		components: {ExWorksheet, ExTitleBar},
		mixins: [],
		inject: ['Blueprint'],
			
		props: {
			name: String,
			flags: Number,
			store: Object,
		},
		
		data: function(){
			return {
			}
		},
		mounted: function(){
			//console.log('iii', this.store);
			
		},
		
		computed: {		
		},

		methods: {
			onEdited: function(worksheet){
				this.$emit('edited', worksheet);
			},
			/*
			onNodeFocus: function(node){
				//console.log('node focus', node, this);
				this.Blueprint.$emit('node:focus', node);
			},
			
			onNodeBlur: function(node){
				//console.log('node blur', node, this);
				this.Blueprint.$emit('node:blur', node);
			},
			*/
		}
	}

	import tab from '../../../vues/tabs.tab.vue';
	tab.components.functionfile = ex;
	
	export default ex;
	
</script>