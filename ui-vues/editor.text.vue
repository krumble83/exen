<template>
	<input 
		type="text"
		form="form1"
		draggable="true" 
		class="editor" 
		:style="styleObject"
		:required="required"
		:pattern="dPattern[0]"
		:value="value"
		@dblclick.stop="" 
		@click.stop=""
		@mousedown.stop=""
		@mouseup.stop=""
		@keyup="keyup($event)"
		@blur="onBlur"
		@change="onChange"
		@dragstart.stop.prevent.capture="onDrag"
	 />
</template>

<script>
	export default {
		
		props: {
			required: false,
			pattern: {type: Array, default:function(){return ['.*', '']}},
			cancel: false,
			value: String,

			autofocus: {type: Boolean, default: true},
			autoclose: {type: Boolean, default: true},

			validatefn: false,			
			successfn: false,
			endeditfn: false,
		},
		
		computed: {
		},
		
		data: function(){
			return {
				validate: this.validatefn,
				success: this.successfn,
				callback: false,
				oValue: this.value,
				dPattern: this.pattern,
				styleObject: {
					
				}
			}
		},
		
		mounted: function(){
			if(this.autofocus){
				this.$el.focus();
				this.$el.select();
			}
			this.$emit('start', this);
		},
		
		beforeDestroy: function(){
			//console.log('destroy');
			if(this.$el.parentNode && this.autoclose)
				this.$el.parentNode.removeChild(this.$el);
		},
		
		methods: {
			
			setPattern: function(pattern, message){
				if(Array.isArray(pattern))
					this.dPattern = pattern;
				else
					this.dPattern = [pattern, message];
			},
			
			keyup: function(evt){
				if(evt.keyCode == 27){ //esc
					this.cancel == true;
					this.$el.blur();
				}
								
				if(evt.keyCode == 13) // enter
					this.$el.blur();
				
				this.checkValue();
				this.$emit('update', this.$el);
				this.$emit('change', this.$el.value, this);
			},
	
			onChange: function(evt){
				//console.log('chage');
				this.checkValue();
			},

			onBlur: function(evt){
				//console.log('blur');
				
				if(this.cancel){
					this.reset();
					return;
				}
				this.checkValue();
				this.endEdit();
			},
			
			checkValue: function(){
				this.$el.setCustomValidity('');
				this.$el.title = '';
				if(!this.$el.checkValidity() || ((typeof this.validatefn == 'function') && this.validatefn(this.$el.value, this) === false)){
					this.$el.setCustomValidity(this.pattern[1]);
					this.$el.title = this.pattern[1];
					return false;
				}
				return true;
			},
			
			reset: function(){
				this.$el.value = this.oValue;
				this.$el.setCustomValidity('');				
			},
			
			invalidate: function(message){
				this.$el.setCustomValidity(message);				
			},
			
			endEdit: function(){
								
				if(!this.checkValue()){
					this.reset();
					this.$emit('end', this.$el.value, this);
					return;
				}
				
				if(typeof this.successfn === 'function')
					this.successfn(this.$el.value, this);

				this.$emit('end', this.$el.value, this);
			},
			onDrag: function(){},
			/*
			startEdit: function(targetEl, autofocus){
				targetEl.prepend(this.$el);
				//targetEl.style['pointer-events'] = 'none';
				if(!autofocus)
					return;
				this.$nextTick(function(){
					this.$el.focus();
					this.$el.select();
				});
			},
			*/
		}
	}
</script>