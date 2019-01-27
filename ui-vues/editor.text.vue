<template>
	<input 
		id="zzzzz"
		type="text" 
		class="editor" 
		:required="required"
		:pattern="pattern"
		:value="value"
		@dblclick.stop="" 
		@click.stop=""
		@mousedown.stop=""
		@mouseup.stop=""
		@keyup="keyup($event)"
		@change="change($event)"
		@blur="blur($event)"
		@dragstart.stop.prevent=""
	 />
</template>

<script>
	export default {
		
		props: {
			success: false,			
			required: false,
			pattern: false,
			validate: false,
			cancel: false,
			value: String,
		},
		
		data: function(){
			return {
				//value: '',
			}
		},
		
		beforeDestroy: function(){
			console.log('destroy');
			if(this.$el.parentNode)
				this.$el.parentNode.removeChild(this.$el);
		},
		
		methods: {		
			keyup: function(evt){
				if(typeof this.validate === 'function'){
					if(this.validate(evt, this.$el) == false)
						this.$el.setCustomValidity('name allready in use');
					else
						this.$el.setCustomValidity('');
				}
				if(!this.$el.checkValidity())
					return;
				if(evt.keyCode == 13)
					this.$el.blur();				
			},
			
			change: function(evt){
				this.$el.checkValidity();
			},
			
			blur: function(evt){
				console.log('blur');
				const parent = this.$el.parentNode;
				//parent.removeChild(this.$el);
				if(this.$el.checkValidity() && typeof this.success === 'function')
					this.success(this.$el, this);
				//this.$destroy();
			},
			
			startEdit: function(targetEl, autofocus){
				targetEl.prepend(this.$el);
				//targetEl.style['pointer-events'] = 'none';
				if(!autofocus)
					return;
				this.$nextTick(function(){
					this.$el.focus();
					this.$el.select();				
				});
			}
		}
	}
</script>