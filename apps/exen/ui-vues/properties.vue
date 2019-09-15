<template>
	<div style="height:100%;padding:5px;">
		<div v-for="(item,id) in items" :key="id" 
			:style="item.styleObject"
		>
			{{item.headerText}}
			<component v-for="(c,cid) in item.items" :key="cid"
				:is="c.ctor ? c.ctor : 'propertytree'"
				v-bind="c"
				:item="currentItem"
			>
			</component>			
			{{item.footerText}}
		</div>
	</div>
</template>


<script>
	
	import propertytree from './propertytree.vue';
	import ios from './propertytree.ios.vue';
	
	export default {
		components: {propertytree, ios},
		mixins: [],
		data: function(){
			return {
				items: [],
				currentPanel: false,
				currentItem: {},
			}
		},
	
		created: function(){

		},
		
		methods: {
			addPanel: function(data){
				Vue.set(data, 'styleObject', {
					width: '100%',
					height: '100%',
					display: 'none'
				});
				
				this.items.push(data);
			},
			
			showPanel: function(panel, item){
				if(this.currentPanel)
					this.currentPanel.styleObject.display = 'none';
				
				this.currentPanel = panel;
				Vue.set(this, 'currentItem', item);
				panel.styleObject.display = 'block';
			},
			
			hidePanels: function(){
				if(this.currentPanel){
					this.currentPanel.styleObject.display = 'none';
					//this.currentItem = false;
				}
			}
		}
	}
</script>
