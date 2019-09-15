<template>
	<ul class="uiTree properties">
		<li style="width:100%" class="main">
			<input type="checkbox" :id="'folder_' + uid" checked="true">
			<div v-if="button" 
				:class="{add: true, disabled: button.disabled}" 
				@click.stop.prevent="btnClick"
			>
				<img src="apps/exen/ui-img/add.png" />
				<span>{{button.text}}</span>
			</div>
			<label :for="'folder_' + uid">{{label}}</label>
			<ul>
				<component v-for="(it,id) in items" :key="id"
					:is="it.ctor ? it.ctor : 'treeitem'"
					v-bind="it"
					:item="item"
				>
				</component>
			</ul>
		</li>
		<li class="sep"></li>
	</ul>
</template>

<script>

	import treeitem from './propertytree.item.vue';

	export default {
		components: {treeitem},
		props: {
			label: String,
			button: {},

			item: Object,
			items: Array,
		},
		
		data: function(){
			return {
				uid: this.$uid(),
			}
		},
		
		computed: {

		},
		
		watch: {
		},
		
		mounted: function(){
		},
		
		methods: {
			
			btnClick: function(evt){
				this.$parent.$emit('button:' + this.button.action, this.item);
			},
		}
	}
</script>

<style>
	.uiTree.properties li.child.editor{
		display: flex;
		width: 98%;
	}

	.uiTree.properties li.child.editor input.editor {
		position: static;
		margin-top: 0;
		width: 96%;
	}
	
	.uiTree.properties li.child.editor div.label {
		width: 90px;
		min-width:90px; 
		overflow: hidden;
		padding: 2px 1px 2px 10px;
	}
	
	.uiTree.properties li.child.editor img.separator {
		width:0px;
		cursor: col-resize;
		height: 21px;
		margin-top: -1px;
		border: 1px solid transparent;
		border-left-color: #222;
	}	
	
	.uiTree.properties li.child.editor div.editor {
		flex:1;
		padding-left: 3px;
	}
</style>