<template functional>
	<polygon 
		class="pinExec" 
		:fill="parent.cColor"
		:stroke="parent.cColor" 
		points="2,4 6,4 14,10 6,16 2,16" 
		:transform="parent.$hasFlag('F_OUTPUT') ? 'translate(-23)' : 'translate(8)'" 
		ref="pin"
	></polygon>
</template>

<script>
</script>

<style>
	.exWorksheet .exNode .exPin polygon.pinExec{
		fill-opacity: 0;
		stroke-width: 2;
		pointer-events: none;
	}

	.exWorksheet .exNode .exPin:not([data-link-count="0"]) polygon.pinExec{
		fill-opacity: 1;
	}

</style>
