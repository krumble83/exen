<template>
	<ul class="uiTree">
		<li style="width:100%" class="main">
			<input type="checkbox" :id="'folder_' + label" checked="true">
			<div v-if="button" :class="{add: true, disabled: button.disabled}" @click.stop.prevent="btnClick"><img src="ui-img/add.png" /><span>{{button.text}}</span></div>
			<label :for="'folder_' + label">{{label}}</label>
			<ul>
				<component v-for="(item,id) in items" :key="id"
					:is="item.ctor ? item.ctor : 'treeitem'"
					v-bind="item"
					ref="nodes"
					:index="id"
					:onClick="onClick"
					:onContext="onContext"
					:onDblClick="onDblClick"
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
			draggable: {type: Boolean, default: true},
			selectable: {type: Boolean, default: true},
			items: {default: function(){return[]}},
		},
		
		data: function(){
			return {
				currentSelected: false,
				timer: false,
			}
		},
		
		mounted: function(){
			var me = this;
			if(!this.selectable)
				return;
			document.addEventListener('mousedown', function(evt){
				if(evt.target.classList.contains('focused', 'child'))
					return;
				if(me.$el.querySelector('.focused'))
					me.$el.querySelector('.focused').classList.remove('focused');			
			}, {useCapture: true})
		},
		
		methods: {
			btnClick: function(evt){
				//console.log(this.button.action);
				this.$emit('action:' + this.button.action);
				//this.$parent[this.button.action]();
			},
			
			onDblClick: function(evt, id){
				//console.log('dblclick', id);
				console.assert(this.items[id]);
				clearTimeout(this.timer);
				this.$emit('dblclick', evt, this.items[id]);
			},
			
			onClick: function(evt, id){
				if(!this.selectable)
					return;
				clearTimeout(this.timer);
				if(evt.target.classList.contains('focused')){
					console.log('focused');
					const me = this;
					this.timer = setTimeout(function(){
						me.renameItem(evt, me.items[id]);
					}, 200);
					return;
				}
			
				if(this.$el.querySelector('.selected'))
					this.$el.querySelector('.selected').classList.remove('selected', 'focused');

				evt.target.classList.add('selected', 'focused');				
				this.$emit('select', evt, this.items[id]);
				this.$parent.$emit('tree:select', evt, this.items[id]);
			},
			
			onContext: function(evt, id){
				this.onClick(evt, id);
				clearTimeout(this.timer);
				this.$emit('contextmenu', evt, this.items[id]);
			},
			
			renameItem: function(evt, data){
				this.$emit('rename', evt, data);
			},
			
			findNode: function(name){
				this.$mount();
				const node = this.$el.querySelector('li[name="' + name + '"]');
				
				if(!node)
					return false;
				return {data: this.items[node.getAttribute('index')], target: node};
			},
			
			alert: function(){alert('a')}
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
		padding-top :2px;
		z-index: 10;
	}

	/*********************/
	ul.uiTree li.main .add{
		float:right;		
		position: static;
		margin-right: 5px;
		margin-top: 1px;
		pointer-events: all;
		border-radius: 3px;
		z-index: 10000;
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
	}
	
	ul.uiTree li.child.selected,
	ul.uiTree li.child.selected:hover{
		background-color: #898989;
	}

	ul.uiTree li.child.focused,
	ul.uiTree li.child.focused:hover{
		background-color: #dea309;
	}
	
	ul.uiTree li.child:hover{
		background-color: #494949;
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


	.uiTree img{	
		pointer-events: none;
		vertical-align: bottom;
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




	.uiTree input.editor {
		position: absolute;
		left: 36px;
		padding: 0;
		margin-top: -1px;
		background-color: #e7e7e7;
		border-radius: 5px;
		height: 14px;
		font-size: 12px;
		outline: none;
		width: 120px;
		-webkit-user-select: auto;
		-moz-user-select: auto;
		-ms-user-select: auto;
		user-select: auto;
	}

	.uiTree input.editor:invalid {
		background-color: #ffc8c8;
		border-color: #f00;
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