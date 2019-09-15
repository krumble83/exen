<template>
	<div class="chips">
		<div 
			v-for="child in mChilds"
			class="chip"
		>
			{{(typeof child == 'object') ? child[label] : child}}
			<span class="closebtn" @click="remove(child)">&times;</span>
		</div>
		<slot />
		<span v-if="keyboard" contenteditable="true" @keydown="_onKeyUp" ref="editor"></span>
	</div>
</template>

<script>
	export default {
		props: {
			childs: {type: Array, default: function(){return []}},
			label: String,
			keyboard: {type: Boolean, default: true},
		},
		
		data: function(){
			return {
				mChilds: this.childs,
			}
		},
		
		methods: {
			remove: function(item){
				const me = this;
				if(typeof item == 'array'){
					item.forEach(function(it){
						me.remove(it);
					});
					return;
				}
				var index = this.mChilds.indexOf(item);
				if (index > -1) {
					me.mChilds.splice(index, 1);
				}
			},
			
			add: function(item){
				const me = this;
				if(typeof item == 'array'){
					item.forEach(function(it){
						me.add(it);
					});
					return;
				}
				console.assert(item[me.label]);
				this.mChilds.push(item);
			},
			
			_onKeyUp: function(evt){
				if(evt.keyCode == 13){
					console.log('add');
					evt.preventDefault();
					this.add(this.$refs.editor.innerText);
					this.$refs.editor.innerText = '';
				}
			}
		}
	}
</script>

<style>

	.chips {
		width: 100%;
		background-color: var(--bg-light-color);
		padding: 10px;
		border-radius: 3px;
	}

	.chips > .chip{
		background-color: var(--bg-middle-color);
		display: inline-block;
		line-height: 20px;
		padding: 1px 3px;
		height: 20px;
		font-size: 16px;
		border-radius: 5px;
		margin-right: 5px;
	}
	
	.chips > .chip > .closebtn {
		padding-left: 10px;
		color: #888;
		font-weight: bold;
		float: right;
		font-size: 20px;
		cursor: pointer;
	}
	
	.chips > span {
		display: inline-block;
		min-width: 20px;
		outline: none;
		margin-left: -5px;
	}
	
</style>