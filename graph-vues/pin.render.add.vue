<template functional>
	<polygon 
		class="pinAdd" 
		:fill="#fff"
		:stroke="#fff" 
		points="2,4 6,4 14,10 6,16 2,16" 
		:transform="parent.$hasFlag('F_OUTPUT') ? 'translate(-23)' : 'translate(5)'" 
		ref="pin"
	></polygon>
</template>

<script>
</script>

<style>
	.exWorksheet .exNode .exPin polygon.pinAdd{
		fill-opacity: 0;
		stroke-width: 2;
		pointer-events: none;
	}

</style>
