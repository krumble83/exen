<template>
	<ul class="uiTree">
		<li style="width:100%" class="main">
			<input type="checkbox" :id="'folder_' + uid" checked="true">
			<div v-if="button" 
				:class="{button: true, disabled: button.disabled}" 
				@click.stop.prevent="onBtnClick"
			>
				<img v-if="button.symbol" :src="button.symbol" />
				<span v-if="button.text">{{button.text}}</span>
			</div>
			<label :for="'folder_' + uid">{{label}}</label>
			<ul>
				<component v-for="(item,id) in items" :key="id"
					:is="item.ctor ? item.ctor : 'treeitem'"
					v-bind="item"
					@edited="onEdited"
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
			button: {type: Object, default: false},
			//draggable: {type: Boolean, default: true},
			selectable: {type: Boolean, default: true},
			items: {default: function(){return[]}},
		},
		
		data: function(){
			return {
				uid: this.$uid(),
				mEdited: false,
				selected: false,
			}
		},

		methods: {

			getSelected: function(){
				return this.$el.querySelector('.child.selected').__vue__;
			},
			
			getItem: function(item){
				if(typeof(item == 'string'))
					return this.$children.find(it => it.name == item);
				else if(item.name)
					return this.$children.find(it => it.name == item.name);
			},
			
			onEdited: function(item){
				this.mEdited = true;
				this.$emit('item:edited', item)
			},
			
			onWorksheetdrop: function(item, worksheet, evt){
				this.$emit('item:worksheetdrop', item, worksheet, evt);
			},

			onBtnClick: function(evt){
				this.$emit('button:' + this.button.action);
			},

			onItemClick: function(item, evt){
				this.selected = item;
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
		color: var(--text-color);
		margin: 0;
		padding: 0;
		font-family: var(--text-font-family);
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


/***************************************************************
	main <li>
***************************************************************/

	ul.uiTree > li {
		background-color: var(--bg-dark-color);
		border-radius: var(--border-radius);	
		color: var(--text-color);
		font-size: var(--text-size);
		
		padding: 3px 0 0 0 !important;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		width: auto;
		min-height: 24px;
		min-width: 165px;
	}
	ul.uiTree > li span {
		display: inline-block;
		padding-left: 15px;
		pointer-events: none;
	}


/***************************************************************
	child <li>
***************************************************************/
	ul.uiTree li {
		padding: 3px 0 3px 0;
		white-space: nowrap;
		outline: none;
	}
	
	ul.uiTree li.selected,
	ul.uiTree li.selected:hover{
		background-color: var(--selected-bg-color);
		color: var(--selected-text-color);
	}

	ul.uiTree li:focus,
	ul.uiTree li.focused,
	ul.uiTree li.focused:hover{
		background-color: var(--focused-bg-color) !important;
		color: var(--focused-text-color);
	}
	
	ul.uiTree li:hover{
		background-color: var(--bg-light-color);
	}

	ul.uiTree li > span > img {
		vertical-align: bottom;
	}
	
	



/***************************************************************
	separator <li>
***************************************************************/
	ul.uiTree li.sep {
		height: 4px;
		background: none;
	}


/***************************************************************
	<li> editor
***************************************************************/
	.uiTree li.child input.editor {
		font-size: var(--text-size);
		color: var(--text-color);
		background-color: var(--main-bg-color);
		border-radius: var(--border-radius);
		border: var(--border);

		position: absolute;
		left: 36px;
		padding: 0;
		padding-left: 2px;
		margin-top: -1px;
		height: 16px;
		outline: none;
		width: 120px;

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




/***************************************************************
	<li> opener
***************************************************************/
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
		background-color: var(--bg-middle-color);

		display: block;
	}
	 
	.uiTree input[type=checkbox]:checked + label::before{
		transform: rotate(90deg); 
	}

	.uiTree label::before{
		color: var(--text-color);

		content: "\25B6";
		display: inline-block;
		margin-right: 6px;
		margin-left: 9px;
		font-size: 10px;
	}
	 


/***************************************************************
	<li> button
***************************************************************/
	ul.uiTree > li .button{
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

	ul.uiTree > li .button span{
		padding: 0 5px 0 0;
		display: none;
		font-size: 11px;
		line-height: 20px;
	}

	ul.uiTree > li .button:hover{
		background-color: var(--focused-bg-color);
		color: var(--focused-text-color);
	}

	ul.uiTree > li .button:hover span{
		display: inline;
	}

	ul.uiTree > li .button img{
		background-color: var(--bg-middle-color);
		border-radius: var(--border-radius);	
		vertical-align: bottom;
	}

	ul.uiTree > li .button.disabled{
		pointer-events: none;
	}	
	ul.uiTree > li .button.disabled img{
		background-color: var(--bg-light-color);
		filter: var(--filter);
	}	
	
	ul.uiTree > li .button:hover img{
		background-color: var(--focused-bg-color);
	}



/***************************************************************
	scrollbars
***************************************************************/

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