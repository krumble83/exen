<template functional>
	<rect 
		v-if="parent.isarray" 
		x="20" 
		y="4" 
		width="10" 
		height="11" 
		class="pin exArray" 
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
		class="pin" 
		ref="pin" 
		:transform="parent.$hasFlag('F_OUTPUT') ? 'translate(-26)' : ''"
	/>	
</template>