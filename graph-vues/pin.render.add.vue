<template functional>
	<rect
		width="11"
		height="11"
		fill="url('#pinAddPattern')"
		:transform="parent.$hasFlag('F_OUTPUT') ? 'translate(-20,5)' : 'translate(0,5)'" 
	/>
</template>

<style>
	.exWorksheet .exNode .exPin polygon.pinAdd{
		pointer-events: none;
	}

</style>
