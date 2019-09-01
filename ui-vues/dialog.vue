<template>
	<div :class="classObject" :style="styleObject" tabindex="-1" @keyup="onKeyUp">
		<div class="title" @mousedown="onMouseDown">
			{{title}}
			<img src="ui-img/close.png" class="close" @click="cancel" />
		</div>		
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script>

export default {
	
	props: {
		title: {type: String, default: 'Title'},
	},
	
	data: function(){
		return {
			classObject : {
				dialog: true,
				visible: false,
			},
			styleObject: {
				
			}
		}
	},
	
	methods: {
		onMouseDown: function(evt){
			const me = this;
			
			var offset = {x:0, y:0}
			
			function move(ev){
				
			}
			
			//me.$on('mousemove', move);
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', function(){
				document.removeEventListener('mousemove', move);
			}, {once: true});

		},
		
		onClose: function(evt){
			this.$emit('close');
			this.classObject.visible = false;
		},
		
		onKeyUp: function(evt){
			switch(evt.keyCode){				
				case 27: // esc
					this.cancel();
			}			
		},
		
		show: function(){
			const me = this;
			me.$emit('show');
			me.classObject.visible = true;
			setTimeout(function(){
				me.$el.focus();
			}, 10);
			
		},
		
		hide: function(){
			this.onClose();			
		},
		
		cancel: function(){
			this.$emit('cancel');
			this.classObject.visible = false;			
		},
		
	}
}

</script>

<style>


	.dialog {
		display: none;
		margin: 0 auto;
		width: 800px;
		height: 400px;
		background-color: #191919;
		border-radius: 5px;
		border: 1px solid #595959;
		outline: none;
	}
	
	.dialog.visible {
		display: block;
	}

	.dialog > .title {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		padding: 2px;
		padding-left: 10px;
		background-color: #777;
		border-bottom: 1px solid #000;
		cursor: move;
	}
	
	.close{
		float: right;
		cursor: default;
	}

</style>