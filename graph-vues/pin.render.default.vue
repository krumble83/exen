<template functional>
	<rect 
		v-if="parent.isarray" 
		x="20" 
		y="4" 
		width="10" 
		height="11" 
		class="pinBase array" 
		ref="pin" 
		:stroke="parent.cColor" 
		stroke-width="4" 
		:transform="parent.$hasFlag('F_OUTPUT') ? 'translate(-11)' : ''" 
		:fill="'url(#pinArrayPattern' + parent.cColor.replace('#', '_') + ')'"
	/>
	<circle 
		v-else 
		cx="13" 
		:cy="parent.mHeight/2" 
		r="5" 
		:stroke="parent.cColor" 
		:fill="parent.cColor" 
		class="pinBase" 
		ref="pin" 
		:transform="parent.$hasFlag('F_OUTPUT') ? 'translate(-26)' : ''"
	/>	
</template>

<style>
	.exWorksheet .exNode .exPin circle.pinBase{
		stroke-width: 3;
		pointer-events : none;
		fill-opacity: 0;
	}

	.exWorksheet .exNode .exPin:not([data-link-count="0"]) circle.pinBase{
		fill-opacity: 1;
	}
	
	.exWorksheet .exNode .exPin > rect.pinBase.array{
		stroke-width: 3;
		stroke-dasharray: 3,2.1;
		pointer-events : none;
	}

	.exWorksheet .exNode .exPin:not([data-link-count="0"]) rect.pinBase.array{
		fill-opacity: 1;
	}
	
</style>