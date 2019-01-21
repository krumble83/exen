<template>
	<ul class="uiTree">
		<li style="width:100%" class="main">
			<input type="checkbox" :id="'folder_' + label" checked="true">
			<div v-if="button" :class="{add: true, disabled: button.disabled}" @click.stop.prevent="doAdd"><img src="ui-img/add.png" /><span>{{button.text}}</span></div>
			<label :for="'folder_' + label">{{label}}</label>
			<ul>
				<li v-for="(item,id) in items" :key="id"
					:is="item.ctor ? item.ctor : 'li'"
					:draggable="draggable"
					ref="nodes"
					class="child"
					:name="item.name" 
					:index="id"
					:type="type"
					@click="onClick($event,id)"
					@contextmenu.stop.prevent="onContext($event,id)"
					@dblclick="onDblClick($event,id)"
					@mouseenter.stop=""
					@mousemove.stop=""
				>
					<span><img :src="item.img">&nbsp;{{item.name}}</span>
				</li>
			</ul>
		</li>
		<li class="sep"></li>
	</ul>
</template>

<script>
	export default {
		props: {
			label: String,
			filter: String,
			storename: String,
			action: {},
			button: {},
			type: String,
			draggable: {type: Boolean, default: true},
			items: {default: function(){return[]}},
		},
		
		data: function(){
			return {
				currentSelected: false,
			}
		},
		
		methods: {
			doAdd: function(evt){
				console.log(this.button.action);
				this.$parent[this.button.action]();
			},
			
			onDblClick: function(evt, id){
				this.$emit('dblclick', evt, this.items[id]);
				if(typeof this.$parent.treeDblClick === 'function')
					this.$parent.treeDblClick(this.items[id], evt);
			},
			
			onClick: function(evt, id){
				this.$emit('click', evt, this.items[id]);
				if(typeof this.$parent.treeClick === 'function')
					this.$parent.treeClick(this.items[id], evt);
			},
			
			onContext: function(evt, id){
				this.$emit('contextmenu', evt, this.items[id]);
			},
			
			findNode: function(name){
				var node;
				this.$mount();
				if(!this.$refs.nodes)
					return false;
				node = this.$refs.nodes.find(el => el.attributes[1].value == name);
				//console.log(this.$refs.nodes[this.$refs.nodes.length-1].attributes[1].value);
				return {data: this.items[node.attributes[2].value], el: node};
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