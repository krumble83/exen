<template>
	<ul class="uiTree root">
		<li style="width:100%">
			<input type="checkbox" :id="'folder_' + label" checked="true">
			<label :for="'folder_' + label">{{label}}</label><div v-if="button" class="add" @click.stop.prevent="doAdd"><img src="ui-img/add.png" /><span>{{button.text}}</span></div>
			<ul>
				<li v-for="(item,id) in items" :key="id"
					:is="item.ctor ? item.ctor : 'li'"
					:draggable="draggable"
					ref="nodes"
					:name="item.name" 
					:index="id"
					:type="type"
					@click="onClick($event,id)" 
					@dblclick="onDblClick($event,id)"
					@mouseenter.stop=""
					@mousemove.stop=""
				>
					<img :src="item.img">&nbsp;{{item.name}}
				</li>
			</ul>
		</li>
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
		
		computed: {
			//items: function(){return this.$store.state[this.storename]}
		},
		
		created: function(){
			
		},
		
		methods: {
			doAdd: function(evt){
				console.log(this.button.action);
				this.$parent[this.button.action]();
			},
			
			onDblClick: function(evt, id){
				if(typeof this.$parent.treeDblClick === 'function')
					this.$parent.treeDblClick(this.items[id], evt);
			},
			
			onClick: function(evt, id){
				if(typeof this.$parent.treeClick === 'function')
					this.$parent.treeClick(this.items[id], evt);
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


</style>