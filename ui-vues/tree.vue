<template>
	<ul class="uiTree">
		<li style="width:100%" class="main">
			<input type="checkbox" :id="'folder_' + uid" checked="true">
			<div v-if="button" 
				:class="{add: true, disabled: button.disabled}" 
				@click.stop.prevent="onBtnClick"
			>
				<img src="ui-img/add.png" />
				<span>{{button.text}}</span>
			</div>
			<label :for="'folder_' + uid">{{label}}</label>
			<ul>
				<component v-for="(item,id) in items" :key="id"
					:is="item.ctor ? item.ctor : 'treeitem'"
					v-bind="item"
					@focus="onItemClick"
					@open="onItemOpen"
					@delete="onItemDelete"
					@cmenu="onContextMenu"
					@rename:start="onRenameStart"
					@worksheetdrop="onWorksheetdrop"
				>
				</component>
			</ul>
		</li>
		<li class="sep"></li>
	</ul>
</template>

<script>

	import treeitem from './tree.item.vue';

	export default {
		components: {treeitem},
		props: {
			label: String,
			button: {},
			//draggable: {type: Boolean, default: true},
			selectable: {type: Boolean, default: true},
			items: {default: function(){return[]}},
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
			/*
			getLabel: function (name) {
				return name.split(/(?=[A-Z])/).join(' ');// + (this.edited ? '&nbsp;*' : '');
			},
			*/
			
			getItem: function(item){
				if(typeof(item == 'string'))
					return this.$children.find(it => it.name == item);
				else if(item.name)
					return this.$children.find(it => it.name == item.name);
			},
			
			onWorksheetdrop: function(item, worksheet, evt){
				this.$emit('item:worksheetdrop', item, worksheet, evt);
			},

			onBtnClick: function(evt){
				this.$emit('button:' + this.button.action);
			},

			onItemClick: function(item, evt){
				this.$emit('item:select', item, evt);
			},
			
			onItemOpen: function(item, evt){
				this.$emit('item:open', item, evt);
			},

			onItemDelete: function(item, evt){
				this.$emit('item:delete', item, evt);
			},

			onContextMenu: function(item, menu, evt){
				this.$emit('item:cmenu', item, menu, evt);
			},
			
			onRenameStart: function(item, editor, evt){
				this.$emit('item:rename:start', item, editor, evt);
			}

		}
	}
</script>

<style>
	ul.uiTree {
		color: #fff;
		margin: 0;
		padding: 0;
		font-family: Arial, Helvetica, sans-serif;
		margin-top: 3px;
	}

	ul.uiTree,
	.uiTree li
	{
		width:100%;
		list-style: none;
		cursor: default;
		font-size: 12px;
	}

	ul.uiTree li {
		font-weight: normal;
	}


	ul.uiTree ul {
		padding: 0;
		margin-top: 8px;
	}






	ul.uiTree li.main {
		background-color: #303030;
		padding: 3px 0 0 0 !important;
		border-radius: 5px 5px 3px 3px;	
		font-size: 13px;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		width: auto;
		min-height: 24px;
		min-width: 165px;
	}
	ul.uiTree li.main span {
		display: inline-block;
		padding-left: 15px;
		pointer-events: none;
	}

	ul.uiTree li.main label {
		/*
		padding-top :2px;
		z-index: 10;
		*/
	}

	/*********************/
	ul.uiTree li.main .add{
		float:right;		
		position: static;
		margin-right: 5px;
		margin-top: 1px;
		margin-bottom: 4px;
		pointer-events: all;
		border-radius: 3px;
		z-index: 10000;
		font-size: 11px;
		font-weight: normal;
	}

	ul.uiTree li.main .add span{
		padding: 0 5px 0 0;
		display: none;
		font-size: 11px;
		line-height: 20px;
	}

	ul.uiTree li.main .add:hover{
		background-color: #dea309;
	}

	ul.uiTree li.main .add:hover span{
		display: inline;
	}

	ul.uiTree li.main .add img{
		border-radius: 3px;	
		background-color: #444444;
		vertical-align: bottom;
	}

	ul.uiTree li.main .add.disabled{
		pointer-events: none;
	}	
	ul.uiTree li.main .add.disabled img{
		filter: invert(100%);
		background-color: #aaa;
	}	
	
	ul.uiTree li.main .add:hover img{
		background-color: #dea309;
	}

	/*********************/
	ul.uiTree li.child {
		padding: 3px 0 3px 0;
		white-space: nowrap;
		outline: none;
	}
	
	ul.uiTree li.child.selected,
	ul.uiTree li.child.selected:hover{
		background-color: #898989;
		color: #000;
	}

	ul.uiTree li.child:focus,
	ul.uiTree li.child.focused,
	ul.uiTree li.child.focused:hover{
		background-color: #dea309 !important;
	}
	
	ul.uiTree li.child:hover{
		background-color: #494949;
	}

	ul.uiTree li.child > span > img {
		vertical-align: bottom;
	}


	ul.uiTree li.sep {
		height: 4px;
		background: none;
	}


	.uiTree input[type=checkbox]{
		position: absolute;
		opacity: 0;
	}
	 
	.uiTree input[type=checkbox] + label + ul{
		padding: 0;
	}
	 
	.uiTree input[type=checkbox] ~ ul{
		display: none;
	}
	 
	.uiTree input[type=checkbox]:checked ~ ul{
		display: block;
		background-color: #3e3e3e;
	}

	 
	.uiTree label::before{
		content: "\25B6";
		color: #fff;
		display: inline-block;
		margin-right: 6px;
		margin-left: 9px;
		font-size: 10px;
	}
	 
	.uiTree input[type=checkbox]:checked + label::before{
		transform: rotate(90deg); 
	}




	.uiTree li.child input.editor {
		position: absolute;
		left: 36px;
		padding: 0;
		padding-left: 2px;
		margin-top: -1px;
		background-color: #e7e7e7;
		border: 1px solid #444;
		border-radius: 5px;
		height: 16px;
		font-size: 12px;
		outline: none;
		width: 120px;
		/*
		-webkit-user-select: auto;
		-moz-user-select: auto;
		-ms-user-select: auto;
		user-select: auto;
		*/
	}

	.uiTree li.child input.editor:invalid {
		background-color: #ffc8c8 !important;
		border-color: #f00 !important;
	}

	.uiTree li.child input.editor:invalid:before {
		content: "zzzzzzzzzzzz";
		position: absolute;
		left: 0px;
	}
		
	.uiTree input.editor:valid {
		background-color: #e7e7e7;
	}

	.uiTree .body::-webkit-scrollbar-track
	{
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		background-color: #191919;
	}

	.uiTree .body::-webkit-scrollbar
	{
		width: 10px;
		background-color: #191919;
	}

	.uiTree .body::-webkit-scrollbar-thumb
	{
		background-color: #9b9b9b;
		border: 0;
	}

</style>