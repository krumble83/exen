<template>
	<div style="width:100%;height:100%">
		<slot name="trees"
			v-for="item in items"
		>
			<component :is="item.ctor" v-bind="item" />
		
		</slot>
  {{test}}
	</div>
</template>


<script>

	import uitree from './tree.vue';

	export default {
		components: {uitree},
	
		data: function(){
			return {
				test: '',
				items: [],
				pData: false,
			}
		},
	
		created: function(){
			var me = this;
			this.$parent.$watch('treeSelected', function(newValue, oldValue) {
				me.items = [];
				//console.log(newValue.getAttribute('name'));
				if(!newValue || !newValue.type){
					me.test = 'no properties';
					return;
				}
				switch(newValue.type){
					case 'variable':
						me.test = 'show variable properties';
						this.pData = this.$store.getters.getVariable(newValue.getAttribute('name'));
						me.showVariableProperties();
						break;
					
					case 'function':
						this.pData = this.$store.getters.getGraph(newValue.getAttribute('name'));
						me.test = '';
						me.showFunctionProperties();
						break;
					
					default:
						me.test = 'no properties';
						break;
				}
				//console.log(this);
			});
		},
		
		methods: {
			addInput: function(){
			
			},
			
			addOutput: function(){
			
			},
			
			showFunctionProperties: function(){
				this.items.push({
					ctor: 'uitree', 
					label: 'General', 
					items: [
						{name: this.pData.description}
					]
				},
				{
					ctor: 'uitree', 
					label: 'Inputs', 
					button: {text: 'Add Input', action: 'addInput'},
					items: [
						{name: 'input1'}
					]						
				},
				{
					ctor: 'uitree', 
					label: 'Outputs', 
					button: {text: 'Add Output', action: 'addOutput'},
					items: [
						{name: 'output1'}
					]						
				});
			
			},
			
			showVariableProperties: function(){
				this.items.push({
					ctor: 'uitree', 
					label: 'Variable', 
					items: [
						{name: 'dataType'},
						{name: 'isArray'}
					]
				},
				{
					ctor: 'uitree', 
					label: 'Default Value', 
					items: [
						{name: 'value'}
					]
				});			
			},
		}
	}
</script>