<template>
	<component 
		is="ExWorksheet" 
		style="position:absolute"
		:store="store"
		@edited="onEdited"
	>
		<ExTitleBar :title="name" slot="front" :toolbuttons="[]" :doToolbarAction="[]" />
	</component>
</template>


<script>

	var FunctionPanel = function(){
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
								required: true
							}
						},
						{
							name: 'description', 
							tooltip: 'Short description of the purpose of this function',
							dataid: 'description', 
							editor:{
								ctor: 'texteditor'
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
					button: {text: 'Input', action: 'addFunctionInput', disabled: false},
					getter: 'function/getInput',
					dataid: 'inputs',
				},
				{
					label: 'Outputs', 
					ctor: 'ios',
					button: {text: 'Output', action: 'addFunctionOutput', disabled: false},
					getter: 'function/getOutput',
					dataid: 'outputs',
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
			this.functionPanel = FunctionPanel();
		},
		
		mounted: function(){		
			this.$refs.functionsTree.$on('button:addFunction', this.addFunction);
			this.$refs.properties.$on('button:addFunctionInput', this.addInput);
			this.$refs.properties.$on('button:addFunctionOutput', this.addOutput);
			this.$refs.properties.addPanel(this.functionPanel);
		},
		
		beforeDestroy: function(){
			this.$refs.functionsTree.$off('button:addFunction', this.addFunction);
			this.$refs.properties.$off('button:addFunctionInput', this.addInput);
			this.$refs.properties.$off('button:addFunctionOutput', this.addOutput);
		},
		
		methods: {
			addFunction: function(data, callback){
				
				//data.ctor = 'fileTab';
				data = data || {};				
				this.store.commit('function/add', data);

				if(typeof callback == 'function'){
					this.$nextTick(function(){
						//console.dir(this);
						var n = this.$refs.functionsTree.getItem(data.name);
						console.assert(n);
						callback(n);
					}, this);
				}
				else if(callback != false){
					this.$nextTick(function(){
						//console.dir(this);
						var n = this.$refs.functionsTree.getItem(data.name);
						console.assert(n);
						n.rename();
					}, this);
				}
			},
			
			deleteFunction: function(item, evt){
				this.deleteFile(item, evt);
			},
			
			functionsTreeSelect: function(item){
				this.fileSelect(item);
				
				this.functionPanel.items.find(it => it.button && it.button.action == 'addFunctionInput').button.disabled = item.$hasFlag(F_LOCK_INPUTS);
				this.functionPanel.items.find(it => it.button && it.button.action == 'addFunctionOutput').button.disabled = item.$hasFlag(F_LOCK_OUTPUTS);
				this.functionPanel.currentItem = item;
				this.$refs.properties.showPanel(this.functionPanel, item);
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
				console.log('addInput');
				this.store.commit('function/addInput', {name: item.name, datatype: 'core.type.int', editor: {ctor: 'PinEditorInput'}});
			},
			
			addOutput: function(item){
				console.log('addOutput');
				this.store.commit('function/addOutput', {name: item.name, datatype: 'core.type.string'});
			},
		}
	});


	var ex = {
		components: {ExWorksheet, ExTitleBar},
		mixins: [],
		
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
		}
	}

	import tab from './tabs.tab.vue';
	tab.components.functionfile = ex;
	
	export default ex;
	
</script>