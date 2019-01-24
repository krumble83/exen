<template>
	<div style="width:100%;height:100%">
		<slot>
			<component v-for="item in items" 
				:is="item.ctor" 
				v-bind="item" 
				ref="props" 
				:selectable="false" 
				:draggable="false" 
			/>	
		</slot>
		{{text}}
	</div>
</template>


<script>

	import uitree from './tree.vue';
	import uipropitem from './properties.item.vue';

	uitree.components.uipropitem = uipropitem;
	
	export default {
		components: {uitree, uipropitem},
		mixins: [],
		data: function(){
			return {
				text: '',
				items: [],
				pData: false,
				labelWidth: 50,
			}
		},
	
		created: function(){
			var me = this;
			return
			this.$parent.$watch('treeSelected', function(newValue, oldValue) {
				me.items = [];
				if(!newValue){
					me.text = 'no properties';
					return;
				}
				console.log(newValue.getAttribute('flags'), newValue.flags & F_IS_FUNCTION, F_IS_FUNCTION);
				if((newValue.getAttribute('flags') & F_IS_FUNCTION) == F_IS_FUNCTION){
					me.pData = me.$store.getters.getGraph(newValue.getAttribute('name'));
					me.text = '';
					me.showFunctionProperties();				
				}
				else if((newValue.getAttribute('flags') & F_IS_VARIABLE) == F_IS_VARIABLE){
					me.pData = me.$store.getters.getVariable(newValue.getAttribute('name'));
					me.showVariableProperties();				
				}
				else {
					me.text = 'no properties';
				}
			});
		},
		
		methods: {
			
			showFunctionProperties: function(){
				//console.log((this.pData.flags & F_LOCK_OUTPUTS) == F_LOCK_OUTPUTS);

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