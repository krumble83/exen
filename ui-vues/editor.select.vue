<template>
	<select 
		class="editor" 
		:required="required"
		v-model="value"
		@dblclick.stop="" 
		@click.stop=""
		@mousedown.stop=""
		@mouseup.stop=""
		@change="change($event)"
		@blur="blur($event)"
		@dragstart.stop.prevent=""
	 >
		<option v-for="item,idx in items" :key="idx"
			:value="item.value"
		>
			{{item.text}}
		</option>
	 </select>
</template>

<script>
	export default {
		
		data: function(){
			return {
				value: '',
				items: [],
				required: false,
				validate: false,
				cancel: false,
				success: false,
			}
		},
		
		methods: {		
			
			change: function(evt){
				this.$el.checkValidity();
			},
			
			blur: function(evt){
				const parent = this.$el.parentNode;
				parent.removeChild(this.$el);
				if(this.$el.checkValidity() && typeof this.success === 'function')
					this.success(this.$el, this);
				//this.$destroy();
			},
			
			startEdit: function(targetEl, autofocus){
				targetEl.prepend(this.$el);
				if(!autofocus)
					return;
				this.$nextTick(function(){
					this.$el.focus();
				});
			}
		}
	}
</script>