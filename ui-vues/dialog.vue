<template>
	<div class="dialog">
		<div class="title" @mousedown="onMouseDown">Client P.Elec</div>
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script>

export default {
	
	props: {
		
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

		}
	}
}

</script>

<style>


	.dialog {
		margin: 0 auto;
		width: 800px;
		height: 400px;
		background-color: #555;
		border-radius: 5px;
		border: 3px outset;
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


</style>