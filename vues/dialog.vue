<template>
	<div :class="classObject">
		<div class="dialog" :style="styleObject" tabindex="-1" @keyup="onKeyUp" ref="window">
			<div class="title" @mousedown="_onDragStart">
				<img v-if="icon" :src="icon" />
				{{title}}
				<span class="closebtn" @click="cancel">&times;</span>
			</div>		
			<div class="content">
				<slot />
			</div>
			<div class="buttonbar">
				<slot name="buttons" />
				<component v-for="button in buttons" />
			</div>
			
		</div>
	</div>
</template>

<script>

export default {
	
	props: {
		title: {type: String, default: 'Title'},
		visible: Boolean,
		modal: Boolean,
		resizable: Boolean,
		buttons: {type: Array, default: function(){return []}},
	},
	
	data: function(){
		return {
			classObject : {
				visible: this.visible,
				container: true,
				modal: this.modal,
				resizable: this.resizable,
			},
			styleObject: {
				
			},
			
		}
	},
	
	methods: {
		_onDragStart: function(evt){
			const me = this
				, offset = {x:evt.clientX - me.$refs.window.offsetLeft, y: evt.clientY - me.$refs.window.offsetTop};

			var coords = {x:0, y:0}

			const updateFn = () => {
				me.$refs.window.style.left = coords.x +  'px';
				me.$refs.window.style.top = coords.y + 'px';
			}
			
			const moveFn = (evt) => {
				coords.x = evt.clientX - offset.x;
				coords.y = evt.clientY - offset.y;
				requestAnimationFrame(updateFn);
			}
			
			//me.$el.style.transform = 'none';
			moveFn(evt);
			
			document.addEventListener('mousemove', moveFn);
			document.addEventListener('mouseup', function(){
				document.removeEventListener('mousemove', moveFn);
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
		
		close: function(){
			this.classObject.visible = false;
			this.$emit('close');			
		},
		
		cancel: function(){
			this.classObject.visible = false;
			this.$emit('cancel');
		},
		
	}
}

</script>

<style>

	.container{
		display: none;
		pointer-events: none;
	}
	
	.modal {
		pointer-events: all;
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0,0,0); /* Fallback color */
		background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	}
	
	.container.resizable .dialog:after{
		content: '';
		position: absolute;
		bottom: -4px;
		right: -4px;
		width: 10px;
		height: 10px;
		cursor: nw-resize;
	}

	.dialog {
		pointer-events: all;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		width: 800px;
		height: 400px;
		background-color: var(--main-bg-color);
		border-radius: 5px;
		border: 2px solid #595959;
		outline: none;

		-webkit-box-shadow: 3px 3px 10px -3px var(--bg-light-color);
		-moz-box-shadow: 3px 3px 10px -3px var(--bg-light-color);
		box-shadow: 3px 3px 10px -3px var(--bg-light-color);
	}
	
	.container.visible {
		display: block;
	}

	.dialog > .title {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		padding: 2px;
		padding-left: 10px;
		background-color: var(--bg-dark-color);
		border-bottom: 1px solid var(--bg-light-color);
		cursor: move;
		height: 22px;
		line-height: 22px;
	}
	
	.dialog span.closebtn{
		float: right;
		line-height: 21px;
		padding-right: 5px;
		cursor: default;
		color: var(--text-color);
		font-weight: bold;
		font-size: 22px;
	}
	
	.dialog .buttonbar {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 15px;
	}
	
	.dialog .buttonbar > input {
		float:right;
		margin: 5px;
		min-width: 80px;
	}
</style>