<template>
	<div style="width:100%;height:100%">
		<slot>
			<ul v-for="tree in items" class="uiTree" ref="props">
				<li style="width:100%" class="main">
					<input type="checkbox" :id="'folder_' + tree.label" checked="true">
					<div v-if="tree.button" :class="{add: true, disabled: tree.button.disabled}" @click.stop.prevent="btnClick(tree.button)"><img src="ui-img/add.png" /><span>{{tree.button.text}}</span></div>
					<label :for="'folder_' + tree.label">{{tree.label}}</label>
					<ul>
						<component v-for="(item) in tree['items']" :key="id"
							:is="item.ctor ? item.ctor : tree.itemctor ? tree.itemctor : 'uipropitem'"
							v-bind="item"							
							:labelwidth="labelWidth"
						>
						</component>
					</ul>
				</li>
				<li class="sep"></li>
			</ul>
		</slot>
		{{text}}
	</div>
</template>


<script>

	import uitree from './tree.vue';
	import uipropitem from './properties.item.vue';
	import uipropioitem from './properties.item.io.vue';
	import texteditor from './editor.text.vue';

	//uitree.components.uipropitem = uipropitem;
	//uitree.components.uipropioitem = uipropioitem;
	
	export default {
		components: {uitree, uipropitem, texteditor, uipropioitem},
		mixins: [],
		data: function(){
			return {
				text: '',
				items: [],
				labelWidth: 80,
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
		
			btnClick: function(button){
				if(button.emit)
					this.$emit('action:' + button.emit);
			},
			
			resize: function(){
			
			},
			
			onChange: function(){
				console.log('change');
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
