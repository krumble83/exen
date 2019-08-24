<template>
	<li
		:class="classObject"
	>
		<div class="label">
			<texteditor
				:autoclose="false"
				:autofocus="false"
				:value="name"
				:required="true"
				:validatefn="validate"
				:successfn="success"
			/>
		</div>
		<img class="separator" style="" />
		<div class="editor">
			<selecteditor
				style="width:98%"
				:values="[{value: 'core.type.bool', text:'Bool'}, {value: 'core.type.int', text: 'Integer'}]"
			/>
		</div>
	</li>
</template>

<script>

	import texteditor from './editor.text.vue';
	import selecteditor from './editor.select.vue';
	
	export default {
		components: {texteditor, selecteditor},
		inject: ['Blueprint'],
		
		props: {
			name: String,
			flags: Number,
			type: String,
			
			obj: Object,
			item: Object,
			dataid: String,
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
			itemdata: function(){
				return this.item[this.dataid];
			},			
		},

		mounted: function(){

		},
		
		methods: {
			validate: function(evt, input){
				console.log('******', this.Blueprint)
				var exists = false;
				if(this.type == 'inputs'){
					const io = this.Blueprint.getStore().getters['function/getInput'](this.item.name, input.value);
					return  io == undefined || io == this.obj;
				}
				else if(this.type == 'outputs'){
					const io = this.Blueprint.getStore().getters['function/getOutput'](this.item.name, input.value);
					return io == undefined || io == this.obj;
				}
				
			},
			
			success: function(input){
				if(this.type == 'inputs')
					this.Blueprint.getStore().getters['function/getInput'](this.item.name, this.name).name = input.value;
				else if(this.type == 'outputs')
					this.Blueprint.getStore().getters['function/getOutput'](this.item.name, this.name).name = input.value;
				
			}
			//onClick: function
		}
	}

</script>

<style>

</style>