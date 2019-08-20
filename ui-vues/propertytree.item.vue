<template>
	<li
		:class="classObject"
	>
		<div class="label">
			{{text}}
		</div>
		<img class="separator" @mousedown="onResize" />
		<div class="editor" >
			<component 
				v-if="editor"
				:is="editor.ctor"
				style="width: 96%" 
				:value="value"
				v-bind="editor"
			/>
			<span v-if="!editor">{{value}}</span>		
		</div>
	</li>
</template>

<script>
	

	
	import texteditor from './editor.text.vue';
	
	export default {
		components: {texteditor},
		
		props: {
			name: String,
			label: String,
			item: Object,
			dataid: String,
			editor: Object,
			
			flags: Number,
			type: String,
		},
		
		data: function(){
			return {
				classObject: {
					child: true,
					editor: true,
				},
			}
		},
		
		computed: {
			text: function () {
				return this.label || this.name;
			},
			
			value: function(){
				return this.item[this.dataid];
			},
		},

		mounted: function(){

		},

		
		methods: {
			onResize: function(evt){
				console.log('TODO: fix this', this.$el, evt);
				const me = this
				, nodes = this.$parent.$el.parentNode.querySelectorAll('.uiTree.properties li.child.editor div.label');
				
				var mouseMove = function(evt){
					nodes.forEach(function(el){
						el.style.width = ((evt.clientX -12) - me.$el.offsetLeft) + 'px';
					});
				}
				
				document.addEventListener('mousemove', mouseMove, {useCapture : true});
				
				document.addEventListener('mouseup', function(){
					document.removeEventListener('mousemove', mouseMove);
				}, {once : true});
			},
		}
	}

</script>

<style>


</style>