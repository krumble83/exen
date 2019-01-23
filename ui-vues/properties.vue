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
	import uipropitem from './properties.item.vue';

	uitree.components.uipropitem = uipropitem;
	
	export default {
		components: {uitree, uipropitem},
	
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
				if(!newValue){
					me.test = 'no properties';
					return;
				}
				console.log(newValue.getAttribute('flags'), newValue.flags & F_IS_FUNCTION, F_IS_FUNCTION);
				if((newValue.getAttribute('flags') & F_IS_FUNCTION) == F_IS_FUNCTION){
					me.pData = me.$store.getters.getGraph(newValue.getAttribute('name'));
					me.test = '';
					me.showFunctionProperties();				
				}
				else if((newValue.getAttribute('flags') & F_IS_VARIABLE) == F_IS_VARIABLE){
					me.pData = me.$store.getters.getVariable(newValue.getAttribute('name'));
					me.showVariableProperties();				
				}
				else {
					me.test = 'no properties';
				}
			});
		},
		
		methods: {
			addInput: function(){
				this.pData.$store.commit('addInput', {ctor: 'uipropitem', name: 'input2'});
				//this.pData.$store.state.inputs.push({ctor: 'uipropitem', name: 'input2'});
			},
			
			addOutput: function(){
				this.pData.$store.commit('addInput', {ctor: 'uipropitem', name: 'input2'});
			},
			
			showFunctionProperties: function(){
				//console.log((this.pData.flags & F_LOCK_OUTPUTS) == F_LOCK_OUTPUTS);
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
					button: {text: 'Add Input', action: 'addInput', disabled: ((this.pData.flags & F_LOCK_INPUTS) == F_LOCK_INPUTS)},
					items: this.pData.$store.state.inputs						
				},
				{
					ctor: 'uitree', 
					label: 'Outputs', 
					button: {text: 'Add Output', action: 'addOutput', disabled: ((this.pData.flags & F_LOCK_OUTPUTS) == F_LOCK_OUTPUTS)},
					items: this.pData.$store.state.outputs					
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