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
				@change="onDatatypeChange"
			>
				<option 
					v-for="it in cDatatypes"
					:value="it.__vue__.fullpath"
					:selected="it.__vue__.fullpath == datatype ? 'selected' : ''"
				>
				{{it.getAttribute('label')}}
				</option>
			</selecteditor>
			<a><img src="ui-img/del.png" /></a>
		</div>
	</li>
</template>

<script>

	import texteditor from './editor.text.vue';
	import selecteditor from './editor.select.vue';
	
	export default {
		components: {texteditor, selecteditor},
		inject: ['Blueprint', 'Library'],
		
		props: {
			name: String,
			flags: Number,
			type: String,
			datatype: String,
			storeSetter: String,
			storeGetter: String,
			
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
			cDatatypes: function(){
				console.log(this.Library.getDatatype());
				return this.Library.getDatatype();
			},
			/*
			itemdata: function(){
				return this.item[this.dataid];
			},
			*/
		},

		mounted: function(){

		},
		
		methods: {
			onDatatypeChange: function(val, editor){
				//console.log('datatype change', val);
				this.item.store.commit(this.storeSetter, {name: this.name, props: {datatype: val}});
			},
			
			validate: function(evt, input){
				//console.log('******', this.Blueprint)
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
	.uiTree.properties li.child.editor div.editor img {
		vertical-align: bottom;
		border: 0;
	}
</style>